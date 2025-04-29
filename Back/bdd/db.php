<?php
$host = 'localhost'; // ou 127.0.0.1
$dbname = 'stages_db'; // nom de la base de données
$username = 'root'; // utilisateur par défaut XAMPP
$password = ''; // mot de passe vide sous XAMPP

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Erreur de connexion à la base de données : ' . $e->getMessage());
}
?>
