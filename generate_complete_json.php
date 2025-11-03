<?php
// Script para generar el JSON completo de configuración de puzzles
// Lee las curiosidades reales desde documentos/Instrucciones_Rincones_del_Mundo.md
// y las inserta en el JSON final para cada puzzle (nombre, país y curiosidad)

$worlds = [
    'mundo1' => [
        'id' => 'mundo1',
        'name' => 'Sereno',
        'emoji' => '🌍',
        'colorPalette' => [
            'background' => '#E8F4FD',
            'cardBorder' => '#B8D4E3', 
            'cardBack' => '#8BB3C7',
            'primary' => '#4A90E2',
            'secondary' => '#F5F5DC',
            'accent' => '#D3D3D3'
        ],
        'gridSize' => '3x3'
    ],
    'mundo2' => [
        'id' => 'mundo2',
        'name' => 'Vibrante',
        'emoji' => '🌺',
        'colorPalette' => [
            'background' => '#FFF5F5',
            'cardBorder' => '#FFB3BA',
            'cardBack' => '#FF8A95',
            'primary' => '#FF6B6B',
            'secondary' => '#FFE0E0',
            'accent' => '#FFCCCB'
        ],
        'gridSize' => '3x3'
    ],
    'mundo3' => [
        'id' => 'mundo3',
        'name' => 'Místico',
        'emoji' => '🌙',
        'colorPalette' => [
            'background' => '#F0F0FF',
            'cardBorder' => '#C7C7FF',
            'cardBack' => '#9B9BFF',
            'primary' => '#6B6BFF',
            'secondary' => '#E0E0FF',
            'accent' => '#CCCCFF'
        ],
        'gridSize' => '3x3'
    ],
    'mundo4' => [
        'id' => 'mundo4',
        'name' => 'Tropical',
        'emoji' => '🌴',
        'colorPalette' => [
            'background' => '#F0FFF0',
            'cardBorder' => '#B3FFB3',
            'cardBack' => '#80FF80',
            'primary' => '#4DFF4D',
            'secondary' => '#E0FFE0',
            'accent' => '#CCFFCC'
        ],
        'gridSize' => '3x3'
    ],
    'mundo5' => [
        'id' => 'mundo5',
        'name' => 'Desértico',
        'emoji' => '🏜️',
        'colorPalette' => [
            'background' => '#FFF8DC',
            'cardBorder' => '#FFE4B5',
            'cardBack' => '#FFD700',
            'primary' => '#FFA500',
            'secondary' => '#FFFACD',
            'accent' => '#F0E68C'
        ],
        'gridSize' => '3x3'
    ],
    'mundo6' => [
        'id' => 'mundo6',
        'name' => 'Polar',
        'emoji' => '❄️',
        'colorPalette' => [
            'background' => '#F0F8FF',
            'cardBorder' => '#B0E0E6',
            'cardBack' => '#87CEEB',
            'primary' => '#4682B4',
            'secondary' => '#E0F6FF',
            'accent' => '#B0E0E6'
        ],
        'gridSize' => '3x3'
    ],
    'mundo7' => [
        'id' => 'mundo7',
        'name' => 'Volcánico',
        'emoji' => '🌋',
        'colorPalette' => [
            'background' => '#FFF5EE',
            'cardBorder' => '#FFB3A3',
            'cardBack' => '#FF7F50',
            'primary' => '#FF4500',
            'secondary' => '#FFE4E1',
            'accent' => '#FFA07A'
        ],
        'gridSize' => '3x3'
    ],
    'mundo8' => [
        'id' => 'mundo8',
        'name' => 'Submarino',
        'emoji' => '🐠',
        'colorPalette' => [
            'background' => '#E0FFFF',
            'cardBorder' => '#AFEEEE',
            'cardBack' => '#40E0D0',
            'primary' => '#00CED1',
            'secondary' => '#F0FFFF',
            'accent' => '#B0E0E6'
        ],
        'gridSize' => '3x3'
    ],
    'mundo9' => [
        'id' => 'mundo9',
        'name' => 'Montañoso',
        'emoji' => '⛰️',
        'colorPalette' => [
            'background' => '#F5F5DC',
            'cardBorder' => '#D2B48C',
            'cardBack' => '#BC9A6A',
            'primary' => '#8B7355',
            'secondary' => '#F5F5DC',
            'accent' => '#D2B48C'
        ],
        'gridSize' => '3x3'
    ],
    'mundo10' => [
        'id' => 'mundo10',
        'name' => 'Espacial',
        'emoji' => '🚀',
        'colorPalette' => [
            'background' => '#1a1a2e',
            'cardBorder' => '#16213e',
            'cardBack' => '#0f3460',
            'primary' => '#533483',
            'secondary' => '#2d1b69',
            'accent' => '#1a1a2e'
        ],
        'gridSize' => '3x3'
    ]
];

