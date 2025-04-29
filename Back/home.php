<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Pour le CORS, si frontend est sur un autre port

echo json_encode([
    'message' => 'Hello World depuis PHP 🎉'
]);