<?php
require_once 'config_hostalia.php';

echo "🔧 CONFIGURACIÓN DE BASE DE DATOS - RINCONES DEL MUNDO\n";
echo "====================================================\n\n";

try {
    // 1. Insertar la aplicación en la tabla aplicaciones
    echo "📱 Registrando aplicación en la base de datos...\n";
    
    $stmt = $conn->prepare("
        INSERT INTO aplicaciones (app_codigo, app_nombre, app_descripcion, activa) 
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE 
        app_nombre = VALUES(app_nombre), 
        app_descripcion = VALUES(app_descripcion),
        activa = 1
    ");
    
    $stmt->execute([
        $juego,
        $juego_titulo,
        'Juego de puzzles visuales de lugares increíbles del mundo'
    ]);
    
    echo "✅ Aplicación registrada correctamente\n\n";
    
    // 2. Crear tabla de progreso del juego
    echo "🗄️ Creando tabla de progreso...\n";
    
    $sql = "CREATE TABLE IF NOT EXISTS `{$juego}_progreso` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `usuario_aplicacion_key` varchar(255) NOT NULL,
        `nivel_actual` int(11) DEFAULT 1 COMMENT 'Mundo actual (1-10)',
        `nivel_actual_numero` int(11) DEFAULT 1 COMMENT 'Nivel actual dentro del mundo (1-15)',
        `total_puntos` int(11) DEFAULT 0 COMMENT 'Total de puzzles completados',
        `total_tiempo` int(11) DEFAULT 0 COMMENT 'Tiempo total en segundos',
        `niveles_completados` text COMMENT 'JSON con niveles completados',
        `ultima_sincronizacion` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `usuario_aplicacion_key` (`usuario_aplicacion_key`),
        KEY `idx_nivel_actual` (`nivel_actual`),
        KEY `idx_total_puntos` (`total_puntos`),
        KEY `idx_ultima_sincronizacion` (`ultima_sincronizacion`),
        INDEX `idx_usuario_aplicacion_key` (`usuario_aplicacion_key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Progreso de los jugadores en Rincones del Mundo'";
    
    if ($conn->exec($sql) !== false) {
        echo "✅ Tabla {$juego}_progreso creada correctamente\n\n";
    } else {
        echo "❌ Error creando tabla: " . $conn->errorInfo()[2] . "\n\n";
    }
    
    // 3. Verificar estructura de la tabla usuarios_aplicaciones
    echo "🔍 Verificando estructura de usuarios_aplicaciones...\n";
    
    $stmt = $conn->query("DESCRIBE usuarios_aplicaciones");
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    $requiredColumns = [
        'verification_code',
        'verification_expiry', 
        'verified_at'
    ];
    
    $missingColumns = [];
    foreach ($requiredColumns as $column) {
        if (!in_array($column, $columns)) {
            $missingColumns[] = $column;
        }
    }
    
    if (empty($missingColumns)) {
        echo "✅ Todas las columnas de verificación existen\n\n";
    } else {
        echo "⚠️ Faltan columnas de verificación: " . implode(', ', $missingColumns) . "\n";
        echo "💡 Ejecuta el siguiente SQL para agregarlas:\n\n";
        
        foreach ($missingColumns as $column) {
            switch ($column) {
                case 'verification_code':
                    echo "ALTER TABLE usuarios_aplicaciones ADD COLUMN verification_code VARCHAR(6) DEFAULT NULL;\n";
                    break;
                case 'verification_expiry':
                    echo "ALTER TABLE usuarios_aplicaciones ADD COLUMN verification_expiry DATETIME DEFAULT NULL;\n";
                    break;
                case 'verified_at':
                    echo "ALTER TABLE usuarios_aplicaciones ADD COLUMN verified_at TIMESTAMP NULL DEFAULT NULL;\n";
                    break;
            }
        }
        echo "\n";
    }
    
    // 4. Verificar índices
    echo "🔍 Verificando índices...\n";
    
    $stmt = $conn->query("SHOW INDEX FROM {$juego}_progreso");
    $indexes = $stmt->fetchAll();
    
    $indexNames = array_column($indexes, 'Key_name');
    $requiredIndexes = ['PRIMARY', 'usuario_aplicacion_key', 'idx_nivel_actual', 'idx_total_puntos'];
    
    foreach ($requiredIndexes as $indexName) {
        if (in_array($indexName, $indexNames)) {
            echo "✅ Índice {$indexName} existe\n";
        } else {
            echo "❌ Índice {$indexName} no existe\n";
        }
    }
    
    echo "\n";
    
    // 5. Estadísticas
    echo "📊 ESTADÍSTICAS:\n";
    
    $stmt = $conn->query("SELECT COUNT(*) FROM aplicaciones WHERE app_codigo = '$juego'");
    $appCount = $stmt->fetchColumn();
    echo "• Aplicaciones registradas: {$appCount}\n";
    
    $stmt = $conn->query("SELECT COUNT(*) FROM {$juego}_progreso");
    $progressCount = $stmt->fetchColumn();
    echo "• Registros de progreso: {$progressCount}\n";
    
    $stmt = $conn->query("SELECT COUNT(*) FROM usuarios_aplicaciones WHERE app_codigo = '$juego'");
    $userCount = $stmt->fetchColumn();
    echo "• Usuarios registrados: {$userCount}\n";
    
    echo "\n";
    
    // 6. Verificar archivos de la aplicación
    echo "📁 VERIFICANDO ARCHIVOS:\n";
    
    $requiredFiles = [
        '../index.html',
        '../css/styles.css',
        '../js/app.js',
        'auth.php',
        'game.php',
        'config_hostalia.php'
    ];
    
    foreach ($requiredFiles as $file) {
        if (file_exists($file)) {
            echo "✅ {$file}\n";
        } else {
            echo "❌ {$file} - NO ENCONTRADO\n";
        }
    }
    
    echo "\n";
    
    // 7. Verificar imágenes de puzzles
    echo "🖼️ VERIFICANDO IMÁGENES DE PUZZLES:\n";
    
    $puzzleDir = '../puzzles/';
    if (is_dir($puzzleDir)) {
        $totalImages = 0;
        for ($world = 1; $world <= 10; $world++) {
            $worldImages = 0;
            for ($level = 1; $level <= 15; $level++) {
                $filename = sprintf('m%02dp%02d.png', $world, $level);
                if (file_exists($puzzleDir . $filename)) {
                    $worldImages++;
                    $totalImages++;
                }
            }
            echo "• Mundo {$world}: {$worldImages}/15 imágenes\n";
        }
        echo "• Total: {$totalImages}/150 imágenes\n";
    } else {
        echo "❌ Directorio de puzzles no encontrado\n";
    }
    
    echo "\n";
    echo "🎉 CONFIGURACIÓN COMPLETADA\n";
    echo "==========================\n";
    echo "El juego 'Rincones del Mundo' está listo para usar.\n";
    echo "Accede a: https://colisan.com/sistema_apps_upload/{$juego}/\n\n";
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
?>
