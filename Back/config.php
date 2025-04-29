<?php
// Configuration des en-têtes HTTP
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Configuration de la gestion des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuration de la base de données
$host = 'localhost';
$dbname = 'app_gestion_stages';
$username = 'root';
$password = '';

try {
    $conn = new mysqli($host, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Définir le charset
    $conn->set_charset("utf8mb4");
} catch (Exception $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}

// Fonction pour envoyer une réponse JSON
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Fonction pour gérer les erreurs
function handleError($message, $statusCode = 400) {
    sendResponse(['error' => $message], $statusCode);
}
?> 