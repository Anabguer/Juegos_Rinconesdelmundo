<?php
require_once 'config_hostalia.php';

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

try {
    switch ($action) {
        case 'save_progress':
            handleSaveProgress();
            break;
        case 'get_progress':
            handleGetProgress();
            break;
        case 'get_ranking':
            handleGetRanking();
            break;
        default:
            throw new Exception('Acción no válida');
    }
} catch (Exception $e) {
    error_log("Error en game.php: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

function handleSaveProgress() {
    global $conn, $juego;
    
    // Verificar sesión
    session_start();
    if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_key']) || $_SESSION['app_codigo'] !== $juego) {
        throw new Exception('Sesión no válida');
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Datos de entrada inválidos');
    }
    
    $currentWorld = intval($input['currentWorld'] ?? 1);
    $currentLevel = intval($input['currentLevel'] ?? 1);
    $completedLevels = $input['completedLevels'] ?? [];
    $totalTime = intval($input['totalTime'] ?? 0);
    
    // Validar datos
    if ($currentWorld < 1 || $currentWorld > 10) {
        throw new Exception('Mundo inválido');
    }
    
    if ($currentLevel < 1 || $currentLevel > 15) {
        throw new Exception('Nivel inválido');
    }
    
    if ($totalTime < 0) {
        throw new Exception('Tiempo inválido');
    }
    
    $usuario_aplicacion_key = $_SESSION['user_key'];
    
    // Buscar o crear registro de progreso
    $stmt = $conn->prepare("
        SELECT id FROM {$juego}_progreso 
        WHERE usuario_aplicacion_key = ?
    ");
    $stmt->execute([$usuario_aplicacion_key]);
    $existing = $stmt->fetch();
    
    if ($existing) {
        // Actualizar progreso existente
        $stmt = $conn->prepare("
            UPDATE {$juego}_progreso 
            SET nivel_actual = ?, nivel_actual_numero = ?, total_puntos = ?, total_tiempo = ?, 
                niveles_completados = ?, ultima_sincronizacion = NOW()
            WHERE usuario_aplicacion_key = ?
        ");
        $stmt->execute([
            $currentWorld,
            $currentLevel,
            count($completedLevels),
            $totalTime,
            json_encode($completedLevels),
            $usuario_aplicacion_key
        ]);
    } else {
        // Crear nuevo registro
        $stmt = $conn->prepare("
            INSERT INTO {$juego}_progreso 
            (usuario_aplicacion_key, nivel_actual, nivel_actual_numero, total_puntos, total_tiempo, 
             niveles_completados, ultima_sincronizacion) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([
            $usuario_aplicacion_key,
            $currentWorld,
            $currentLevel,
            count($completedLevels),
            $totalTime,
            json_encode($completedLevels)
        ]);
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Progreso guardado correctamente',
        'data' => [
            'currentWorld' => $currentWorld,
            'currentLevel' => $currentLevel,
            'completedLevels' => $completedLevels,
            'totalTime' => $totalTime
        ]
    ]);
}

function handleGetProgress() {
    global $conn, $juego;
    
    // Verificar sesión
    session_start();
    if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_key']) || $_SESSION['app_codigo'] !== $juego) {
        throw new Exception('Sesión no válida');
    }
    
    $usuario_aplicacion_key = $_SESSION['user_key'];
    
    // Obtener progreso
    $stmt = $conn->prepare("
        SELECT nivel_actual, nivel_actual_numero, total_puntos, total_tiempo, niveles_completados
        FROM {$juego}_progreso 
        WHERE usuario_aplicacion_key = ?
    ");
    $stmt->execute([$usuario_aplicacion_key]);
    $progress = $stmt->fetch();
    
    if (!$progress) {
        // Crear progreso inicial
        $stmt = $conn->prepare("
            INSERT INTO {$juego}_progreso 
            (usuario_aplicacion_key, nivel_actual, nivel_actual_numero, total_puntos, total_tiempo, 
             niveles_completados, ultima_sincronizacion) 
            VALUES (?, 1, 1, 0, 0, '[]', NOW())
        ");
        $stmt->execute([$usuario_aplicacion_key]);
        
        $progress = [
            'nivel_actual' => 1,
            'nivel_actual_numero' => 1,
            'total_puntos' => 0,
            'total_tiempo' => 0,
            'niveles_completados' => '[]'
        ];
    }
    
    $completedLevels = json_decode($progress['niveles_completados'], true) ?? [];
    
    echo json_encode([
        'success' => true,
        'message' => 'Progreso obtenido correctamente',
        'data' => [
            'currentWorld' => intval($progress['nivel_actual']),
            'currentLevel' => intval($progress['nivel_actual_numero']),
            'completedLevels' => $completedLevels,
            'totalTime' => intval($progress['total_tiempo']),
            'totalPuzzles' => intval($progress['total_puntos'])
        ]
    ]);
}

function handleGetRanking() {
    global $conn, $juego;
    
    // Obtener ranking global
    $stmt = $conn->prepare("
        SELECT ua.nick, ua.nombre, p.total_puntos, p.total_tiempo, p.ultima_sincronizacion
        FROM {$juego}_progreso p
        JOIN usuarios_aplicaciones ua ON p.usuario_aplicacion_key = ua.usuario_aplicacion_key
        WHERE ua.app_codigo = ? AND ua.activo = 1
        ORDER BY p.total_puntos DESC, p.total_tiempo ASC
        LIMIT 50
    ");
    $stmt->execute([$juego]);
    $ranking = $stmt->fetchAll();
    
    // Formatear ranking
    $formattedRanking = [];
    foreach ($ranking as $index => $row) {
        $formattedRanking[] = [
            'position' => $index + 1,
            'nick' => $row['nick'],
            'nombre' => $row['nombre'],
            'puzzles_completados' => intval($row['total_puntos']),
            'tiempo_total' => intval($row['total_tiempo']),
            'ultima_actividad' => $row['ultima_sincronizacion']
        ];
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Ranking obtenido correctamente',
        'data' => $formattedRanking
    ]);
}
?>
