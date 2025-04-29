<?php
require_once 'config.php';
require_once 'bdd/db.php';

class Etudiant {
    private $pdo;

    public function __construct() {
        global $pdo;
        $this->pdo = $pdo;
    }

    public function getAll() {
        try {
            $stmt = $this->pdo->query("SELECT * FROM etudiants");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            handleError("Erreur lors de la récupération des étudiants: " . $e->getMessage(), 500);
        }
    }

    public function create($data) {
        try {
            if (!isset($data['nom']) || !isset($data['prenom']) || !isset($data['email'])) {
                handleError("Données manquantes pour la création d'un étudiant");
            }

            $stmt = $this->pdo->prepare("INSERT INTO etudiants (nom, prenom, email) VALUES (?, ?, ?)");
            $stmt->execute([$data['nom'], $data['prenom'], $data['email']]);
            
            return ['message' => 'Étudiant créé avec succès', 'id' => $this->pdo->lastInsertId()];
        } catch (PDOException $e) {
            handleError("Erreur lors de la création de l'étudiant: " . $e->getMessage(), 500);
        }
    }

    public function update($data) {
        try {
            if (!isset($data['id']) || !isset($data['nom']) || !isset($data['prenom']) || !isset($data['email'])) {
                handleError("Données manquantes pour la mise à jour de l'étudiant");
            }

            $stmt = $this->pdo->prepare("UPDATE etudiants SET nom = ?, prenom = ?, email = ? WHERE id = ?");
            $stmt->execute([$data['nom'], $data['prenom'], $data['email'], $data['id']]);
            
            if ($stmt->rowCount() === 0) {
                handleError("Aucun étudiant trouvé avec cet ID", 404);
            }
            
            return ['message' => 'Étudiant mis à jour avec succès'];
        } catch (PDOException $e) {
            handleError("Erreur lors de la mise à jour de l'étudiant: " . $e->getMessage(), 500);
        }
    }

    public function delete($id) {
        try {
            if (!isset($id)) {
                handleError("ID de l'étudiant manquant");
            }

            $stmt = $this->pdo->prepare("DELETE FROM etudiants WHERE id = ?");
            $stmt->execute([$id]);
            
            if ($stmt->rowCount() === 0) {
                handleError("Aucun étudiant trouvé avec cet ID", 404);
            }
            
            return ['message' => 'Étudiant supprimé avec succès'];
        } catch (PDOException $e) {
            handleError("Erreur lors de la suppression de l'étudiant: " . $e->getMessage(), 500);
        }
    }

    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $action = $_GET['action'] ?? '';

        try {
            switch ($method) {
                case 'GET':
                    if ($action === 'read') {
                        $data = $this->getAll();
                        sendResponse($data);
                    } else {
                        handleError("Action non supportée", 400);
                    }
                    break;

                case 'POST':
                    if ($action === 'create') {
                        $input = json_decode(file_get_contents('php://input'), true);
                        $result = $this->create($input);
                        sendResponse($result, 201);
                    } else {
                        handleError("Action non supportée", 400);
                    }
                    break;

                case 'PUT':
                    if ($action === 'update') {
                        $input = json_decode(file_get_contents('php://input'), true);
                        $result = $this->update($input);
                        sendResponse($result);
                    } else {
                        handleError("Action non supportée", 400);
                    }
                    break;

                case 'DELETE':
                    if ($action === 'delete') {
                        $input = json_decode(file_get_contents('php://input'), true);
                        $result = $this->delete($input['id']);
                        sendResponse($result);
                    } else {
                        handleError("Action non supportée", 400);
                    }
                    break;

                default:
                    handleError("Méthode HTTP non supportée", 405);
            }
        } catch (Exception $e) {
            handleError("Erreur serveur: " . $e->getMessage(), 500);
        }
    }
}

// Exécution
$model = new Etudiant();
$model->handleRequest();
?>
