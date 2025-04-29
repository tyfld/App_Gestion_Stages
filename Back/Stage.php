<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

class Stage {
    private $pdo;

    public function __construct() {
        $this->pdo = new PDO("mysql:host=localhost;dbname=stages_db", "root", "");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM stage");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO stage (date_debut, date_fin, date_evaluation, note, commentaire, nom_fichier, type_document, date_upload, chemin_fichier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data['date_debut'], $data['date_fin'], $data['date_evaluation'], $data['note'], $data['commentaire'], $data['nom_fichier'], $data['type_document'], $data['date_upload'], $data['chemin_fichier']]);
    }

    public function update($data) {
        $stmt = $this->pdo->prepare("UPDATE stage SET date_debut = ?, date_fin = ?, date_evaluation = ?, note = ?, commentaire = ?, nom_fichier = ?, type_document = ?, date_upload = ?, chemin_fichier = ? WHERE id = ?");
        $stmt->execute([$data['date_debut'], $data['date_fin'], $data['date_evaluation'], $data['note'], $data['commentaire'], $data['nom_fichier'], $data['type_document'], $data['date_upload'], $data['chemin_fichier'], $data['id']]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM stage WHERE id = ?");
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
                echo json_encode(['message' => 'stage ajouté']);
                break;
            case 'update':
                $this->update(json_decode(file_get_contents('php://input'), true));
                echo json_encode(['message' => 'stage mis à jour']);
                break;
            case 'delete':
                $this->delete(json_decode(file_get_contents('php://input'), true)['id']);
                echo json_encode(['message' => 'stage supprimé']);
                break;
            default:
                echo json_encode(['error' => 'Action inconnue']);
        }
    }
}

$model = new Stage();
$model->handleRequest();
?>
