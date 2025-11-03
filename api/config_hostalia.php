<?php
// ⚠️ CREDENCIALES DE BD — DEFINITIVAS (de Neni). NO modificarlas.
define('DB_HOST',    'PMYSQL165.dns-servicio.com');
define('DB_USUARIO', 'sistema_apps_user');
define('DB_CONTRA',  'GestionUploadSistemaApps!');
define('DB_NOMBRE',  '9606966_sistema_apps_db');
define('DB_CHARSET', 'utf8');
define('DB_PORT',    3306);

// Configuración de base de datos para Hostalia
$host = DB_HOST;
$dbname = DB_NOMBRE;
$username = DB_USUARIO;
$password = DB_CONTRA;
$port = DB_PORT;

try {
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=" . DB_CHARSET, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    error_log("Error de conexión a la base de datos: " . $e->getMessage());
    error_log("Host: $host, Port: $port, DB: $dbname, User: $username");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error de conexión a la base de datos: ' . $e->getMessage()
    ]);
    exit;
}

// Configuración del juego
$juego = 'rincones_del_mundo';
$juego_titulo = 'Rincones del Mundo';
?>
