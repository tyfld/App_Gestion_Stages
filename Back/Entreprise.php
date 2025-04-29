<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

class Entreprise {
    private $pdo;

    public function __construct() {
        $this->pdo = new PDO("mysql:host=localhost;dbname=stages_db", "root", "");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM entreprise");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO entreprise (nom, adresse, telephone, email) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['nom'], $data['adresse'], $data['telephone'], $data['email']]);
    }

    public function update($data) {
        $stmt = $this->pdo->prepare("UPDATE entreprise SET nom = ?, adresse = ?, telephone = ?, email = ? WHERE id = ?");
        $stmt->execute([$data['nom'], $data['adresse'], $data['telephone'], $data['email'], $data['id']]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM entreprise WHERE id = ?");
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
                echo json_encode(['message' => 'entreprise ajouté']);
                break;
            case 'update':
                $this->update(json_decode(file_get_contents('php://input'), true));
                echo json_encode(['message' => 'entreprise mis à jour']);
                break;
            case 'delete':
                $this->delete(json_decode(file_get_contents('php://input'), true)['id']);
                echo json_encode(['message' => 'entreprise supprimé']);
                break;
            default:
                echo json_encode(['error' => 'Action inconnue']);
        }
    }
}

$model = new Entreprise();
$model->handleRequest();
?>
