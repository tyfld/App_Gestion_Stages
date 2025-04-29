<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

class Utilisateur {
    private $pdo;

    public function __construct() {
        $this->pdo = new PDO("mysql:host=localhost;dbname=stages_db", "root", "");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM utilisateur");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO utilisateur (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['nom'], $data['prenom'], $data['email'], $data['mot_de_passe']]);
    }

    public function update($data) {
        $stmt = $this->pdo->prepare("UPDATE utilisateur SET nom = ?, prenom = ?, email = ?, mot_de_passe = ? WHERE id = ?");
        $stmt->execute([$data['nom'], $data['prenom'], $data['email'], $data['mot_de_passe'], $data['id']]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM utilisateur WHERE id = ?");
        $stmt->execute([$id]);
    }

    public function handleRequest() {
        $action = $_GET['action'] ?? '';
        switch ($action) {
            case 'read':
                echo json_encode($this->getAll());
                break;
            case 'create':
                $this->create(json_decode(file_get_contents('php://input'), true));
                echo json_encode(['message' => 'utilisateur ajouté']);
                break;
            case 'update':
                $this->update(json_decode(file_get_contents('php://input'), true));
                echo json_encode(['message' => 'utilisateur mis à jour']);
                break;
            case 'delete':
                $this->delete(json_decode(file_get_contents('php://input'), true)['id']);
                echo json_encode(['message' => 'utilisateur supprimé']);
                break;
            default:
                echo json_encode(['error' => 'Action inconnue']);
        }
    }
}

$model = new Utilisateur();
$model->handleRequest();
?>
