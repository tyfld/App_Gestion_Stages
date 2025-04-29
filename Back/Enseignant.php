<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

class Enseignant {
    private $pdo;

    public function __construct() {
        $this->pdo = new PDO("mysql:host=localhost;dbname=stages_db", "root", "");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM enseignant");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO enseignant (nom, prenom) VALUES (?, ?)");
        $stmt->execute([$data['nom'], $data['prenom']]);
    }

    public function update($data) {
        $stmt = $this->pdo->prepare("UPDATE enseignant SET nom = ?, prenom = ? WHERE id = ?");
        $stmt->execute([$data['nom'], $data['prenom'], $data['id']]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM enseignant WHERE id = ?");
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
                echo json_encode(['message' => 'enseignant ajouté']);
                break;
            case 'update':
                $this->update(json_decode(file_get_contents('php://input'), true));
                echo json_encode(['message' => 'enseignant mis à jour']);
                break;
            case 'delete':
                $this->delete(json_decode(file_get_contents('php://input'), true)['id']);
                echo json_encode(['message' => 'enseignant supprimé']);
                break;
            default:
                echo json_encode(['error' => 'Action inconnue']);
        }
    }
}

$model = new Enseignant();
$model->handleRequest();
?>
