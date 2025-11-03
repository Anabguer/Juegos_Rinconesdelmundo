<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'check_session':
        echo json_encode([
            'success' => false,
            'message' => 'No hay sesión activa'
        ]);
        break;
        
    case 'register':
        echo json_encode([
            'success' => false,
            'message' => 'Registro temporalmente deshabilitado'
        ]);
        break;
        
    case 'login':
        echo json_encode([
            'success' => false,
            'message' => 'Login temporalmente deshabilitado'
        ]);
        break;
        
    default:
        echo json_encode([
            'success' => false,
            'message' => 'Acción no válida'
        ]);
        break;
}
?>