// Generar puzzles para cada mundo (15 por mundo)
/**
 * Extrae por mundo (1..10) los 15 elementos con Nombre, País y Curiosidad
 * del documento markdown Instrucciones_Rincones_del_Mundo.md
 * Devuelve: [ worldNum => [ [name, country, curiosity], ...15 ] ]
 */
function extractCuriositiesFromDoc(string $docPath): array {
    if (!file_exists($docPath)) {
        return [];
    }
    $content = file_get_contents($docPath);
    $lines = preg_split('/\r?\n/', $content);

    $world = 0;
    $result = [];
    // “Nombre, País – *curiosidad*” (acepta guion o raya en-dash)
    $itemRegex = '/^\s*\d+\.\s+(.+?)\s+[–-]\s+\*(.+)\*\s*$/u';
    foreach ($lines as $line) {
        // Detectar cabecera de mundo: "### mundo X - Nombre"
        if (preg_match('/^###\s*mundo\s*(\d+)/i', $line, $m)) {
            $world = (int)$m[1];
            if ($world >= 1 && $world <= 10) {
                if (!isset($result[$world])) $result[$world] = [];
            } else {
                $world = 0;
            }
            continue;
        }

        if ($world > 0) {
            if (preg_match($itemRegex, $line, $m2)) {
                $fullname = trim($m2[1]);
                $curiosity = trim($m2[2]);
                // Separar "Nombre, País" (última coma divide país si existe)
                $name = $fullname;
                $country = '';
                $pos = mb_strrpos($fullname, ',');
                if ($pos !== false) {
                    $name = trim(mb_substr($fullname, 0, $pos));
                    $country = trim(mb_substr($fullname, $pos + 1));
                }
                $result[$world][] = [
                    'name' => $name,
                    'country' => $country,
                    'curiosity' => $curiosity,
                ];
            }
        }
    }
    return $result;
}

$docCuriosities = extractCuriositiesFromDoc(__DIR__ . DIRECTORY_SEPARATOR . 'documentos' . DIRECTORY_SEPARATOR . 'Instrucciones_Rincones_del_Mundo.md');

