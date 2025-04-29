<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

session_start();

// Si la requête est une OPTIONS (preflight), on renvoie juste les headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier si l'utilisateur est connecté
if (isset($_SESSION['user_id'])) {
    // Récupérer les informations de l'utilisateur depuis la base de données
    require_once 'config.php';
    
    $user_id = $_SESSION['user_id'];
    $query = "SELECT id, nom, prenom, email, role FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode([
            'success' => true,
            'user' => $user
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Utilisateur non trouvé'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Non authentifié'
    ]);
}
?> 