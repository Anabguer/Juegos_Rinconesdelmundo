<?php
/**
 * Configuración SMTP para Hostalia
 * Basado en la configuración funcional de otras aplicaciones
 */

// ⚠️ CREDENCIALES SMTP — DEFINITIVAS (de Neni). NO modificarlas.
define('SMTP_HOST', 'smtp.colisan.com');
define('SMTP_USER', 'info@colisan.com');
define('SMTP_PASS', 'IgdAmg19521954');
define('SMTP_PORT', 587);
define('SMTP_FROM_EMAIL', 'info@colisan.com');
define('SMTP_FROM_NAME', 'Colisan');

// Configuración SMTP para PHPMailer
$smtp_config = [
    'host' => SMTP_HOST,
    'username' => SMTP_USER,
    'password' => SMTP_PASS,
    'port' => SMTP_PORT,
    'from_email' => SMTP_FROM_EMAIL,
    'from_name' => SMTP_FROM_NAME,
    'secure' => 'tls', // STARTTLS
    'debug' => 0, // 0 = off, 1 = client messages, 2 = client and server messages
    'options' => [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]
];

// Función para obtener configuración SMTP
function getSMTPConfig() {
    global $smtp_config;
    return $smtp_config;
}

// Función para enviar email con PHPMailer
function enviarEmailPHPMailer($destinatario, $nombre_destinatario, $asunto, $mensaje_html, $mensaje_texto = '') {
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require_once '../PHPMailer/Exception.php';
    require_once '../PHPMailer/PHPMailer.php';
    require_once '../PHPMailer/SMTP.php';

    $config = getSMTPConfig();
    
    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP
        $mail->SMTPOptions = $config['options'];
        $mail->SMTPDebug = $config['debug'];
        $mail->isSMTP();
        $mail->Host = $config['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $config['username'];
        $mail->Password = $config['password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $config['port'];

        // Remitente
        $mail->setFrom($config['from_email'], $config['from_name']);
        
        // Destinatario
        $mail->addAddress($destinatario, $nombre_destinatario);

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = $mensaje_html;
        $mail->AltBody = $mensaje_texto ?: strip_tags($mensaje_html);
        $mail->CharSet = 'UTF-8';

        // Enviar
        $resultado = $mail->send();
        
        if ($resultado) {
            error_log("Email enviado correctamente a: $destinatario");
            return true;
        } else {
            error_log("Error enviando email a: $destinatario");
            return false;
        }

    } catch (Exception $e) {
        error_log("Error PHPMailer: " . $e->getMessage());
        return false;
    }
}
?>