$puzzles = [];
for ($worldNum = 1; $worldNum <= 10; $worldNum++) {
    $worldId = "mundo{$worldNum}";
    $worldPuzzles = [];
    
    for ($puzzleNum = 1; $puzzleNum <= 15; $puzzleNum++) {
        $puzzleId = sprintf("m%02dp%02d", $worldNum, $puzzleNum);
        $imageFile = sprintf("m%02dp%02d.png", $worldNum, $puzzleNum);
        
        // Determinar número de piezas según el nivel
        if ($puzzleNum <= 4) {
            // Tutorial: progresión 4, 6, 9, 12 piezas
            $pieces = [4, 6, 9, 12][$puzzleNum - 1];
            $magnetStrength = [0.8, 0.7, 0.6, 0.5][$puzzleNum - 1];
        } elseif ($puzzleNum == 15) {
            // Nivel pro: 25 piezas
            $pieces = 25;
            $magnetStrength = 0.0;
        } else {
            // Niveles normales: 9, 12, 16 piezas alternando
            $pieces = [9, 12, 16, 9, 12, 16, 9, 12, 16, 9][$puzzleNum - 5];
            $magnetStrength = 0.0;
        }
        
        // Datos reales desde el documento si existen
        $placeName = "Puzzle {$puzzleNum}";
        $country = "";
        $curiosity = "";
        if (isset($docCuriosities[$worldNum][$puzzleNum - 1])) {
            $placeName = $docCuriosities[$worldNum][$puzzleNum - 1]['name'] ?: $placeName;
            $country = $docCuriosities[$worldNum][$puzzleNum - 1]['country'] ?? '';
            $curiosity = $docCuriosities[$worldNum][$puzzleNum - 1]['curiosity'] ?? '';
        }

        // Componer curiosidad completa incluyendo lugar y país si existen
        $curiosityText = $curiosity;
        if ($placeName !== '' || $country !== '') {
            $location = trim($placeName . ( $country !== '' ? ", $country" : '' ));
            if ($curiosityText !== '') {
                $curiosityText = $location . " — " . $curiosityText;
            } else {
                $curiosityText = $location;
            }
        }

        $worldPuzzles[] = [
            'id' => "{$worldId}{$puzzleId}",
            'name' => $placeName,
            'country' => $country,
            'image' => $imageFile,
            'curiosity' => $curiosityText,
            'pieces' => $pieces,
            'magnetStrength' => $magnetStrength,
            'gridSize' => $pieces <= 9 ? '3x3' : ($pieces <= 16 ? '4x4' : '5x5')
        ];
    }
    
    $worlds[$worldId]['puzzles'] = $worldPuzzles;
}

$config = [
    'worlds' => $worlds,
    'gameSettings' => [
        'magnetStrength' => [
            'tutorial' => [0.8, 0.7, 0.6, 0.5],
            'normal' => 0.0
        ],
        'piecesPerWorld' => [
            'mundo1' => ['normal' => 9, 'challenge' => 16],
            'mundo2' => ['normal' => 9, 'challenge' => 16],
            'mundo3' => ['normal' => 9, 'challenge' => 16],
            'mundo4' => ['normal' => 9, 'challenge' => 16],
            'mundo5' => ['normal' => 9, 'challenge' => 16],
            'mundo6' => ['normal' => 9, 'challenge' => 16],
            'mundo7' => ['normal' => 9, 'challenge' => 16],
            'mundo8' => ['normal' => 9, 'challenge' => 16],
            'mundo9' => ['normal' => 9, 'challenge' => 16],
            'mundo10' => ['normal' => 9, 'challenge' => 16]
        ],
        'responsiveSettings' => [
            'mobile' => ['maxPieces' => 16, 'minPieceSize' => 60],
            'tablet' => ['maxPieces' => 25, 'minPieceSize' => 50],
            'desktop' => ['maxPieces' => 36, 'minPieceSize' => 40]
        ],
        'difficultyProgression' => [
            'tutorialLevels' => 4,
            'challengeLevel' => 15
        ],
        'gameplay' => [
            'type' => 'relax',
            'freeNavigation' => true,
            'surpriseMe' => true,
            'mixCompleted' => true
        ]
    ]
];

// Guardar el JSON
$outputWeb = __DIR__ . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'puzzles_config.json';
$outputAssets = __DIR__ . DIRECTORY_SEPARATOR . 'android_nativo' . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'main' . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'puzzles_config.json';

@mkdir(dirname($outputWeb), 0777, true);
@mkdir(dirname($outputAssets), 0777, true);

file_put_contents($outputWeb, json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
file_put_contents($outputAssets, json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "✅ JSON generado correctamente con " . count($worlds) . " mundos y " . (count($worlds) * 15) . " puzzles totales\n";
echo "📁 Web: $outputWeb\n";
echo "📁 Assets: $outputAssets\n";
?>
