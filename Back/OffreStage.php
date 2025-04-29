<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

class OffreStage {
    private $pdo;

    public function __construct() {
        $this->pdo = new PDO("mysql:host=localhost;dbname=stages_db", "root", "");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM offrestage");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO offrestage (titre, description, date_publication) VALUES (?, ?, ?)");
        $stmt->execute([$data['titre'], $data['description'], $data['date_publication']]);
    }

    public function update($data) {
        $stmt = $this->pdo->prepare("UPDATE offrestage SET titre = ?, description = ?, date_publication = ? WHERE id = ?");
        $stmt->execute([$data['titre'], $data['description'], $data['date_publication'], $data['id']]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM offrestage WHERE id = ?");
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
                echo json_encode(['message' => 'offrestage ajouté']);
                break;
            case 'update':
                $this->update(json_decode(file_get_contents('php://input'), true));
                echo json_encode(['message' => 'offrestage mis à jour']);
                break;
            case 'delete':
                $this->delete(json_decode(file_get_contents('php://input'), true)['id']);
                echo json_encode(['message' => 'offrestage supprimé']);
                break;
            default:
                echo json_encode(['error' => 'Action inconnue']);
        }
    }
}

$model = new OffreStage();
$model->handleRequest();
?>
