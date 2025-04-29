<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

class Candidature {
    private $pdo;

    public function __construct() {
        $this->pdo = new PDO("mysql:host=localhost;dbname=stages_db", "root", "");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM candidature");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO candidature (date_candidature, statut) VALUES (?, ?)");
        $stmt->execute([$data['date_candidature'], $data['statut']]);
    }

    public function update($data) {
        $stmt = $this->pdo->prepare("UPDATE candidature SET date_candidature = ?, statut = ? WHERE id = ?");
        $stmt->execute([$data['date_candidature'], $data['statut'], $data['id']]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM candidature WHERE id = ?");
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
                echo json_encode(['message' => 'candidature ajouté']);
                break;
            case 'update':
                $this->update(json_decode(file_get_contents('php://input'), true));
                echo json_encode(['message' => 'candidature mis à jour']);
                break;
            case 'delete':
                $this->delete(json_decode(file_get_contents('php://input'), true)['id']);
                echo json_encode(['message' => 'candidature supprimé']);
                break;
            default:
                echo json_encode(['error' => 'Action inconnue']);
        }
    }
}

$model = new Candidature();
$model->handleRequest();
?>
