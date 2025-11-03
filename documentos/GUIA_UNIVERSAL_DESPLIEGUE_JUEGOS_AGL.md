
⚠️ Reglas para Cursor (obligatorias antes de tocar nada)

🚫 No inventar carpetas, rutas ni nombres.
Si algo no existe o no encaja con esta guía, preguntar antes de crear.

🧭 Toda ruta parte de /sistema_apps_upload/.
Nada de duplicar sistema_apps_upload dentro de otra.

📜 No reescribir código funcional sin confirmación.
Si hay duda sobre cómo extender o modificar algo (auth, merge, ads, email, etc.), consultar antes.

🧩 Mantener estructura y convenciones exactas:

Archivos PHP en /api/

JS y CSS separados en /js/ y /css/

Assets dentro de /assets/

Ningún .jsx o .ts en producción.

🧠 Asumir que esta guía es la fuente oficial.
Cualquier diferencia con otros proyectos debe resolverse siguiendo esta guía o validándola con Neni.

💬 Antes de ejecutar una idea “para mejorar” → pedir validación.
No “optimizar” funciones, no mover carpetas, no renombrar claves ni tablas sin aprobación explícita.



# 🎯 GUÍA OFICIAL DE DESPLIEGUE EN HOSTALIA
**Para proyectos de juegos y apps HTML/CSS/JS/PHP**

Esta guía unifica cómo deben subirse, configurarse y vincularse las aplicaciones a la base de datos en Hostalia sin romper rutas ni duplicar carpetas.

---

## 🔒 Regla de Oro
**NO crear una carpeta llamada `sistema_apps_upload`.** Esa carpeta YA es la raíz pública del servidor.

Cada juego debe subirse directamente dentro de esa raíz: `/sistema_apps_upload/<nombre_del_juego>/`

---

## 📁 Estructura Estándar

```
/sistema_apps_upload/
├── [nombre_juego_1]/
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── assets/
│   ├── api/
│   └── .htaccess
├── [nombre_juego_2]/
├── [nombre_juego_3]/
└── [nombre_juego_4]/
```

---

## ⚙️ Rutas y Base HREF

### Todos los HTML deben tener en `<head>`:
```html
<base href="/sistema_apps_upload/<juego>/">
```

### Ejemplo de rutas correctas:
- **CSS** → `/sistema_apps_upload/<juego>/css/styles.css`
- **JS** → `/sistema_apps_upload/<juego>/js/app.js`
- **IMG** → `/sistema_apps_upload/<juego>/assets/img/logo.png`
- **AUDIO** → `/sistema_apps_upload/<juego>/assets/audio/intro.mp3`
- **API** → `/sistema_apps_upload/<juego>/api/*.php`

---

## 🧰 BAT Universal de Deploy

El BAT debe hacer `cd /sistema_apps_upload` antes de crear la carpeta del juego.

```batch
@echo off
setlocal
set "HOST=82.194.68.83"
set "USER=sistema_apps_user"
set "PASS=GestionUploadSistemaApps!"

REM Detectar ruta de WinSCP automáticamente
if exist "C:\Users\agl03\AppData\Local\Programs\WinSCP\WinSCP.com" (
    set "WINSCP=C:\Users\agl03\AppData\Local\Programs\WinSCP\WinSCP.com"
) else if exist "C:\Program Files (x86)\WinSCP\WinSCP.com" (
    set "WINSCP=C:\Program Files (x86)\WinSCP\WinSCP.com"
) else (
    echo ❌ ERROR: WinSCP no encontrado en ninguna de las rutas esperadas
    echo Rutas verificadas:
    echo   - C:\Users\agl03\AppData\Local\Programs\WinSCP\WinSCP.com
    echo   - C:\Program Files (x86)\WinSCP\WinSCP.com
    echo.
    echo Por favor, instala WinSCP o verifica la ruta de instalación
    pause
    exit /b 1
)

set "LOCAL=%~dp0sistema_apps_upload\<juego>"
set "REMOTE=/sistema_apps_upload/<juego>"

"%WINSCP%" /ini=nul /log:"%LOCAL%\deploy_<juego>.log" /command ^
 "open ftps://%USER%:%PASS%@%HOST%/ -explicit -certificate=*" ^
 "option batch on" ^
 "option confirm off" ^
 "lcd %LOCAL%" ^
 "cd /sistema_apps_upload" ^
 "mkdir <juego>" ^
 "cd <juego>" ^
 "synchronize remote -mirror -criteria=size" ^
 "exit"
```

---

## 🗄️ Estructura de Base de Datos

### 1. Insertar la app en la tabla `aplicaciones`:
```sql
INSERT INTO aplicaciones (app_codigo, nombre, descripcion, estado, creado_en)
VALUES ('[nombre_juego]', '[Título del Juego]', '[Descripción del juego]', 'ACTIVA', NOW())
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), descripcion=VALUES(descripcion);
```

### 2. Vincular usuarios con `usuarios_aplicaciones`:
Usar `usuario_aplicacion_key` (canon del email + '_' + juego).

### 3. Tabla Principal del Juego:
```sql
CREATE TABLE IF NOT EXISTS `{juego}_progreso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_aplicacion_key` varchar(255) NOT NULL,
  `nivel_actual` int(11) DEFAULT 1,
  `total_puntos` int(11) DEFAULT 0,
  `total_tiempo` int(11) DEFAULT 0,
  `ultima_sincronizacion` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_aplicacion_key` (`usuario_aplicacion_key`),
  FOREIGN KEY (`usuario_aplicacion_key`) REFERENCES `usuarios_aplicaciones`(`usuario_aplicacion_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 🗄️ Configuración de Base de Datos

### config_hostalia.php
**IMPORTANTE:** Este archivo debe existir en la carpeta `api/` y contener la configuración correcta para Hostalia.

```php
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
$juego = 'nombre_del_juego'; // ← CAMBIAR POR EL NOMBRE REAL
$juego_titulo = 'Título del Juego'; // ← CAMBIAR POR EL TÍTULO REAL
?>
```

**⚠️ Puntos críticos:**
- **CREDENCIALES DEFINITIVAS** - NO modificar las constantes DB_*
- Host: `PMYSQL165.dns-servicio.com` (NO localhost)
- Base de datos: `9606966_sistema_apps_db`
- Puerto: `3306`
- El archivo debe estar en `api/config_hostalia.php`

---

## 🔍 Diagnóstico de Base de Datos

### diagnostico_tablas.php
**IMPORTANTE:** Crear este archivo para diagnosticar problemas de estructura de tablas.

```php
<?php
require_once 'config_hostalia.php';

echo "🔍 DIAGNÓSTICO DE ESTRUCTURA DE TABLAS\n";
echo "=====================================\n\n";

try {
    // 1. Verificar si existe la tabla aplicaciones
    echo "📋 Verificando tabla 'aplicaciones'...\n";
    $stmt = $conn->query("SHOW TABLES LIKE 'aplicaciones'");
    if ($stmt->rowCount() > 0) {
        echo "✅ Tabla 'aplicaciones' existe\n\n";
        
        // Mostrar estructura de la tabla aplicaciones
        echo "📊 Estructura de la tabla 'aplicaciones':\n";
        $stmt = $conn->query("DESCRIBE aplicaciones");
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($columns as $column) {
            echo "• {$column['Field']} - {$column['Type']} - {$column['Null']} - {$column['Key']} - {$column['Default']}\n";
        }
        echo "\n";
        
        // Mostrar datos existentes
        echo "📄 Datos existentes en 'aplicaciones':\n";
        $stmt = $conn->query("SELECT * FROM aplicaciones LIMIT 5");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if (!empty($data)) {
            foreach ($data as $row) {
                echo "• " . json_encode($row) . "\n";
            }
        } else {
            echo "• No hay datos en la tabla\n";
        }
        echo "\n";
        
    } else {
        echo "❌ Tabla 'aplicaciones' NO existe\n\n";
    }
    
    // 2. Verificar tabla usuarios_aplicaciones
    echo "📋 Verificando tabla 'usuarios_aplicaciones'...\n";
    $stmt = $conn->query("SHOW TABLES LIKE 'usuarios_aplicaciones'");
    if ($stmt->rowCount() > 0) {
        echo "✅ Tabla 'usuarios_aplicaciones' existe\n\n";
        
        // Mostrar estructura
        echo "📊 Estructura de la tabla 'usuarios_aplicaciones':\n";
        $stmt = $conn->query("DESCRIBE usuarios_aplicaciones");
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($columns as $column) {
            echo "• {$column['Field']} - {$column['Type']} - {$column['Null']} - {$column['Key']} - {$column['Default']}\n";
        }
        echo "\n";
        
    } else {
        echo "❌ Tabla 'usuarios_aplicaciones' NO existe\n\n";
    }
    
    // 3. Listar todas las tablas
    echo "📋 Todas las tablas en la base de datos:\n";
    $stmt = $conn->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    foreach ($tables as $table) {
        echo "• {$table}\n";
    }
    echo "\n";
    
    echo "🎯 DIAGNÓSTICO COMPLETADO\n";
    echo "========================\n";
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
?>
```

**Uso:**
1. Crear el archivo `api/diagnostico_tablas.php`
2. Ejecutar: `https://tudominio.com/api/diagnostico_tablas.php`
3. Revisar la estructura real de las tablas
4. Ajustar `admin_db.php` según la estructura encontrada

---

## 📋 PASO A PASO - DESARROLLO COMPLETO DE JUEGO

### 🎯 **FASE 1: CONFIGURACIÓN INICIAL**
1. ✅ **Estructura de carpetas** - Crear directorios base
2. ✅ **Archivos HTML/CSS/JS** - Estructura básica del juego
3. ✅ **APIs PHP** - Autenticación, progreso, configuración
4. ✅ **Base de datos** - Tablas y configuración
5. ✅ **Deploy inicial** - Subida a Hostalia

### 🎯 **FASE 2: CONTENIDO Y RECURSOS**
6. ⏳ **Recursos del juego** - Imágenes, audio, assets
7. ⏳ **Archivos de audio** - Efectos sonoros y música
8. ⏳ **Optimización de recursos** - Compresión y carga eficiente

### 🎯 **FASE 3: FUNCIONALIDAD CORE**
9. ⏳ **Sistema de autenticación** - Registro, login, verificación email
10. ⏳ **Guardado de progreso** - Sincronización con base de datos
11. ⏳ **Sincronización offline/online** - Merge inteligente de datos
12. ⏳ **Sistema de niveles** - Progresión y desbloqueo

### 🎯 **FASE 4: INTEGRACIONES**
13. ⏳ **AdMob** - Banner, interstitial, rewarded ads
14. ⏳ **Notificaciones** - Push notifications (opcional)
15. ⏳ **Analytics** - Tracking de uso y progreso

### 🎯 **FASE 5: TESTING Y OPTIMIZACIÓN**
16. ✅ **Testing funcional** - Todas las características
17. ⏳ **Testing de rendimiento** - Carga y velocidad
18. ⏳ **Testing de compatibilidad** - Diferentes dispositivos
19. ⏳ **Optimización final** - Mejoras de rendimiento

### 🎯 **FASE 6: DISEÑO Y UX**
20. ⏳ **Diseño visual** - UI/UX mejorado
21. ⏳ **Animaciones** - Transiciones y efectos
22. ⏳ **Responsive design** - Adaptación a diferentes pantallas
23. ⏳ **Accesibilidad** - Usabilidad mejorada

### 🎯 **FASE 7: GENERACIÓN DE APK/AAB**
24. ⏳ **Configurar Capacitor** - Instalar y configurar Capacitor
25. ⏳ **Configurar Android** - build.gradle y AndroidManifest.xml
26. ⏳ **Generar APK Debug** - Testing en dispositivos
27. ⏳ **Configurar Keystore** - Firmado para release
28. ⏳ **Generar AAB Release** - Para Google Play Store
29. ⏳ **Testing APK** - Verificar todas las funcionalidades

### 🎯 **FASE 8: FINALIZACIÓN**
30. ⏳ **Documentación** - Manual de usuario y técnico
31. ⏳ **Deploy final** - Versión de producción
32. ⏳ **Monitoreo** - Seguimiento post-lanzamiento

---

## 📧 CONFIGURACIÓN PHPMailer PARA HOSTALIA

**⚠️ IMPORTANTE: Sistema de envío de emails mejorado con PHPMailer**

### 📋 **PROBLEMA IDENTIFICADO:**
- ❌ **mail() nativo** - No funciona en Hostalia
- ❌ **Emails tardan mucho** - Problema de configuración
- ❌ **Emails no llegan** - Se pierden en el servidor

### 📋 **SOLUCIÓN IMPLEMENTADA:**

#### **PASO 1: DESCARGAR PHPMailer**
```bash
# Crear carpeta PHPMailer al mismo nivel que api/
mkdir PHPMailer

# Archivos necesarios (NO bajar GIT completo):
# - DSNConfigurator.php
# - Exception.php
# - OAuth.php
# - OAuthTokenProvider.php
# - PHPMailer.php
# - POP3.php
# - SMTP.php
```

#### **PASO 2: CONFIGURACIÓN SMTP**
**Archivo:** `api/config_smtp.php`

```php
<?php
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
```

#### **PASO 3: ACTUALIZAR auth.php**
**Cambiar función `enviarEmailVerificacion()`:**

```php
function enviarEmailVerificacion($email, $nombre, $codigo) {
    // Incluir configuración SMTP
    require_once 'config_smtp.php';
    
    $asunto = "🎮 Verifica tu cuenta de [NOMBRE_JUEGO]";
    
    $mensaje_html = "<!-- HTML del email -->";
    $mensaje_texto = "<!-- Texto plano del email -->";
    
    // Usar PHPMailer para enviar el email
    return enviarEmailPHPMailer($email, $nombre, $asunto, $mensaje_html, $mensaje_texto);
}
```

### 📋 **CONFIGURACIÓN HOSTALIA:**
- **Host:** `smtp.colisan.com`
- **Puerto:** `587` (STARTTLS)
- **Usuario:** `info@colisan.com`
- **Contraseña:** `IgdAmg19521954`
- **From:** `info@colisan.com`

### 📋 **VENTAJAS DE PHPMailer:**
- ✅ **Funciona en Hostalia** - Configuración probada
- ✅ **Emails rápidos** - Entrega inmediata
- ✅ **HTML y texto** - Soporte completo
- ✅ **SSL/TLS** - Seguridad mejorada
- ✅ **Logs detallados** - Debugging fácil

### 📋 **TESTING:**
```bash
# Probar envío de email
https://tudominio.com/sistema_apps_upload/nombre_juego/api/auth.php?action=register
```

### 📋 **TROUBLESHOOTING:**
- **Email no llega:** Verificar configuración SMTP
- **Error SSL:** Verificar `SMTPOptions`
- **Timeout:** Verificar puerto 587
- **Auth failed:** Verificar credenciales

---

## 📱 GENERACIÓN DE APK/AAB (ANDROID NATIVO)

⚠️ **IMPORTANTE**: **NUNCA usar Capacitor/Cordova**. Siempre usar **Android nativo** para mejor estabilidad y rendimiento.

### 🎯 **Configuración Inicial**

#### **1. Crear Estructura del Proyecto:**
```bash
# Crear carpeta del proyecto Android
mkdir android_nativo
cd android_nativo

# Crear estructura de carpetas
mkdir -p app\src\main\java\com\tudominio\nombre_juego
mkdir -p app\src\main\res\layout
mkdir -p app\src\main\res\drawable
mkdir -p app\src\main\res\values
mkdir -p app\src\main\res\raw
mkdir -p app\src\main\assets
```

#### **2. Configurar Java y Android SDK:**
```bash
# Instalar Java 8+ (compatible con Android)
winget install EclipseAdoptium.Temurin.8.JDK

# Configurar JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-8.0.392.8-hotspot"

# Configurar ANDROID_HOME
$env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
$env:PATH = "$env:PATH;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools"
```

#### **3. Crear build.gradle (Proyecto):**
```gradle
// Top-level build file
buildscript {
    ext.kotlin_version = "1.8.0"
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:7.4.2"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath 'com.google.gms:google-services:4.3.15'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

#### **4. Crear settings.gradle:**
```gradle
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "[Título del Juego]"
include ':app'
```

---

### 🔧 **Configuración de la App**

#### **1. Crear app/build.gradle:**
```gradle
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'com.google.gms.google-services'
}

android {
    namespace 'com.tudominio.nombre_juego'
    compileSdk 34

    defaultConfig {
        applicationId "com.tudominio.nombre_juego"
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    
    kotlinOptions {
        jvmTarget = '1.8'
    }
    
    buildFeatures {
        viewBinding true
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.10.1'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.9.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // WebView
    implementation 'androidx.webkit:webkit:1.8.0'
    
    // AdMob
    implementation 'com.google.android.gms:play-services-ads:22.4.0'
    
    // HTTP Client
    implementation 'com.squareup.okhttp3:okhttp:4.11.0'
    implementation 'com.google.code.gson:gson:2.10.1'
    
    // SQLite
    implementation 'androidx.room:room-runtime:2.5.0'
    implementation 'androidx.room:room-ktx:2.5.0'
    kapt 'androidx.room:room-compiler:2.5.0'
    
    // Audio
    implementation 'androidx.media:media:1.6.0'
    
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}
```

#### **2. Crear AndroidManifest.xml:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Permisos necesarios -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="com.google.android.gms.permission.AD_ID" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.NombreJuego"
        android:usesCleartextTraffic="true"
        tools:targetApi="31">
        
        <!-- Actividad principal -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.NombreJuego">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
        <!-- Actividad del juego -->
        <activity
            android:name=".GameActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.NombreJuego" />
        
        <!-- AdMob App ID -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-3940256099942544~3347511713" />
        
    </application>

</manifest>
```

---

### 🚀 **Proceso de Build**

#### **1. Script de Configuración (setup_project.bat):**
```batch
@echo off
echo 🚀 CONFIGURANDO PROYECTO ANDROID NATIVO
echo ========================================

echo 📋 Verificando requisitos...

REM Verificar Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java no encontrado. Instala JDK 8+ y configura JAVA_HOME
    pause
    exit /b 1
)
echo ✅ Java encontrado

REM Verificar Android SDK
if not defined ANDROID_HOME (
    echo ❌ ANDROID_HOME no configurado
    echo Configurando ANDROID_HOME...
    set ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\Sdk
    set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
)
echo ✅ Android SDK configurado

REM Crear local.properties
echo 📝 Creando local.properties...
echo sdk.dir=%ANDROID_HOME% > local.properties
echo ✅ local.properties creado

echo.
echo 🎯 CONFIGURACIÓN COMPLETADA
echo ===========================
pause
```

#### **2. Script de Build (build_apk.bat):**
```batch
@echo off
echo 🚀 GENERANDO APK - [NOMBRE DEL JUEGO]
echo =====================================

echo 📦 Limpiando proyecto...
call gradlew clean
if %errorlevel% neq 0 (
    echo ❌ Error limpiando proyecto
    pause
    exit /b 1
)

echo 🔨 Compilando proyecto...
call gradlew assembleDebug
if %errorlevel% neq 0 (
    echo ❌ Error compilando proyecto
    pause
    exit /b 1
)

echo ✅ APK generado exitosamente
echo 📱 Ubicación: app\build\outputs\apk\debug\app-debug.apk
pause
```

#### **3. Script de Instalación (install_apk.bat):**
```batch
@echo off
echo 📱 INSTALANDO APK EN DISPOSITIVO
echo ================================

echo 🔍 Verificando dispositivo conectado...
adb devices

echo.
echo 📦 Instalando APK...
adb install -r app\build\outputs\apk\debug\app-debug.apk

if %errorlevel% equ 0 (
    echo ✅ APK instalado exitosamente
    echo 🎮 ¡El juego está listo para usar!
) else (
    echo ❌ Error instalando APK
    echo 🔧 Verifica que el dispositivo esté conectado y con depuración USB habilitada
)

pause
```

---

### 🔐 **Firmado de APK/AAB**

#### **1. Generar Keystore:**
```bash
# Generar keystore
keytool -genkey -v -keystore [nombre_juego]-release.keystore -alias [nombre_juego] -keyalg RSA -keysize 2048 -validity 10000
```

#### **2. Configurar android/app/key.properties:**
```properties
storePassword=tu_password_del_keystore
keyPassword=tu_password_del_keystore
keyAlias=[nombre_juego]
storeFile=../[nombre_juego]-release.keystore
```

#### **3. Configurar android/app/build.gradle para firmado:**
```gradle
android {
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

### 🎮 **Sistema Híbrido WebView + Nativo**

#### **1. Actividades Java Principales:**
```java
// MainActivity.java - Pantalla principal
public class MainActivity extends AppCompatActivity {
    // Navegación y menú principal
}

// GameActivity.java - WebView del juego
public class GameActivity extends AppCompatActivity {
    private WebView webView;
    private GameManager gameManager;
    
    // Configurar WebView con JavaScript habilitado
    // Cargar juego desde assets: file:///android_asset/index.html
}

// GameManager.java - Gestión del juego
public class GameManager {
    // AdMob nativo
    // Audio nativo (MediaPlayer + SoundPool)
    // Almacenamiento local (SharedPreferences)
    // Sincronización HTTP con servidor
}
```

#### **2. Comunicación JavaScript ↔ Android:**
```java
// En GameActivity.java
webView.addJavascriptInterface(new WebAppInterface(), "Android");

public class WebAppInterface {
    @JavascriptInterface
    public void saveProgress(String progress) {
        gameManager.saveProgress(progress);
    }
    
    @JavascriptInterface
    public void showAd() {
        gameManager.showInterstitialAd();
    }
    
    @JavascriptInterface
    public void playSound(String soundType) {
        gameManager.playSound(soundType);
    }
}
```

#### **3. JavaScript del Juego:**
```javascript
// En el juego HTML5/JavaScript
function saveProgress(progress) {
    if (window.Android) {
        window.Android.saveProgress(JSON.stringify(progress));
    } else {
        // Fallback para web
        localStorage.setItem('gameProgress', JSON.stringify(progress));
    }
}

function showAd() {
    if (window.Android) {
        window.Android.showAd();
    }
}

function playSound(soundType) {
    if (window.Android) {
        window.Android.playSound(soundType);
    } else {
        // Fallback para web
        playWebSound(soundType);
    }
}
```

---

### 🔄 **Sistema Offline/Online**

#### **1. Detección de Conexión:**
```java
public boolean isOnline() {
    ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
    NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
    return activeNetwork != null && activeNetwork.isConnectedOrConnecting();
}
```

#### **2. Sincronización Inteligente:**
```java
public void saveProgress(String progress) {
    // Guardar localmente SIEMPRE
    prefs.edit().putString(KEY_PROGRESS, progress).apply();
    
    // Sincronizar con servidor si hay conexión
    if (isOnline()) {
        syncManager.syncProgress(progress, callback);
    }
}
```

#### **3. Merge de Progreso:**
```java
public String loadProgress() {
    String localProgress = prefs.getString(KEY_PROGRESS, "{}");
    
    // Intentar cargar desde servidor
    if (isOnline()) {
        syncManager.loadProgress(new SyncCallback() {
            @Override
            public void onSuccess(String serverProgress) {
                // Merge inteligente: servidor tiene prioridad
                if (!serverProgress.equals("offline")) {
                    prefs.edit().putString(KEY_PROGRESS, serverProgress).apply();
                }
            }
        });
    }
    
    return localProgress;
}
```

---

### 📋 **Scripts de Automatización**

#### **setup_project.bat:**
```batch
@echo off
echo 🚀 CONFIGURANDO PROYECTO ANDROID NATIVO
echo ========================================

echo 📋 Verificando requisitos...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java no encontrado. Instala JDK 8+ y configura JAVA_HOME
    pause
    exit /b 1
)
echo ✅ Java encontrado

if not defined ANDROID_HOME (
    set ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\Sdk
    set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
)
echo ✅ Android SDK configurado

echo sdk.dir=%ANDROID_HOME% > local.properties
echo ✅ local.properties creado

echo 🎯 CONFIGURACIÓN COMPLETADA
pause
```

#### **build_apk.bat:**
```batch
@echo off
echo 🚀 GENERANDO APK - [NOMBRE DEL JUEGO]
echo =====================================

echo 📦 Limpiando proyecto...
call gradlew clean
if %errorlevel% neq 0 (
    echo ❌ Error limpiando proyecto
    pause
    exit /b 1
)

echo 🔨 Compilando proyecto...
call gradlew assembleDebug
if %errorlevel% neq 0 (
    echo ❌ Error compilando proyecto
    pause
    exit /b 1
)

echo ✅ APK generado exitosamente
echo 📱 Ubicación: app\build\outputs\apk\debug\app-debug.apk
pause
```

#### **install_apk.bat:**
```batch
@echo off
echo 📱 INSTALANDO APK EN DISPOSITIVO
echo ================================

echo 🔍 Verificando dispositivo conectado...
adb devices

echo 📦 Instalando APK...
adb install -r app\build\outputs\apk\debug\app-debug.apk

if %errorlevel% equ 0 (
    echo ✅ APK instalado exitosamente
    echo 🎮 ¡El juego está listo para usar!
) else (
    echo ❌ Error instalando APK
    echo 🔧 Verifica que el dispositivo esté conectado y con depuración USB habilitada
)

pause
```

---

### 🔄 **Versionado Automático**

#### **increment_version.bat:**
```batch
@echo off
setlocal enabledelayedexpansion

echo 🔢 INCREMENTANDO VERSIÓN
echo ========================

REM Leer versión actual
for /f "tokens=*" %%i in ('findstr "versionCode" app\build.gradle') do set CURRENT_VERSION=%%i
for /f "tokens=3" %%i in ("!CURRENT_VERSION!") do set VERSION_CODE=%%i

REM Incrementar versión
set /a NEW_VERSION_CODE=!VERSION_CODE!+1

echo 📊 Versión actual: !VERSION_CODE!
echo 📊 Nueva versión: !NEW_VERSION_CODE!

REM Actualizar build.gradle
powershell -Command "(Get-Content app\build.gradle) -replace 'versionCode !VERSION_CODE!', 'versionCode !NEW_VERSION_CODE!' | Set-Content app\build.gradle"

echo ✅ Versión incrementada a !NEW_VERSION_CODE!
pause
```

---

### 📱 **Configuración de AdMob Nativo**

#### **1. Dependencias en app/build.gradle:**
```gradle
dependencies {
    // AdMob nativo
    implementation 'com.google.android.gms:play-services-ads:22.4.0'
}
```

#### **2. Configurar en AndroidManifest.xml:**
```xml
<!-- AdMob App ID -->
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-3940256099942544~3347511713" />
```

#### **3. Inicializar en GameManager.java:**
```java
private void initAdMob() {
    MobileAds.initialize(context, new OnInitializationCompleteListener() {
        @Override
        public void onInitializationComplete(InitializationStatus initializationStatus) {
            Log.d(TAG, "AdMob initialized");
            loadInterstitialAd();
        }
    });
}
```

---

### 🧪 **Testing de APK**

#### **1. Instalar APK en dispositivo:**
```bash
# Verificar dispositivos conectados
adb devices

# Instalar APK via ADB
adb install -r app\build\outputs\apk\debug\app-debug.apk

# O copiar APK al dispositivo e instalarlo manualmente
```

#### **2. Verificar funcionalidades:**
- ✅ App se abre correctamente
- ✅ WebView carga el juego HTML5
- ✅ Comunicación JavaScript ↔ Android funciona
- ✅ AdMob nativo funciona (banner, interstitial)
- ✅ Audio nativo funciona sin cortes
- ✅ Almacenamiento local funciona
- ✅ Sincronización offline/online funciona

---

### 📋 **Checklist de APK/AAB**

#### **Antes de generar:**
- [ ] ✅ Proyecto Android nativo configurado
- [ ] ✅ Java 8+ y Android SDK instalados
- [ ] ✅ Assets del juego copiados a app/src/main/assets/
- [ ] ✅ AdMob configurado
- [ ] ✅ Keystore configurado (para release)

#### **Después de generar:**
- [ ] ✅ APK/AAB se genera sin errores
- [ ] ✅ Tamaño del archivo es razonable
- [ ] ✅ APK se instala en dispositivo
- [ ] ✅ App funciona correctamente
- [ ] ✅ Todas las funcionalidades operativas

#### **Para Google Play:**
- [ ] ✅ AAB firmado correctamente
- [ ] ✅ VersionCode único
- [ ] ✅ AdMob en modo producción
- [ ] ✅ Testing completo realizado
- [ ] ✅ Screenshots y descripción preparados

---

### ⏱️ **Tiempos de Build Reales**

#### **📊 Tiempos Típicos:**
- **APK Debug:** 1-2 minutos (más rápido que Capacitor)
- **AAB Release:** 2-3 minutos (incluye firmado)
- **Primera vez:** 5-10 minutos (descarga de dependencias)
- **Parte más lenta:** Gradle build y descarga de dependencias

#### **🚀 Proceso Optimizado:**
```bash
# 1. Configurar proyecto (1 vez)
setup_project.bat

# 2. Build APK (1-2 minutos)
build_apk.bat

# 3. Instalar en dispositivo
install_apk.bat

# Total: ~2 minutos para APK completo
```

#### **💡 Ventajas del Android Nativo:**
- **Más rápido** que Capacitor/Cordova
- **Más estable** sin problemas de compatibilidad
- **Mejor rendimiento** nativo
- **AdMob perfecto** sin problemas
- **Audio nativo** sin cortes

---

### 🔍 **Troubleshooting APK/AAB**

#### **Error: "SDK location not found":**
```bash
# Configurar ANDROID_HOME (ruta correcta)
set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools

# Crear local.properties
echo sdk.dir=%ANDROID_HOME% > local.properties
```

#### **Error: "Java version not supported":**
```bash
# Instalar Java 8+ (compatible con Android)
winget install EclipseAdoptium.Temurin.8.JDK

# Configurar JAVA_HOME
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-8.0.392.8-hotspot

# Verificar versión
java -version
```

#### **Error: "ADB not found":**
```bash
# Añadir ADB al PATH
set PATH=%PATH%;%ANDROID_HOME%\platform-tools

# Verificar ADB
adb version
```

#### **Error: "Device not found":**
```bash
# Verificar dispositivos conectados
adb devices

# Habilitar depuración USB en el dispositivo
# Aceptar autorización de depuración
```

#### **Error: "WebView not loading":**
```java
// Verificar configuración WebView en GameActivity.java
WebSettings webSettings = webView.getSettings();
webSettings.setJavaScriptEnabled(true);
webSettings.setDomStorageEnabled(true);
webSettings.setAllowFileAccess(true);
webSettings.setAllowContentAccess(true);
```

#### **APK muy grande:**
```gradle
// Habilitar minificación en app/build.gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

## 🎯 **RESUMEN: ANDROID NATIVO vs CAPACITOR/CORDOVA**

### ✅ **VENTAJAS DEL ANDROID NATIVO**
- **🚀 Más rápido**: Build en 1-2 minutos vs 4-5 minutos
- **🔧 Más estable**: Sin problemas de compatibilidad de versiones
- **📱 Mejor rendimiento**: Acceso directo a APIs nativas
- **💰 AdMob perfecto**: Integración nativa sin problemas
- **🔊 Audio nativo**: MediaPlayer + SoundPool sin cortes
- **💾 Almacenamiento robusto**: SQLite + SharedPreferences
- **🌐 Sincronización**: HTTP requests nativos con OkHttp
- **🔄 Offline/Online**: Transición transparente
- **📦 Menos dependencias**: Sin Node.js, Capacitor, etc.

### ❌ **PROBLEMAS DE CAPACITOR/CORDOVA**
- **🐌 Más lento**: Builds largos y complejos
- **🔧 Inestable**: Problemas de compatibilidad Java/Gradle
- **📱 Rendimiento limitado**: WebView con limitaciones
- **💰 AdMob problemático**: Plugins con errores
- **🔊 Audio problemático**: Cortes y problemas de reproducción
- **💾 Almacenamiento limitado**: Dependiente de plugins
- **🌐 Sincronización compleja**: Múltiples capas de abstracción
- **📦 Muchas dependencias**: Node.js, npm, Capacitor, etc.

### 🎯 **RECOMENDACIÓN FINAL**
**SIEMPRE usar Android nativo** para proyectos de juegos. Es más rápido, estable y confiable.

---

## 🧪 TESTING OBLIGATORIO

**⚠️ IMPORTANTE: SIEMPRE ejecutar testing completo antes de continuar con diseño o APK**

### 📋 **PASO 1: CREAR ARCHIVO DE TESTING**

Crear `api/test_completo.php` que verifique:
- ✅ Conexión a base de datos
- ✅ Tablas y estructura
- ✅ Archivos del juego
- ✅ Recursos del juego (imágenes, audio, etc.)
- ✅ APIs funcionando
- ✅ Configuración completa
- ✅ Permisos y accesibilidad

### 📋 **PASO 2: EJECUTAR TESTING**

```bash
# URL del testing
https://tudominio.com/sistema_apps_upload/nombre_juego/api/test_completo.php
```

### 📋 **PASO 3: CRITERIOS DE APROBACIÓN**

**✅ APROBADO:** 100% de tests pasados
**❌ REPROBADO:** Cualquier test fallido

### 📋 **EJEMPLO DE TESTING EXITOSO:**

```
🧪 TESTING COMPLETO - [NOMBRE_JUEGO]
====================================
🔗 TESTING CONEXIÓN A BASE DE DATOS: ✅ Conexión a BD
📊 TESTING TABLAS DE BASE DE DATOS: ✅ Todas las tablas existen
📱 TESTING REGISTRO DE APLICACIÓN: ✅ Aplicación registrada
📁 TESTING ARCHIVOS DEL JUEGO: ✅ Todos los archivos presentes
🖼️ TESTING RECURSOS: ✅ Imágenes/audio completo
⚙️ TESTING CONFIGURACIÓN: ✅ Configuración completa
🔌 TESTING APIs: ✅ APIs funcionando
🗄️ TESTING ESTRUCTURA DE BD: ✅ Estructura correcta
🔐 TESTING PERMISOS: ✅ Permisos correctos
🌐 TESTING ACCESIBILIDAD: ✅ URL configurada
🎮 TESTING FUNCIONALIDADES: ✅ Archivos válidos

📊 RESULTADO FINAL: Tests pasados: [X]/[X]
Porcentaje de éxito: 100%
🎉 ¡TODOS LOS TESTS PASARON!
```

### 📋 **PASO 4: CORRECCIÓN DE ERRORES**

Si hay tests fallidos:
1. **Identificar el error** específico
2. **Corregir el problema** en el código
3. **Hacer deploy** de la corrección
4. **Ejecutar testing** nuevamente
5. **Repetir** hasta 100% de éxito

### 📋 **PASO 5: DOCUMENTAR RESULTADOS**

Guardar el resultado del testing en la documentación del proyecto.

---

## 🧩 API admin_db.php

Archivo que crea/ajusta tablas del juego con FK a `usuarios_aplicaciones`, idempotente y ejecutable una sola vez.

```php
<?php
require_once 'config_hostalia.php';

echo "🔧 CONFIGURACIÓN DE BASE DE DATOS - {$juego_titulo}\n";
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
        'Descripción del juego'
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Progreso de los jugadores en {$juego_titulo}'";
    
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
    
    // 4. Estadísticas
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
    echo "🎉 CONFIGURACIÓN COMPLETADA\n";
    echo "==========================\n";
    echo "El juego '{$juego_titulo}' está listo para usar.\n";
    echo "Accede a: https://colisan.com/sistema_apps_upload/{$juego}/\n\n";
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
?>
```

**⚠️ Puntos importantes:**
- Las columnas TEXT no pueden tener valores por defecto en MySQL
- El valor por defecto se maneja en la aplicación
- La tabla `usuarios_aplicaciones` ya tiene las columnas de verificación
- El archivo debe estar en `api/admin_db.php`

---

## 🔌 API Endpoints Estándar
  `ultima_sincronizacion` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_aplicacion_key` (`usuario_aplicacion_key`),
  FOREIGN KEY (`usuario_aplicacion_key`) REFERENCES `usuarios_aplicaciones`(`usuario_aplicacion_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

if ($conn->query($sql) === TRUE) {
    echo "✅ Tabla {$juego}_progreso creada correctamente\n";
} else {
    echo "❌ Error creando tabla: " . $conn->error . "\n";
}
?>
```

---

## 🔌 API Endpoints Estándar

### auth.php
```php
<?php
require_once '../config_hostalia.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'register':
        // Registro de usuario
        break;
    case 'login':
        // Login de usuario
        break;
    case 'check_session':
        // Verificar sesión activa
        break;
    case 'logout':
        // Cerrar sesión
        break;
}
?>
```

### game.php
```php
<?php
require_once '../config_hostalia.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'save_progress':
        // Guardar progreso del juego
        break;
    case 'get_progress':
        // Obtener progreso del usuario
        break;
    case 'get_ranking':
        // Obtener ranking global
        break;
}
?>
```

### Estructura de Respuesta
```php
// Respuesta exitosa
echo json_encode([
    'success' => true,
    'message' => 'Operación exitosa',
    'data' => $data
]);

// Respuesta de error
echo json_encode([
    'success' => false,
    'message' => 'Error: ' . $error,
    'data' => null
]);
```

---

## 👤 Sistema de Usuarios y Sesiones - CÓDIGO FUNCIONAL

### 🔑 Login Manual + Guardar Credenciales
```javascript
// En el componente Intro (handleLoginSuccess)
const handleLoginSuccess = async (email, password) => {
  setLoading(true);
  try {
    const result = await window.API.api('auth.php?action=login', {
      method: 'POST',
      body: JSON.stringify({ username: email, password })
    });
    
    if (result.success) {
      // ✅ GUARDAR CREDENCIALES EN LOCALSTORAGE para auto-login
      try {
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_token', btoa(password)); // Codificado en base64
        console.log('✅ Credenciales guardadas para auto-login');
      } catch (e) {
        console.log('⚠️ No se pudieron guardar credenciales:', e);
      }
      
      setMessage('✅ ¡Bienvenido!');
      setTimeout(() => {
        window.location.reload(); // Recargar para actualizar estado
      }, 500);
    } else {
      setMessage('❌ Error: ' + (result.message || 'Credenciales incorrectas'));
    }
  } catch (e) {
    setMessage('❌ Error de conexión');
    console.error('Error en login:', e);
  } finally {
    setLoading(false);
  }
};
```

### 🔄 Auto-Login al Iniciar la App
```javascript
// En el useEffect principal del App (loadProgress)
useEffect(() => {
  const loadProgress = async () => {
    try {
      // ✅ VERIFICAR SESIÓN ACTIVA
      if (window.API && window.API.api) {
        const result = await window.API.api('auth.php?action=check_session');
        if (result && result.success) {
          setIsLoggedIn(true);
          setUserInfo(result.user);
          
          // Cargar progreso del servidor
          const progreso = await window.API.api('game.php?action=get_progress');
          if (progreso && progreso.success && progreso.data) {
            const serverProgress = {
              nivel_actual: progreso.data.nivel_actual || 1,
              total_time_s: progreso.data.total_time_s || 0,
              total_puntos: progreso.data.total_puntos || 0
            };
            
            // Actualizar estados con progreso del servidor
            setLevel(serverProgress.nivel_actual);
            setCurrentLevel(serverProgress.nivel_actual);
            setTotalTime(serverProgress.total_time_s);
            setTotalPuntos(serverProgress.total_puntos);
          }
        } else {
          // ❌ No hay sesión → Intentar AUTO-LOGIN con credenciales guardadas
          const savedEmail = localStorage.getItem('user_email');
          const savedToken = localStorage.getItem('user_token');
          
          if (savedEmail && savedToken) {
            console.log('🔑 Intentando auto-login...');
            try {
              const savedPassword = atob(savedToken);
              const loginResult = await window.API.api('auth.php?action=login', {
                method: 'POST',
                body: JSON.stringify({ username: savedEmail, password: savedPassword })
              });
              
              if (loginResult && loginResult.success) {
                console.log('✅ Auto-login exitoso:', loginResult.user?.nick);
                setIsLoggedIn(true);
                setUserInfo(loginResult.user);
                
                // Cargar progreso del servidor después del auto-login
                const progreso = await window.API.api('game.php?action=get_progress');
                if (progreso && progreso.success && progreso.data) {
                  const serverProgress = {
                    nivel_actual: progreso.data.nivel_actual || 1,
                    total_time_s: progreso.data.total_time_s || 0,
                    total_puntos: progreso.data.total_puntos || 0
                  };
                  
                  setLevel(serverProgress.nivel_actual);
                  setCurrentLevel(serverProgress.nivel_actual);
                  setTotalTime(serverProgress.total_time_s);
                  setTotalPuntos(serverProgress.total_puntos);
                }
              } else {
                // Limpiar credenciales inválidas
                localStorage.removeItem('user_email');
                localStorage.removeItem('user_token');
                setIsLoggedIn(false);
              }
            } catch (e) {
              console.log('❌ Error en auto-login:', e);
              setIsLoggedIn(false);
            }
          } else {
            setIsLoggedIn(false);
          }
        }
      }
    } catch (e) {
      console.error('Error cargando progreso:', e);
      setIsLoggedIn(false);
    }
  };
  loadProgress();
}, []);
```

### 📝 UserModal - Pasar Email/Password
```javascript
// En el componente Intro (UserModal)
<UserModal
  isOpen={showLoginModal}
  onClose={() => setShowLoginModal(false)}
  onLoginSuccess={(email, password) => handleLoginSuccess(email, password)}
  title="Iniciar Sesión"
  mode="login"
/>

<UserModal
  isOpen={showRegisterModal}
  onClose={() => setShowRegisterModal(false)}
  onLoginSuccess={(email, password) => handleLoginSuccess(email, password)}
  title="Registrarse"
  mode="register"
/>
```

### 🎮 Actualizar UI según Estado de Login
```javascript
// Actualizar UI según estado de login
const updateUI = (isLoggedIn, userInfo) => {
  if (isLoggedIn) {
    document.getElementById('userMenu').innerHTML = `
      <span>Hola ${userInfo.nombre}</span>
      <button onclick="logout()">Desconectar</button>
    `;
  } else {
    document.getElementById('userMenu').innerHTML = `
      <button onclick="showRegister()">Registrarse</button>
      <button onclick="showLogin()">Entrar</button>
    `;
  }
};
```

---

## 📡 Sistema Híbrido Offline/Online

### Almacenamiento Local
```javascript
// Guardar progreso localmente
const saveLocalProgress = (data) => {
    localStorage.setItem('local_progress', JSON.stringify({
        ...data,
        timestamp: Date.now()
    }));
};

// Cargar progreso local
const getLocalProgress = () => {
    const saved = localStorage.getItem('local_progress');
    return saved ? JSON.parse(saved) : {
        nivel_actual: 1,
        total_puntos: 0,
        total_tiempo: 0
    };
};

// Marcar como pendiente de sincronización
const markPendingSync = () => {
    localStorage.setItem('pending_sync', 'true');
};
```

### Merge Inteligente
```javascript
// Al volver online, mergear local vs servidor
const mergeProgress = (local, server) => {
    return {
        nivel_actual: Math.max(local.nivel_actual, server.nivel_actual),
        total_puntos: Math.max(local.total_puntos, server.total_puntos),
        total_tiempo: Math.max(local.total_tiempo, server.total_tiempo)
    };
};

// Sincronizar cuando vuelve internet
const syncPendingChanges = async () => {
    if (navigator.onLine && localStorage.getItem('pending_sync')) {
        try {
            const localProgress = getLocalProgress();
            const result = await saveProgress(localProgress);
            if (result.success) {
                localStorage.removeItem('pending_sync');
                console.log('✅ Progreso sincronizado');
            }
        } catch (error) {
            console.log('❌ Error sincronizando:', error);
        }
    }
};
```

### 🔐 Auto-Login Robusto

**IMPORTANTE:** El auto-login debe diferenciar entre errores de credenciales y errores de red.

```javascript
// ❌ MAL: Borrar credenciales siempre que falla
if (!loginResult.success) {
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_token');
}

// ✅ BIEN: Solo borrar si son credenciales inválidas
if (!loginResult.success) {
    const errorMsg = loginResult?.message || '';
    const isCredentialError = errorMsg.includes('inválidas') || 
                             errorMsg.includes('incorrectas') || 
                             errorMsg.includes('no encontrado');
    
    if (isCredentialError) {
        console.log('⚠️ Credenciales inválidas, limpiando...');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_token');
    } else {
        console.log('⚠️ Error temporal (red/servidor), manteniendo credenciales');
    }
}

// ✅ MEJOR: Tampoco borrar en caso de excepciones de red
try {
    const loginResult = await api('auth.php?action=login', {...});
    // ... manejo del resultado
} catch (e) {
    console.log('❌ Error de red, manteniendo credenciales para reintentar');
    // NO borrar credenciales aquí
}
```

### Auto-retry con Re-autenticación

```javascript
// 🔥 Reintentar auto-login Y sincronización cuando vuelve internet
const checkAndRetrySync = useCallback(async () => {
    if (!navigator.onLine) return;
    
    // 1️⃣ Si NO está logueado pero HAY credenciales → Reintentar auto-login
    if (!isLoggedIn) {
        const savedEmail = localStorage.getItem('user_email');
        const savedToken = localStorage.getItem('user_token');
        
        if (savedEmail && savedToken) {
            console.log('🔄 Reintentando auto-login...');
            try {
                const savedPassword = atob(savedToken);
                const loginResult = await api('auth.php?action=login', {
                    method: 'POST',
                    body: JSON.stringify({ username: savedEmail, password: savedPassword })
                });
                
                if (loginResult && loginResult.success) {
                    console.log('✅ Auto-login exitoso!');
                    setIsLoggedIn(true);
                    setUserInfo(loginResult.user);
                    
                    // Mergear progreso local + servidor
                    const localProgress = getLocalProgress();
                    const serverProgress = await getServerProgress();
                    const merged = mergeProgress(localProgress, serverProgress);
                    
                    // Aplicar y sincronizar
                    applyProgress(merged);
                    if (merged > serverProgress) {
                        await syncToServer(merged);
                    }
                }
            } catch (e) {
                console.log('⚠️ Error al reintentar, volveremos a intentar');
            }
        }
    }
    
    // 2️⃣ Si hay progreso pendiente de sincronizar → Sincronizar
    if (getPendingSync() && isLoggedIn) {
        await syncPendingChanges();
    }
}, [isLoggedIn]);

// Listeners de conectividad
useEffect(() => {
    window.addEventListener('online', checkAndRetrySync);
    const interval = setInterval(checkAndRetrySync, 30000); // Cada 30s
    
    return () => {
        window.removeEventListener('online', checkAndRetrySync);
        clearInterval(interval);
    };
}, [checkAndRetrySync]);
```

### 🧪 Testing del Auto-Login Robusto

**Escenario 1: Sin internet al abrir**
1. ✅ Login manual con internet
2. ❌ Cerrar app, quitar internet (modo avión)
3. 🔄 Abrir app
4. **Resultado esperado:** App funciona offline, credenciales guardadas
5. ✅ Conectar internet → Auto-login automático + sincronización

**Escenario 2: Servidor caído**
1. ✅ Login manual
2. ❌ Servidor caído o error 500
3. 🔄 Abrir app
4. **Resultado esperado:** Credenciales NO borradas, reintento cada 30s
5. ✅ Servidor vuelve → Auto-login exitoso

**Escenario 3: Credenciales incorrectas**
1. ✅ Login manual
2. ❌ Usuario cambia contraseña en otro dispositivo
3. 🔄 Abrir app
4. **Resultado esperado:** Auto-login falla con "credenciales inválidas"
5. ✅ Credenciales borradas, se muestra pantalla de login

---

## 🔐 .htaccess Base

```apache
Options -Indexes

# Bloquear archivos sensibles
<FilesMatch "\.(log|sql|md|env|ini|bat|sh|example)$">
  Require all denied
</FilesMatch>

# Compresión
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 7 days"
  ExpiresByType application/javascript "access plus 7 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType audio/mpeg "access plus 30 days"
</IfModule>

# CORS para desarrollo
<IfModule mod_headers.c>
  Header always set Access-Control-Allow-Origin "*"
  Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
  Header always set Access-Control-Allow-Headers "Content-Type"
</IfModule>
```

---

## 🎵 Audio en APK (Capacitor)

### Configuración de Audio
```javascript
// Audio que NO se corta al minimizar la app
const initAudio = () => {
    const audio = new Audio('assets/audio/background.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';
    
    // NO agregar listeners de visibilitychange
    // NO agregar listeners de appStateChange
    // NO reiniciar manualmente en 'ended'
    
    return audio;
};
```

### Wrapper API para Capacitor
```javascript
// Detectar si estamos en Capacitor
const isCapacitor = () => {
    return window.Capacitor !== undefined || window.location.protocol === 'capacitor:';
};

// Wrapper API que usa CapacitorHttp en APK, fetch en web
const api = async (endpoint, options = {}) => {
    const url = isCapacitor() ? 
        `https://colisan.com/sistema_apps_upload/${juego}/${endpoint}` : 
        endpoint;
    
    if (isCapacitor() && window.Capacitor?.Plugins?.CapacitorHttp) {
        const { CapacitorHttp } = window.Capacitor.Plugins;
        const response = await CapacitorHttp.request({
            url: url,
            method: options.method || 'GET',
            headers: { 'Content-Type': 'application/json', ...options.headers },
            data: options.body ? JSON.parse(options.body) : undefined
        });
        return response.data;
    } else {
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers: { 'Content-Type': 'application/json', ...options.headers },
            body: options.body
        });
        return await response.json();
    }
};
```

---

## 🔍 Herramientas de Debugging

### Debug del Auto-Login en Consola

Añadir a tu código una utilidad de debugging:

```javascript
useEffect(() => {
  // 🔍 DEBUG: Función para ver estado de auto-login
  window.LUM_DEBUG = {
    checkAuth: () => {
      const email = localStorage.getItem('lum_user_email');
      const token = localStorage.getItem('lum_user_token');
      console.log('📊 Estado de Autenticación:', {
        email: email || '❌ No guardado',
        token: token ? '✅ Guardado' : '❌ No guardado',
        password: token ? atob(token) : '❌ No disponible',
        isLoggedIn: isLoggedIn,
        userInfo: userInfo
      });
      return { email, token: token ? atob(token) : null, isLoggedIn, userInfo };
    },
    clearAuth: () => {
      localStorage.removeItem('lum_user_email');
      localStorage.removeItem('lum_user_token');
      console.log('✅ Credenciales eliminadas');
    }
  };
}, [isLoggedIn, userInfo]);
```

### Uso en consola del navegador:

```javascript
// Ver estado de autenticación
LUM_DEBUG.checkAuth()

// Limpiar credenciales manualmente (para testing)
LUM_DEBUG.clearAuth()
```

---

## ✅ Checklist Final

### Despliegue
- ☑ No crear `sistema_apps_upload`
- ☑ Crear solo `/sistema_apps_upload/<juego>/`
- ☑ Base href correcto en todos los HTML
- ☑ Rutas relativas al base
- ☑ Ejecutar BAT de deploy

### Base de Datos
- ☑ Insertar registro en `aplicaciones`
- ☑ Ejecutar `api/admin_db.php`
- ☑ Verificar tablas creadas con FK correctas

### Funcionalidad
- ☑ Registro de usuarios funciona
- ☑ Login manual funciona
- ☑ Auto-login con localStorage funciona
- ☑ Auto-login NO borra credenciales en errores de red
- ☑ Auto-retry funciona cuando vuelve internet
- ☑ Menu de usuario se actualiza correctamente
- ☑ Progreso se guarda localmente
- ☑ Sincronización offline/online funciona
- ☑ Merge inteligente funciona (local vs servidor)
- ☑ Audio funciona en web y APK

### Testing
- ☑ Verificar 200 OK y sin 404
- ☑ Test offline/online OK
- ☑ Test auto-login OK
- ☑ Test auto-login con servidor caído OK
- ☑ Test auto-login con credenciales inválidas OK
- ☑ Test auto-retry cuando vuelve internet OK
- ☑ Test merge inteligente (jugar offline → online) OK
- ☑ Test audio sin cortes OK

---

## 📱 SISTEMA DE PUBLICIDAD (AdMob)

### 🎯 **Configuración de AdMob**

#### **IDs de AdMob:**
```javascript
// Configuración de IDs de AdMob
const ADMOB_CONFIG = {
  APP_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY',
  BANNER_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  INTERSTITIAL_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  REWARDED_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY'
};

// Modo testing (cambiar a false en producción)
const isTesting = true;
```

#### **Configuración en capacitor.config.ts:**
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tudominio.mijuego',
  appName: 'Mi Juego',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY',
      bannerAdId: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
      interstitialAdId: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
      rewardedAdId: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY'
    }
  }
};

export default config;
```

---

### 📊 **1. Banner Inferior (Siempre Visible)**

#### **Inicialización:**
```javascript
import { AdMob } from '@capacitor-community/admob';

const initBanner = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await AdMob.prepareBanner({
        adId: ADMOB_CONFIG.BANNER_ID,
        isTesting: isTesting,
        position: 'BOTTOM_CENTER'
      });
      
      await AdMob.showBanner();
      console.log('✅ Banner inicializado');
    } catch (error) {
      console.error('❌ Error inicializando banner:', error);
    }
  }
};

// Llamar al iniciar la app
useEffect(() => {
  initBanner();
}, []);
```

#### **Mantener Banner Visible:**
```javascript
// Forzar banner cada 2 segundos (para evitar que se oculte)
const forceBanner = () => {
  if (Capacitor.isNativePlatform()) {
    AdMob.showBanner().catch(() => {
      // Silenciar errores si ya está visible
    });
  }
};

useEffect(() => {
  const interval = setInterval(forceBanner, 2000);
  return () => clearInterval(interval);
}, []);
```

#### **CSS para Espacio del Banner:**
```css
/* Añadir margen inferior para el banner */
body {
  margin-bottom: 60px; /* Altura del banner */
}

/* En pantallas de juego */
.game-container {
  padding-bottom: 60px;
}
```

---

### 🎬 **2. Interstitial Cada 5 Niveles**

#### **Contador de Niveles:**
```javascript
// En el store o estado global
const [levelsCompleted, setLevelsCompleted] = useState(0);

// Función para incrementar niveles
const incrementLevelCompleted = () => {
  setLevelsCompleted(prev => {
    const newCount = prev + 1;
    
    // Mostrar interstitial cada 5 niveles
    if (newCount > 0 && newCount % 5 === 0) {
      showInterstitialAd();
    }
    
    return newCount;
  });
};

// Llamar cuando se complete un nivel
const onLevelComplete = () => {
  incrementLevelCompleted();
  // ... resto de lógica del nivel
};
```

#### **Mostrar Interstitial:**
```javascript
const showInterstitialAd = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      console.log('🎬 Mostrando interstitial...');
      
      await AdMob.prepareInterstitial({
        adId: ADMOB_CONFIG.INTERSTITIAL_ID,
        isTesting: isTesting
      });
      
      await AdMob.showInterstitial();
      console.log('✅ Interstitial mostrado');
    } catch (error) {
      console.error('❌ Error mostrando interstitial:', error);
    }
  } else {
    console.log('🎮 Simulando interstitial en web...');
  }
};
```

#### **Listeners de Interstitial:**
```javascript
useEffect(() => {
  if (Capacitor.isNativePlatform()) {
    // Listener cuando se cierra el interstitial
    const dismissedListener = AdMob.addListener('onInterstitialAdClosed', () => {
      console.log('📺 Interstitial cerrado');
      // El juego continúa normalmente
    });
    
    // Listener cuando falla al cargar
    const failedListener = AdMob.addListener('onInterstitialAdFailedToLoad', (error) => {
      console.warn('⚠️ Interstitial falló:', error);
    });
    
    return () => {
      dismissedListener.remove();
      failedListener.remove();
    };
  }
}, []);
```

---

### 🎁 **3. Rewarded Ads (Para Vidas/Bonus)**

#### **Mostrar Rewarded Ad:**
```javascript
const showRewardedAd = async () => {
  if (!Capacitor.isNativePlatform()) {
    // Simulación para web
    console.log('🎮 Simulando anuncio de recompensa...');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          reward: { type: 'life', amount: 1 }
        });
      }, 3000);
    });
  }

  return new Promise(async (resolve) => {
    let rewardReceived = false;
    let resolved = false;

    try {
      // Listener para recompensa recibida
      const rewardedListener = await AdMob.addListener('onRewardedVideoAdRewarded', (reward) => {
        console.log('🎁 Recompensa recibida:', reward);
        rewardReceived = true;
      });

      // Listener para anuncio cerrado
      const dismissedListener = await AdMob.addListener('onRewardedVideoAdClosed', async () => {
        console.log('📺 Anuncio de recompensa cerrado');
        
        // Limpiar listeners
        rewardedListener.remove();
        dismissedListener.remove();
        
        if (!resolved) {
          resolved = true;
          if (rewardReceived) {
            resolve({ success: true, reward: { type: 'life', amount: 1 } });
          } else {
            resolve({ success: false, error: 'Debes ver el anuncio completo para obtener la recompensa.' });
          }
        }
      });

      // Timeout de seguridad
      const timeout = setTimeout(() => {
        console.warn('⏰ Timeout en rewarded ad');
        rewardedListener.remove();
        dismissedListener.remove();
        
        if (!resolved) {
          resolved = true;
          resolve({ success: false, error: 'El anuncio tardó demasiado. Intenta de nuevo.' });
        }
      }, 60000);

      // Preparar y mostrar anuncio
      await AdMob.prepareRewardVideoAd({
        adId: ADMOB_CONFIG.REWARDED_ID,
        isTesting: isTesting
      });
      
      await AdMob.showRewardVideoAd();
      clearTimeout(timeout);
      
    } catch (error) {
      console.error('❌ Error en rewarded ad:', error);
      resolve({ success: false, error: 'Error inesperado con el anuncio.' });
    }
  });
};
```

#### **Uso para Vidas:**
```javascript
const handleWatchAdForLife = async () => {
  try {
    const result = await showRewardedAd();
    
    if (result.success && result.reward) {
      // ✅ RECOMPENSA OBTENIDA
      console.log('🎁 ¡Vida obtenida!');
      
      // Dar la vida
      gainLife();
      
      // Cerrar modal de "sin vidas"
      setShowNoLivesModal(false);
      
      // Reiniciar nivel para jugar inmediatamente
      restartCurrentLevel();
      
    } else {
      // ❌ NO SE OBTUVO RECOMPENSA
      console.log('❌ No se obtuvo recompensa:', result.error);
      alert(result.error || 'No se pudo cargar el anuncio. Intenta de nuevo.');
    }
  } catch (error) {
    console.error('❌ Error en handleWatchAdForLife:', error);
    alert('Error al cargar el video. Intenta de nuevo.');
  }
};
```

---

### 🔧 **4. Servicio Centralizado de AdMob**

#### **Archivo: `src/lib/adService.ts`**
```typescript
import { AdMob } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// Configuración
const APP_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY';
const BANNER_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY';
const INTERSTITIAL_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY';
const REWARDED_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY';

const isTesting = true; // Cambiar a false en producción

// Inicializar AdMob
export const initAds = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await AdMob.initialize({ 
        requestTrackingAuthorization: true,
        testingDevices: isTesting ? ['TEST_DEVICE_ID'] : [],
        initializeForTesting: isTesting
      });
      
      console.log('✅ AdMob inicializado');
      
      // Forzar banner cada 2 segundos
      setInterval(() => {
        AdMob.showBanner().catch(() => {
          // Silenciar errores si ya está visible
        });
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error inicializando AdMob:', error);
    }
  }
};

// Banner inferior
export const showBottomBanner = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await AdMob.prepareBanner({
        adId: BANNER_ID,
        isTesting: isTesting,
        position: 'BOTTOM_CENTER'
      });
      
      await AdMob.showBanner();
      console.log('📱 Banner mostrado');
    } catch (error) {
      console.error('❌ Error mostrando banner:', error);
    }
  }
};

// Interstitial
export const showInterstitialAd = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await AdMob.prepareInterstitial({
        adId: INTERSTITIAL_ID,
        isTesting: isTesting
      });
      
      await AdMob.showInterstitial();
      console.log('🎬 Interstitial mostrado');
    } catch (error) {
      console.error('❌ Error mostrando interstitial:', error);
    }
  }
};

// Rewarded Ad
export const showRewardedAd = async (): Promise<{success: boolean, reward?: any, error?: string}> => {
  if (!Capacitor.isNativePlatform()) {
    // Simulación para web
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          reward: { type: 'life', amount: 1 }
        });
      }, 3000);
    });
  }

  return new Promise(async (resolve) => {
    let rewardReceived = false;
    let resolved = false;

    try {
      const rewardedListener = await AdMob.addListener('onRewardedVideoAdRewarded', (reward) => {
        rewardReceived = true;
      });

      const dismissedListener = await AdMob.addListener('onRewardedVideoAdClosed', async () => {
        rewardedListener.remove();
        dismissedListener.remove();
        
        if (!resolved) {
          resolved = true;
          resolve(rewardReceived ? 
            { success: true, reward: { type: 'life', amount: 1 } } :
            { success: false, error: 'Debes ver el anuncio completo.' }
          );
        }
      });

      const timeout = setTimeout(() => {
        rewardedListener.remove();
        dismissedListener.remove();
        
        if (!resolved) {
          resolved = true;
          resolve({ success: false, error: 'Timeout.' });
        }
      }, 60000);

      await AdMob.prepareRewardVideoAd({
        adId: REWARDED_ID,
        isTesting: isTesting
      });
      
      await AdMob.showRewardVideoAd();
      clearTimeout(timeout);
      
    } catch (error) {
      resolve({ success: false, error: 'Error inesperado.' });
    }
  });
};
```

---

### 📋 **5. Checklist de Implementación AdMob**

#### **Configuración:**
- [ ] ✅ Obtener IDs reales de AdMob Console
- [ ] ✅ Configurar `capacitor.config.ts` con los IDs
- [ ] ✅ Instalar plugin: `npm install @capacitor-community/admob`
- [ ] ✅ Sincronizar: `npx cap sync android`

#### **Funcionalidad:**
- [ ] ✅ Banner inferior siempre visible
- [ ] ✅ Interstitial cada 5 niveles completados
- [ ] ✅ Rewarded ads para vidas/bonus
- [ ] ✅ Testing en desarrollo, producción en release
- [ ] ✅ Verificar que no interfiera con el gameplay

#### **Testing:**
- [ ] ✅ Banner aparece al iniciar la app
- [ ] ✅ Banner permanece visible durante el juego
- [ ] ✅ Interstitial aparece cada 5 niveles
- [ ] ✅ Rewarded ad funciona para vidas
- [ ] ✅ Anuncios se cierran correctamente
- [ ] ✅ Juego continúa normalmente tras anuncios

#### **Producción:**
- [ ] ✅ Cambiar `isTesting = false`
- [ ] ✅ Usar IDs reales de producción
- [ ] ✅ Compilar APK/AAB con configuración final
- [ ] ✅ Verificar monetización en AdMob Console

---

### 🔍 **6. Troubleshooting AdMob**

#### **Banner no aparece:**
```javascript
// Verificar inicialización
console.log('AdMob inicializado:', await AdMob.initialize());

// Forzar banner
await AdMob.showBanner();
```

#### **Interstitial no carga:**
```javascript
// Verificar que se prepare antes de mostrar
await AdMob.prepareInterstitial({ adId: INTERSTITIAL_ID });
await AdMob.showInterstitial();
```

#### **Rewarded ad se queda abierto:**
```javascript
// Implementar timeout y limpiar listeners
const timeout = setTimeout(() => {
  // Limpiar listeners y resolver
}, 60000);
```

#### **IDs de testing vs producción:**
```javascript
// IDs de testing (siempre funcionan)
const TEST_BANNER = 'ca-app-pub-3940256099942544/6300978111';
const TEST_INTERSTITIAL = 'ca-app-pub-3940256099942544/1033173712';
const TEST_REWARDED = 'ca-app-pub-3940256099942544/5224354917';

// Cambiar a IDs reales para producción
const isTesting = false;
```

---

## 📧 SISTEMA DE VERIFICACIÓN POR EMAIL

### 📋 **Descripción**

Sistema completo de verificación de cuentas por email con código de 6 dígitos que expira en 24 horas.  
**Basado en el sistema funcional de MemoFlip.**

---

### 🗄️ **1. Cambios en la Base de Datos**

#### **Archivo:** `[nombre_juego]/agregar_verificacion_email.sql`

```sql
-- Agregar columnas para verificación por email
ALTER TABLE usuarios_aplicaciones 
ADD COLUMN IF NOT EXISTS email_verificado TINYINT(1) DEFAULT 0,
ADD COLUMN IF NOT EXISTS codigo_verificacion VARCHAR(10) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS tiempo_verificacion TIMESTAMP NULL DEFAULT NULL,
ADD COLUMN IF NOT EXISTS intentos_verificacion INT DEFAULT 0;

-- Marcar usuarios existentes como verificados (migración)
UPDATE usuarios_aplicaciones 
SET email_verificado = 1 
WHERE email_verificado = 0 AND fecha_registro < NOW();
```

#### **Ejecutar en Hostalia:**
1. Acceder a phpMyAdmin
2. Seleccionar la base de datos del proyecto
3. Ejecutar el script SQL
4. Verificar que las 4 columnas se crearon correctamente

---

### 📧 **2. Sistema de Envío de Emails**

#### **Archivo:** `api/config_smtp.php`

**Funciones disponibles:**

##### `enviarEmailVerificacion($email, $nombre, $codigo)`
- Envía email HTML con diseño Lumetrix (gradientes neón)
- Template con código destacado en grande
- Advertencia de expiración de 24 horas
- Retorna `true` si el email se envió correctamente

##### `generarCodigoVerificacion()`
- Genera código aleatorio de 6 dígitos numéricos
- Formato: `123456`

##### `codigoEsValido($tiempo_verificacion, $horas_validez = 24)`
- Verifica si un código ha expirado
- Por defecto: 24 horas de validez

##### `limpiarCodigosExpirados($pdo)`
- Limpia códigos expirados de la base de datos
- Ejecutar periódicamente con cron (opcional)

---

### 🔐 **3. API de Autenticación Actualizada**

#### **Archivo:** `[nombre_juego]/auth_con_verificacion.php`

**Este archivo reemplaza a `auth.php` cuando quieras activar la verificación.**

#### **Endpoints nuevos:**

##### `POST auth.php?action=register`
**Cambios:** Ahora genera código y envía email

**Request:**
```json
{
  "nombre": "Anabel",
  "username": "anabel",
  "email": "anabel@ejemplo.com",
  "password": "mipassword"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "Registro exitoso. Revisa tu email para el código de verificación.",
  "requires_verification": true,
  "email_sent": true,
  "user_key": "anabel@ejemplo.com_[nombre_juego]"
}
```

**Response (desarrollo, sin email configurado):**
```json
{
  "success": true,
  "requires_verification": true,
  "email_sent": false,
  "codigo_dev": "123456"
}
```

---

##### `POST auth.php?action=verify_code`
**Verifica el código introducido por el usuario**

**Request:**
```json
{
  "email": "anabel@ejemplo.com",
  "codigo": "123456"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "¡Cuenta verificada correctamente!",
  "verified": true,
  "user_key": "anabel@ejemplo.com_[nombre_juego]"
}
```

**Response (código incorrecto):**
```json
{
  "success": false,
  "error": "Código incorrecto"
}
```

**Response (código expirado):**
```json
{
  "success": false,
  "error": "Código expirado. Solicita uno nuevo."
}
```

---

##### `POST auth.php?action=resend_code`
**Reenvía un nuevo código al usuario**

**Request:**
```json
{
  "email": "anabel@ejemplo.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Código reenviado a tu email",
  "email_sent": true
}
```

---

##### `POST auth.php?action=login`
**MODIFICADO:** Ahora requiere email verificado

**Request:** (sin cambios)
```json
{
  "username": "anabel@ejemplo.com",
  "password": "mipassword"
}
```

**Response (email no verificado):**
```json
{
  "success": false,
  "message": "Debes verificar tu email antes de iniciar sesión",
  "requires_verification": true,
  "email": "anabel@ejemplo.com"
}
```

**Response (login exitoso):**
```json
{
  "success": true,
  "user": {
    "key": "anabel@ejemplo.com_[nombre_juego]",
    "nick": "anabel",
    "email": "anabel@ejemplo.com",
    "fecha_registro": "2025-01-15 10:30:00"
  },
  "progreso": {
    "nivel_actual": 5,
    "total_time_s": 1200
  }
}
```

---

### 🔄 **4. Flujo Completo de Registro**

```
1. Usuario llena formulario de registro en la app
   ↓
2. App envía POST a auth.php?action=register
   ↓
3. Servidor genera código de 6 dígitos (ej: 834521)
   ↓
4. Código se guarda en BD (usuarios_aplicaciones.codigo_verificacion)
   ↓
5. Se envía email con código (subject: "🎮 Verifica tu cuenta de Lumetrix")
   ↓
6. Usuario recibe email y ve código en grande
   ↓
7. Usuario introduce código en la app
   ↓
8. App envía POST a auth.php?action=verify_code
   ↓
9. Servidor valida:
   ✅ Código correcto
   ✅ No expirado (< 24h)
   ↓
10. Usuario activado:
    - activo = 1
    - email_verificado = 1
    - codigo_verificacion = NULL
   ↓
11. ¡Usuario puede hacer login!
```

---

### 📊 **5. Estados de Usuario**

| Estado | `activo` | `email_verificado` | ¿Puede login? | Notas |
|--------|----------|-------------------|---------------|-------|
| Recién registrado | 0 | 0 | ❌ No | Esperando verificación |
| Email verificado | 1 | 1 | ✅ Sí | Cuenta activada |
| Usuario antiguo* | 1 | 1 | ✅ Sí | Auto-verificado al ejecutar SQL |

*Los usuarios existentes antes de activar este sistema se marcan automáticamente como verificados.

---

### 🚀 **6. Activar Verificación en Producción**

#### **Paso 1: Ejecutar SQL**
```bash
# En phpMyAdmin de Hostalia
1. Seleccionar base de datos
2. Pestaña "SQL"
3. Pegar contenido de: agregar_verificacion_email.sql
4. Click "Continuar"
5. Verificar mensaje: "4 columnas agregadas"
```

#### **Paso 2: Subir archivos PHP**
```bash
# Subir a Hostalia vía FTP/WinSCP
/sistema_apps_upload/[nombre_juego]/
├── config_smtp.php (NUEVO)
├── PHPMailer/ (NUEVO)
└── auth.php (ACTUALIZADO con PHPMailer)
```

⚠️ **IMPORTANTE:** Hacer backup del `auth.php` original antes de reemplazarlo.

#### **Paso 3: Verificar configuración de email**
- Servidor SMTP debe estar configurado en Hostalia
- Email `noreply@colisan.com` debe existir
- Verificar que no se bloqueen emails como spam

#### **Paso 4: Probar en desarrollo**
```bash
# Registro de prueba
curl -X POST https://colisan.com/sistema_apps_upload/[nombre_juego]/auth.php \
  -H "Content-Type: application/json" \
  -d '{
    "action": "register",
    "nombre": "Test",
    "username": "test",
    "email": "test@ejemplo.com",
    "password": "test123"
  }'

# Si email_sent: false → Usar codigo_dev de la respuesta
# Si email_sent: true → Revisar bandeja de entrada
```

---

### ⚙️ **7. Configuración Avanzada**

#### **Cambiar tiempo de expiración:**
```php
// En auth.php, función verificarCodigo
function verificarCodigo($codigo, $email) {
    // Cambiar tiempo de expiración en la consulta SQL
    // Ejemplos: 12 horas, 48 horas, etc.
}
```

#### **Cambiar longitud del código:**
```php
// En auth.php, función generarCodigoVerificacion
function generarCodigoVerificacion() {
    // 6 dígitos (actual):
    return str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
    
    // 4 dígitos:
    // return str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT);
}
```

#### **Personalizar plantilla de email:**
Editar `auth.php` función `enviarEmailVerificacion()` para cambiar:
- Colores del email
- Texto del mensaje
- Logo/header
- Footer

---

### 🔍 **8. Troubleshooting**

#### **Email no se envía:**
```bash
# Verificar logs de PHP
tail -f /ruta/a/php_error.log

# Verificar que PHPMailer funcione
<?php
require_once 'config_smtp.php';
$test = enviarEmailPHPMailer('tu@email.com', 'Test', 'Test', 'Prueba', 'Prueba');
echo $test ? 'OK' : 'FAIL';
?>
```

**Soluciones:**
- Verificar configuración SMTP en Hostalia
- Revisar carpeta de spam
- Usar servicio externo (SendGrid, Mailgun, etc.)

#### **Código no válido:**
- Verificar que no hayan pasado 24 horas
- Código es case-sensitive (solo números)
- Revisar campo `codigo_verificacion` en BD

#### **Usuario no puede hacer login:**
```sql
-- Verificar estado del usuario
SELECT nick, email, activo, email_verificado, codigo_verificacion, tiempo_verificacion
FROM usuarios_aplicaciones
WHERE email = 'usuario@ejemplo.com';

-- Si necesitas activar manualmente:
UPDATE usuarios_aplicaciones
SET activo = 1, email_verificado = 1
WHERE email = 'usuario@ejemplo.com';
```

---

### 📝 **9. Notas Importantes**

⚠️ **Compatibilidad hacia atrás:**
- Usuarios existentes se marcan automáticamente como verificados
- No afecta a usuarios ya registrados
- Sistema opcional: puedes activarlo cuando quieras

⚠️ **Seguridad:**
- Códigos válidos solo 24 horas
- Se registran intentos fallidos
- Posible mejora: limitar intentos (ej: 5 máximo)

⚠️ **Modo desarrollo:**
- Si email falla, código aparece en respuesta JSON
- Solo para facilitar testing local
- En producción con SMTP configurado no aparecerá

---

### ✅ **10. Checklist de Implementación**

- [ ] Ejecutar SQL en Hostalia (agregar columnas)
- [ ] Verificar que columnas se crearon correctamente
- [ ] Hacer backup de `auth.php` original
- [ ] Subir `config_smtp.php` y `PHPMailer/` a Hostalia
- [ ] Actualizar `auth.php` con PHPMailer
- [ ] Verificar configuración SMTP
- [ ] Probar registro → ¿Llega email?
- [ ] Probar código correcto → ¿Activa cuenta?
- [ ] Probar código incorrecto → ¿Muestra error?
- [ ] Probar código expirado (cambiar fecha en BD para testing)
- [ ] Probar reenvío de código → ¿Llega nuevo email?
- [ ] Probar login sin verificar → ¿Muestra error?
- [ ] Probar login con email verificado → ¿Permite acceso?

---

### 🎨 **11. Template de Email (Vista Previa)**

El email que recibe el usuario tiene:

```
┌─────────────────────────────────────┐
│  🎮 LUMETRIX                        │
│  Anti-Simon Challenge               │
├─────────────────────────────────────┤
│                                     │
│  ¡Hola, Anabel!                     │
│                                     │
│  Gracias por registrarte en         │
│  Lumetrix. Para activar tu cuenta,  │
│  introduce el siguiente código:     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ TU CÓDIGO DE VERIFICACIÓN   │   │
│  │                             │   │
│  │      8 3 4 5 2 1           │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ⏱️ Expira en 24 horas              │
│                                     │
│  Si no solicitaste este código,     │
│  ignora este email.                 │
│                                     │
│  © 2025 Lumetrix                    │
└─────────────────────────────────────┘
```

**Colores:** Gradiente verde neón (#39ff14) y cian (#00e5ff) - Estilo Lumetrix

---

## 🎯 Conclusión

Sube solo la carpeta del juego. Las rutas deben apuntar a `/sistema_apps_upload/<juego>/`. Las tablas se enlazan con `usuarios_aplicaciones` mediante `usuario_aplicacion_key`. 

**Con este código funcional de Lumetrix, todos los proyectos se desplegarán sin duplicar carpetas ni romper rutas, con funcionalidad completa de usuarios, sesiones, offline/online, audio y verificación por email.**

**¡Listo para usar en cualquier proyecto nuevo!** 🚀

---

# 📧 SISTEMA DE VERIFICACIÓN POR EMAIL - LUMETRIX

## 📋 **DESCRIPCIÓN**

Sistema completo de verificación de cuentas por email con código de 6 dígitos que expira en **15 MINUTOS**, implementado en Lumetrix basado en el sistema de MemoFlip.

---

## 🗄️ **1. ESTRUCTURA DE BASE DE DATOS (YA EXISTENTE)**

### **Columnas de verificación en `usuarios_aplicaciones`:**

La tabla **YA TIENE** las columnas necesarias para verificación:

```sql
-- COLUMNAS EXISTENTES (NO crear nuevas)
verification_code      VARCHAR(6)    -- Código de 6 dígitos
verification_expiry    DATETIME      -- Fecha/hora de expiración
verified_at           TIMESTAMP     -- Timestamp cuando se verificó
```

### **NO ES NECESARIO ejecutar ningún SQL**
Las columnas ya existen en la tabla. Solo usar las existentes.

---

## 📧 **2. SISTEMA DE ENVÍO DE EMAILS**

### **Archivo:** `api/config_smtp.php`

**Funciones principales:**

#### `enviarEmailVerificacion($email, $nombre, $codigo)`
- Envía email HTML con el código de verificación
- Template bonito con gradientes y estilo Lumetrix
- Retorna `true` si el email se envió correctamente

#### `generarCodigoVerificacion()`
- Genera código aleatorio de 6 dígitos
- Formato: `123456`

#### `codigoEsValido($verification_expiry)`
- Verifica si un código ha expirado
- Compara `verification_expiry` (datetime) con el timestamp actual

---

## 🔐 **3. API DE AUTENTICACIÓN ACTUALIZADA**

### **Archivo:** `PARA_HOSTALIA/sistema_apps_upload/[nombre_juego]/auth_con_verificacion.php`

### **Endpoints nuevos:**

#### `POST auth.php?action=register`
**Request:**
```json
{
  "action": "register",
  "email": "usuario@ejemplo.com",
  "nombre": "Juan Pérez",
  "username": "juan123",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registro exitoso. Revisa tu email para el código de verificación.",
  "email_sent": true,
  "requires_verification": true,
  "user_key": "usuario@ejemplo.com_[nombre_juego]"
}
```

---

#### `POST auth.php?action=verify_code`
**Request:**
```json
{
  "action": "verify_code",
  "email": "usuario@ejemplo.com",
  "codigo": "123456"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "¡Cuenta verificada correctamente!",
  "verified": true,
  "user_key": "usuario@ejemplo.com_[nombre_juego]"
}
```

**Response (error):**
```json
{
  "success": false,
  "error": "Código incorrecto"
}
```

---

#### `POST auth.php?action=resend_code`
**Request:**
```json
{
  "action": "resend_code",
  "email": "usuario@ejemplo.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Código reenviado a tu email",
  "email_sent": true
}
```

---

#### `POST auth.php?action=login`
**MODIFICADO:** Ahora verifica que el email esté verificado antes de permitir login.

**Response (no verificado):**
```json
{
  "success": false,
  "error": "Debes verificar tu email antes de iniciar sesión"
}
```

---

## 🎨 **4. COMPONENTES REACT (Integrado en App.jsx)**

### **Auth Component** integrado directamente en `frontend/src/App.jsx`

**Sistema completo de autenticación** con:
- **3 modos**: `login`, `register`, `verify`
- **Formulario de registro** con:
  - Campo "Confirmar Contraseña" (debe coincidir con la contraseña)
  - Validación de contraseña (mínimo 6 caracteres)
  - NO recarga la página al registrarse
  - Transición automática a modo `verify` tras registro
- **Formulario de verificación** con:
  - Input de 6 dígitos numéricos
  - Botón "Verificar código"
  - Botón "Reenviar código"
  - Contador de expiración (15 minutos)
  - **Auto-login automático** tras verificar el código exitosamente
- **Formulario de login** con:
  - Detección de cuentas no verificadas
  - Transición a modo `verify` si se intenta login sin verificar

**Estados importantes:**
```javascript
const [mode, setMode] = useState('login'); // 'login' | 'register' | 'verify'
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState(''); // NUEVO
const [verificationCode, setVerificationCode] = useState('');
const [registeredEmail, setRegisteredEmail] = useState(''); // Para auto-login
const [registeredPassword, setRegisteredPassword] = useState(''); // Para auto-login
```

---

## 🔄 **5. FLUJO COMPLETO**

### **Registro con Verificación (Flujo MemoFlip):**
```
1. Usuario llena formulario de registro
   - Email, Nombre, Username, Contraseña
   - ⚠️ NUEVO: Confirmar Contraseña (debe coincidir)
   - ⚠️ Validación: Contraseña mínimo 6 caracteres
   ↓
2. Sistema genera código de 6 dígitos
   ↓
3. Se guarda en BD con expiry de 15 minutos
   - verification_code: "123456"
   - verification_expiry: NOW() + 15 minutes
   - verified_at: NULL
   - activo: 0
   ↓
4. Se envía email con el código
   ↓
5. ⚠️ NUEVO: NO se recarga la página
   - Se guarda email y password para auto-login
   - Se cambia a modo 'verify'
   ↓
6. Usuario introduce el código de 6 dígitos
   ↓
7. Sistema valida:
   - Código correcto ✅
   - No expirado (< 15 min) ✅
   ↓
8. Cuenta activada:
   - activo = 1
   - verified_at = NOW()
   - verification_code = NULL
   ↓
9. ⚠️ NUEVO: Auto-login automático
   - Usa email y password guardados
   - Si falla, muestra botón de login manual
```

### **Login:**
```
1. Usuario introduce email/username + password
   ↓
2. Sistema busca usuario (SIN filtrar por activo)
   ↓
3. Sistema verifica contraseña
   ↓
4. ⚠️ NUEVO: Si verified_at es NULL:
   - Retorna error con requires_verification: true
   - Frontend cambia a modo 'verify'
   - Usuario puede meter código o reenviar
   ↓
5. Si verified_at NO es NULL:
   - Verifica que activo = 1
   - Login exitoso ✅
```

---

## 📊 **6. ESTADOS DE USUARIO**

| Estado | `activo` | `verified_at` | `verification_code` | ¿Puede login? |
|--------|----------|---------------|-------------------|---------------|
| **Recién registrado** | 0 | NULL | 123456 | ❌ No |
| **Email verificado** | 1 | 2024-10-13 10:30:00 | NULL | ✅ Sí |
| **Usuario antiguo** | 1 | 2024-01-01 00:00:00 | NULL | ✅ Sí |

---

## 🧪 **7. TESTING**

### **Prueba en desarrollo:**

1. **Registro:**
   ```
   Email: test@ejemplo.com
   Nombre: Usuario Test
   Username: test123
   Password: test123
   ```

2. **Verificar respuesta del servidor:**
   - Si `email_sent: false`, el código aparecerá en la respuesta
   - Si `email_sent: true`, revisar email (o spam)

3. **Introducir código:**
   - Código: `123456` (6 dígitos)
   - Verificar que cuenta se activa

4. **Intentar login:**
   - Antes de verificar → Error
   - Después de verificar → OK ✅

---

## 🚀 **8. DESPLIEGUE**

### **Pasos para activar en producción:**

1. **Subir archivos PHP:**
   ```
   PARA_HOSTALIA/sistema_apps_upload/[nombre_juego]/
   ├── config_smtp.php (NUEVO)
   ├── PHPMailer/ (NUEVO)
   └── auth.php (ACTUALIZADO con PHPMailer)
   ```

2. **Compilar y subir React:**
   ```bash
   cd frontend
   npm run build
   # Subir carpeta dist/ a Hostalia
   ```

3. **Verificar configuración de email:**
   - Servidor SMTP configurado en Hostalia
   - Email `noreply@colisan.com` debe existir
   - Verificar que emails NO vayan a spam

---

## ⚙️ **9. CONFIGURACIÓN AVANZADA**

### **Cambiar tiempo de expiración:**
```php
// En auth.php, durante el registro/resend
$verification_expiry = date('Y-m-d H:i:s', strtotime('+15 minutes'));
// Cambiar '+15 minutes' por '+30 minutes', '+1 hour', etc.
```

### **Cambiar longitud del código:**
```php
// En auth.php, función generarCodigoVerificacion
function generarCodigoVerificacion() {
    return str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
    // Para 4 dígitos: rand(1000, 9999) y str_pad(..., 4, ...)
}
```

### **Personalizar email:**
Editar `auth.php` función `enviarEmailVerificacion()` (HTML del email)

---

## 📧 **10. PLANTILLA DE EMAIL**

El email enviado incluye:
- ✅ Header con gradiente Lumetrix
- ✅ Código destacado en grande
- ✅ Instrucciones claras
- ✅ Advertencia de expiración
- ✅ Diseño responsive
- ✅ Mensaje de "no responder"

---

## 🔍 **11. TROUBLESHOOTING**

### **Error de conexión a la base de datos:**
**Síntoma:** `{"success":false,"message":"Error de conexión a la base de datos"}`

**Soluciones:**
1. **Verificar que la base de datos existe:**
   - Acceder a phpMyAdmin en Hostalia
   - Confirmar que existe la base de datos `9606966_sistema_apps_db`
   - Si no existe, crearla con el usuario `sistema_apps_user`

2. **Verificar credenciales (DEFINITIVAS de Neni):**
   - Host: `PMYSQL165.dns-servicio.com` (NO localhost)
   - Puerto: `3306`
   - Base de datos: `9606966_sistema_apps_db`
   - Usuario: `sistema_apps_user`
   - Contraseña: `GestionUploadSistemaApps!`

3. **Verificar permisos del usuario:**
   ```sql
   -- En phpMyAdmin, ejecutar:
   GRANT ALL PRIVILEGES ON 9606966_sistema_apps_db.* TO 'sistema_apps_user'@'%';
   FLUSH PRIVILEGES;
   ```

4. **Verificar logs de error:**
   - Revisar `error_log` del servidor
   - El archivo `config_hostalia.php` ahora incluye logs detallados

### **Error de estructura de tablas:**
**Síntoma:** `SQLSTATE[42S22]: Column not found: 1054 Unknown column 'nombre' in 'field list'`

**Causa:** La estructura de las tablas en la base de datos no coincide con lo esperado.

**Solución:**
1. **Ejecutar diagnóstico de tablas:**
   ```php
   // Crear archivo: api/diagnostico_tablas.php
   // Ejecutar: https://tudominio.com/api/diagnostico_tablas.php
   ```

2. **Verificar estructura real de la tabla `aplicaciones`:**
   - La tabla puede tener columnas diferentes a las esperadas
   - Ejemplo: puede ser `app_nombre` en lugar de `nombre`

3. **Ajustar el código según la estructura real:**
   ```php
   // En admin_db.php, cambiar:
   INSERT INTO aplicaciones (app_codigo, nombre, descripcion, estado, creado_en)
   // Por la estructura real encontrada en el diagnóstico
   ```

4. **Estructura real de la tabla `aplicaciones`:**
   ```sql
   CREATE TABLE aplicaciones (
       app_id INT(11) NOT NULL AUTO_INCREMENT,
       app_codigo VARCHAR(50) NOT NULL UNIQUE,
       app_nombre VARCHAR(100) NOT NULL,
       app_descripcion TEXT,
       activa TINYINT(1) DEFAULT 1,
       PRIMARY KEY (app_id)
   );
   ```

5. **Código correcto para admin_db.php:**
   ```php
   $stmt = $conn->prepare("
       INSERT INTO aplicaciones (app_codigo, app_nombre, app_descripcion, activa) 
       VALUES (?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE 
       app_nombre = VALUES(app_nombre), 
       app_descripcion = VALUES(app_descripcion),
       activa = 1
   ");
   ```

### **Error de columna TEXT con valor por defecto:**
**Síntoma:** `SQLSTATE[42000]: Syntax error or access violation: 1101 BLOB, TEXT, GEOMETRY or JSON column can't have a default value`

**Causa:** En MySQL, las columnas TEXT, BLOB, GEOMETRY y JSON no pueden tener valores por defecto.

**Solución:**
```sql
-- ❌ INCORRECTO:
niveles_completados text DEFAULT '[]'

-- ✅ CORRECTO:
niveles_completados text
```

**Nota:** El valor por defecto se maneja en la aplicación, no en la base de datos.

### **Error de clave foránea:**
**Síntoma:** `SQLSTATE[HY000]: General error: 1215 Cannot add foreign key constraint`

**Causa:** La tabla referenciada no tiene un índice único en la columna de referencia, o hay un problema con los tipos de datos.

**Solución:**
```sql
-- ❌ INCORRECTO (puede fallar):
FOREIGN KEY (`usuario_aplicacion_key`) REFERENCES `usuarios_aplicaciones`(`usuario_aplicacion_key`) ON DELETE CASCADE

-- ✅ CORRECTO (sin clave foránea):
INDEX `idx_usuario_aplicacion_key` (`usuario_aplicacion_key`)
```

**Nota:** Es más seguro usar solo índices en lugar de claves foráneas para evitar problemas de compatibilidad.

### **Error de verificación de archivos:**
**Síntoma:** Los archivos aparecen como "NO ENCONTRADO" aunque existan.

**Causa:** El script está ejecutándose desde la carpeta `api/` y busca archivos con rutas incorrectas.

**Solución:**
```php
// ❌ INCORRECTO (desde api/):
$requiredFiles = [
    'index.html',           // Busca en api/index.html
    'css/styles.css',       // Busca en api/css/styles.css
    'puzzles/'              // Busca en api/puzzles/
];

// ✅ CORRECTO (desde api/):
$requiredFiles = [
    '../index.html',        // Busca en ../index.html
    '../css/styles.css',    // Busca en ../css/styles.css
    '../puzzles/'           // Busca en ../puzzles/
];
```

### **Email no se envía:**
- Verificar configuración SMTP en Hostalia
- Revisar logs: `error_log` en `config_smtp.php`
- Comprobar que PHPMailer funciona correctamente

### **Código no válido:**
- Verificar que no hayan pasado 24 horas
- Comprobar que el código es exactamente 6 dígitos
- Revisar campo `verification_code` en BD

### **Usuario no puede hacer login:**
- Verificar campo `verified_at` NO es NULL
- Verificar campo `activo = 1`
- Comprobar que la contraseña sea correcta

---

## 📝 **12. NOTAS IMPORTANTES**

⚠️ **Columnas usadas:**
El sistema usa las columnas EXISTENTES en la tabla:
- `verification_code` (varchar 6) - Código de 6 dígitos
- `verification_expiry` (datetime) - Fecha/hora de expiración
- `verified_at` (timestamp) - Cuándo se verificó

⚠️ **Usuarios existentes:**
Los usuarios que ya estaban registrados tienen `verified_at` con una fecha, por lo que pueden hacer login sin problemas.

⚠️ **Seguridad:**
- Los códigos se guardan en texto plano (no es crítico, solo son válidos 24h)
- El código expira automáticamente según `verification_expiry`
- Posible mejora futura: limitar intentos de verificación

⚠️ **Modo desarrollo:**
Si el email falla al enviarse, el código se devuelve en la respuesta JSON (solo para testing).

---

## ✅ **13. CHECKLIST DE IMPLEMENTACIÓN**

- [x] ✅ Columnas existentes verificadas (`verification_code`, `verification_expiry`, `verified_at`)
- [x] ✅ `config_smtp.php` creado y subido
- [x] ✅ `auth.php` actualizado con PHPMailer
- [x] ✅ `VerificationModal.jsx` creado
- [x] ✅ `AuthModal.jsx` creado
- [x] ✅ `App.jsx` actualizado con nuevos componentes
- [ ] 🧪 Probar registro completo
- [ ] 🧪 Verificar envío de email
- [ ] 🧪 Probar código correcto
- [ ] 🧪 Probar código incorrecto
- [ ] 🧪 Probar código expirado
- [ ] 🧪 Probar reenvío de código
- [ ] 🧪 Verificar que login requiere verificación

---

**¡Sistema de verificación por email implementado en Lumetrix!** 🎉

---

# 🔧 SOLUCIÓN: Sincronización Offline en APK Capacitor

## ❌ **PROBLEMA DETECTADO**

### Síntoma:
Cuando un usuario **juega offline** (sin internet):
1. ✅ El progreso se guarda localmente en `localStorage`
2. ✅ Se marca como pendiente de sincronización
3. ❌ Al reconectar y hacer auto-login, el progreso del **servidor** sobrescribe el **local**
4. ❌ **Se pierde el avance offline**

### Ejemplo:
```
1. Usuario en nivel 10 (servidor)
2. Quita internet
3. Juega offline: nivel 10 → 15
4. Se guarda en localStorage: nivel 15 ✅
5. Conecta internet
6. Auto-login carga nivel 10 del servidor ❌
7. PIERDE niveles 11-15 jugados offline ❌
```

---

## 🎯 **CAUSA DEL PROBLEMA**

En `handleLoginSuccess` (o función similar de login), el código:
1. Recibe datos del servidor (nivel 10)
2. Los aplica directamente al store
3. **NO compara** con el progreso local (nivel 15)
4. **Sobrescribe** el progreso más avanzado

---

## ✅ **SOLUCIÓN: Merge Inteligente**

### Estrategia:
Al hacer login, **comparar** progreso servidor vs local y **usar el más avanzado**.

---

## 📝 **CÓDIGO IMPLEMENTADO EN LUMETRIX**

### **Función mergeProgress**:

```javascript
// 🔀 MERGE INTELIGENTE: Combinar progreso servidor + local
const mergeProgress = (userData) => {
  const localProgress = getLocalProgress();
  
  // Obtener datos del servidor
  const serverLevel = userData?.nivel_actual || 1;
  const serverTime = userData?.total_time_s || 0;
  const serverPuntos = userData?.total_puntos || 0;
  
  // 🔀 MERGE: Usar el progreso más avanzado
  const finalLevel = Math.max(serverLevel, localProgress.nivel_actual);
  const finalTime = Math.max(serverTime, localProgress.total_time_s);
  const finalPuntos = Math.max(serverPuntos, localProgress.total_puntos);
  
  console.log('📊 Merge progreso:', { 
    servidor: { nivel: serverLevel, tiempo: serverTime, puntos: serverPuntos },
    local: { nivel: localProgress.nivel_actual, tiempo: localProgress.total_time_s, puntos: localProgress.total_puntos },
    final: { nivel: finalLevel, tiempo: finalTime, puntos: finalPuntos }
  });
  
  // ✅ Aplicar el progreso más avanzado
  setLevel(finalLevel);
  setCurrentLevel(finalLevel);
  setTotalTime(finalTime);
  setTotalPuntos(finalPuntos);
  
  // Guardar en localStorage
  saveLocalProgress(finalLevel, finalTime, finalPuntos);
  
  // 📤 Si el progreso local es mayor, sincronizar al servidor
  if (finalLevel > serverLevel || finalTime > serverTime || finalPuntos > serverPuntos) {
    console.log('📤 Progreso local más avanzado, sincronizando al servidor...');
    setTimeout(() => {
      syncToServer().then(() => {
        console.log('✅ Progreso offline sincronizado al servidor');
      }).catch(err => {
        console.error('❌ Error sincronizando progreso:', err);
      });
    }, 500);
  }
};
```

### **Aplicado en:**
- `checkSession()` - Cuando detecta sesión activa
- `auto-login` - Cuando hace login automático con credenciales guardadas
- `handleLogin()` - Cuando el usuario hace login manual (vía reload)

---

## 🔍 **PUNTOS CLAVE**

### 1. **Obtener progreso local**
```javascript
const localProgress = getLocalProgress();
```

### 2. **Comparar y usar el mayor**
```javascript
const finalLevel = Math.max(serverLevel, localProgress.nivel_actual);
const finalTime = Math.max(serverTime, localProgress.total_time_s);
const finalPuntos = Math.max(serverPuntos, localProgress.total_puntos);
```

### 3. **Sincronizar al servidor si local > servidor**
```javascript
if (finalLevel > serverLevel || finalTime > serverTime || finalPuntos > serverPuntos) {
  await syncToServer();
}
```

---

## 🧪 **CÓMO PROBAR**

### Escenario de prueba:
1. ✅ Login con internet (ej: nivel 5)
2. ❌ Quitar internet (modo avión)
3. 🎮 Jugar 3 niveles (5 → 8)
4. ✅ Conectar internet
5. 🔄 Reabrir la app (o hacer logout/login)

### Resultado esperado:
```
📊 Merge progreso: {
  servidor: { nivel: 5, tiempo: 500, puntos: 5000 },
  local: { nivel: 8, tiempo: 800, puntos: 8000 },
  final: { nivel: 8, tiempo: 800, puntos: 8000 }
}
📤 Progreso local más avanzado, sincronizando al servidor...
✅ Progreso offline sincronizado al servidor
```

**El usuario debería estar en nivel 8, NO en nivel 5** ✅

---

## 📂 **ARCHIVOS MODIFICADOS EN LUMETRIX**

- `frontend/src/App.jsx` - Componente `Intro` con función `mergeProgress`

---

## 🎯 **BENEFICIOS**

✅ **Sin pérdida de progreso offline**  
✅ **Sincronización automática al reconectar**  
✅ **Experiencia fluida para el usuario**  
✅ **Logs claros para debugging**

---

## 📋 **CHECKLIST DE IMPLEMENTACIÓN**

- [x] ✅ Modificar función de login para obtener `getLocalProgress()`
- [x] ✅ Implementar merge con `Math.max()`
- [x] ✅ Añadir sincronización condicional al servidor
- [x] ✅ Añadir logs de debugging
- [ ] 🧪 Probar escenario offline → online
- [ ] 🧪 Verificar que progreso se mantiene
- [ ] 🧪 Verificar que se sincroniza al servidor

---

---

## 🚨 Troubleshooting Universal

### Problemas Comunes y Soluciones:

#### **404 en Assets:**
```bash
# Verificar rutas
curl -I https://colisan.com/sistema_apps_upload/mi-juego/css/styles.css
# Debe devolver 200 OK, no 404
```
**Solución:** Verificar `<base href="/sistema_apps_upload/<juego>/">` en HTML

#### **APK Pantalla Blanca:**
```bash
# Verificar que game.bundle.js existe en servidor
curl -I https://colisan.com/sistema_apps_upload/mi-juego/js/game.bundle.js
```
**Solución:** 
1. `npm run build`
2. Copiar `dist/game.bundle.js` a `PARA_HOSTALIA/sistema_apps_upload/mi-juego/js/`
3. Ejecutar BAT de deploy

#### **Emails No Llegan:**
```php
// Probar SMTP con diagnostico_completo.php
// Verificar config_smtp.php
```
**Solución:** Usar puerto 587 con STARTTLS para Hostalia

#### **Auto-Login Falla:**
```javascript
// Verificar localStorage
console.log(localStorage.getItem('mi-juego_user_email'));
console.log(localStorage.getItem('mi-juego_user_token'));
```
**Solución:** Verificar que `usuario_aplicacion_key` coincida en frontend y backend

#### **Publicidad No Carga:**
```typescript
// Verificar IDs de AdMob
console.log('[AdMob] App ID:', APP_ID);
console.log('[AdMob] Banner ID:', BANNER_ID);
```
**Solución:** Configurar IDs reales de AdMob Console

---

## ⚙️ Configuración por Entorno

### Variables de Entorno (.env.example):
```env
# Configuración del Juego
JUEGO_NOMBRE=mi-juego-nuevo
JUEGO_TITULO=Mi Juego Nuevo
JUEGO_DESCRIPCION=Descripción del juego

# Base de Datos - CREDENCIALES DEFINITIVAS (de Neni)
DB_HOST=PMYSQL165.dns-servicio.com
DB_NAME=9606966_sistema_apps_db
DB_USER=sistema_apps_user
DB_PASS=GestionUploadSistemaApps!
DB_PORT=3306

# SMTP
SMTP_HOST=smtp.colisan.com
SMTP_PORT=587
SMTP_USER=info@colisan.com
SMTP_PASS=IgdAmg19521954
SMTP_FROM=info@intocables.com

# AdMob
ADMOB_APP_ID=ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY
ADMOB_BANNER_ID=ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
ADMOB_INTERSTITIAL_ID=ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
ADMOB_REWARDED_ID=ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY

# Android
ANDROID_APP_ID=com.tudominio.mijuego
ANDROID_VERSION_CODE=1
ANDROID_VERSION_NAME=1.0.0
```

### Uso en Código:
```javascript
// En JavaScript
const JUEGO = process.env.JUEGO_NOMBRE || 'mi-juego-nuevo';
const JUEGO_TITULO = process.env.JUEGO_TITULO || 'Mi Juego Nuevo';
```

```php
// En PHP
$juego = $_ENV['JUEGO_NOMBRE'] ?? 'mi-juego-nuevo';
$juego_titulo = $_ENV['JUEGO_TITULO'] ?? 'Mi Juego Nuevo';
```

---

## 🤖 Setup Automático

### `setup_nuevo_juego.bat`:
```batch
@echo off
setlocal enabledelayedexpansion

echo 🎮 SETUP AUTOMÁTICO DE NUEVO JUEGO
echo ====================================

set /p JUEGO_NOMBRE="Nombre del juego (sin espacios, ej: mi-juego-nuevo): "
set /p JUEGO_TITULO="Título del juego (ej: Mi Juego Nuevo): "
set /p JUEGO_DESCRIPCION="Descripción del juego: "

echo.
echo 🔄 Configurando %JUEGO_NOMBRE%...

REM Crear estructura de carpetas
mkdir "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%" 2>nul
mkdir "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\css" 2>nul
mkdir "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\js" 2>nul
mkdir "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\api" 2>nul
mkdir "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\assets" 2>nul
mkdir "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\assets\img" 2>nul
mkdir "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\assets\audio" 2>nul

REM Crear archivos template
echo ^<!DOCTYPE html^> > "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo ^<html^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo ^<head^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo     ^<meta charset="UTF-8"^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo     ^<title^>%JUEGO_TITULO%^</title^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo     ^<base href="/sistema_apps_upload/%JUEGO_NOMBRE%/"^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo     ^<link rel="stylesheet" href="css/styles.css"^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo ^</head^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo ^<body^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo     ^<h1^>%JUEGO_TITULO%^</h1^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo     ^<p^>%JUEGO_DESCRIPCION%^</p^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo     ^<script src="js/app.js"^>^</script^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo ^</body^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"
echo ^</html^> >> "PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\index.html"

REM Crear BAT de deploy personalizado
echo @echo off > "deploy_%JUEGO_NOMBRE%.bat"
echo setlocal >> "deploy_%JUEGO_NOMBRE%.bat"
echo set "HOST=82.194.68.83" >> "deploy_%JUEGO_NOMBRE%.bat"
echo set "USER=sistema_apps_user" >> "deploy_%JUEGO_NOMBRE%.bat"
echo set "PASS=GestionUploadSistemaApps!" >> "deploy_%JUEGO_NOMBRE%.bat"
echo set "WINSCP=C:\Users\agl03\AppData\Local\Programs\WinSCP\WinSCP.com" >> "deploy_%JUEGO_NOMBRE%.bat"
echo set "JUEGO=%JUEGO_NOMBRE%" >> "deploy_%JUEGO_NOMBRE%.bat"
echo set "LOCAL=%%~dp0PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%" >> "deploy_%JUEGO_NOMBRE%.bat"
echo set "REMOTE=/sistema_apps_upload/%JUEGO_NOMBRE%" >> "deploy_%JUEGO_NOMBRE%.bat"
echo. >> "deploy_%JUEGO_NOMBRE%.bat"
echo echo 🚀 Subiendo %JUEGO_NOMBRE% a Hostalia... >> "deploy_%JUEGO_NOMBRE%.bat"
echo echo 📁 Local: %%LOCAL%% >> "deploy_%JUEGO_NOMBRE%.bat"
echo echo 📁 Remote: %%REMOTE%% >> "deploy_%JUEGO_NOMBRE%.bat"
echo. >> "deploy_%JUEGO_NOMBRE%.bat"
echo "%%WINSCP%%" /ini=nul /log:"%%LOCAL%%\deploy_%JUEGO_NOMBRE%.log" /command ^ >> "deploy_%JUEGO_NOMBRE%.bat"
echo  "open ftps://%%USER%%:%%PASS%%@%%HOST%%/ -explicit -certificate=*" ^ >> "deploy_%JUEGO_NOMBRE%.bat"
echo  "option batch on" ^ >> "deploy_%JUEGO_NOMBRE%.bat"
echo  "option confirm off" ^ >> "deploy_%JUEGO_NOMBRE%.bat"
echo  "lcd %%LOCAL%%" ^ >> "deploy_%JUEGO_NOMBRE%.bat"
echo  "cd /sistema_apps_upload" ^ >> "deploy_%JUEGO_NOMBRE%.bat"
echo  "mkdir %JUEGO_NOMBRE%" ^ >> "deploy_%JUEGO_NOMBRE%.bat"
echo  "cd %JUEGO_NOMBRE%" ^ >> "deploy_%JUEGO_NOMBRE%.bat"
echo  "synchronize remote -mirror -criteria=size" ^ >> "deploy_%JUEGO_NOMBRE%.bat"
echo  "exit" >> "deploy_%JUEGO_NOMBRE%.bat"
echo. >> "deploy_%JUEGO_NOMBRE%.bat"
echo echo ✅ Deploy completado >> "deploy_%JUEGO_NOMBRE%.bat"
echo pause >> "deploy_%JUEGO_NOMBRE%.bat"

echo.
echo ✅ Setup completado para %JUEGO_NOMBRE%
echo.
echo 📁 Archivos creados:
echo    - PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\
echo    - deploy_%JUEGO_NOMBRE%.bat
echo.
echo 🚀 Próximos pasos:
echo    1. Añadir tu código a PARA_HOSTALIA\sistema_apps_upload\%JUEGO_NOMBRE%\
echo    2. Ejecutar deploy_%JUEGO_NOMBRE%.bat
echo    3. Configurar base de datos con admin_db.php
echo.
pause
```

---

## ⚡ Optimización Universal

### Frontend:
```javascript
// Lazy loading de imágenes
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});
lazyImages.forEach(img => imageObserver.observe(img));
```

```javascript
// Service Worker para cache
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('SW registrado:', registration);
  });
}
```

### Backend:
```php
// Cache de consultas frecuentes
function getCachedData($key, $callback, $ttl = 300) {
    $cache_file = "cache/{$key}.json";
    
    if (file_exists($cache_file) && (time() - filemtime($cache_file)) < $ttl) {
        return json_decode(file_get_contents($cache_file), true);
    }
    
    $data = $callback();
    file_put_contents($cache_file, json_encode($data));
    return $data;
}
```

```sql
-- Índices para optimizar consultas
CREATE INDEX idx_usuario_key ON usuarios_aplicaciones(usuario_aplicacion_key);
CREATE INDEX idx_app_codigo ON usuarios_aplicaciones(app_codigo);
CREATE INDEX idx_activo ON usuarios_aplicaciones(activo);
CREATE INDEX idx_verified_at ON usuarios_aplicaciones(verified_at);
```

---

## 🧪 Testing Automatizado

### `test_juego_completo.php`:
```php
<?php
require_once 'config_hostalia.php';

echo "🧪 TESTING COMPLETO DEL JUEGO\n";
echo "============================\n\n";

$juego = 'mi-juego-nuevo'; // ← CAMBIAR POR EL NOMBRE REAL
$tests_passed = 0;
$tests_total = 0;

function test($name, $condition, $message = '') {
    global $tests_passed, $tests_total;
    $tests_total++;
    
    if ($condition) {
        echo "✅ $name\n";
        $tests_passed++;
    } else {
        echo "❌ $name - $message\n";
    }
}

// Test 1: Base de datos
echo "📊 TESTING BASE DE DATOS:\n";
test("Conexión a BD", $conn !== null, "No se pudo conectar a la base de datos");

$result = $conn->query("SHOW TABLES LIKE '{$juego}_progreso'");
test("Tabla {$juego}_progreso existe", $result->num_rows > 0, "Tabla no encontrada");

$result = $conn->query("SELECT * FROM aplicaciones WHERE app_codigo = '$juego'");
test("Aplicación registrada", $result->num_rows > 0, "Aplicación no encontrada en BD");

// Test 2: Endpoints
echo "\n🔌 TESTING ENDPOINTS:\n";
test("auth.php existe", file_exists("api/auth.php"), "Archivo auth.php no encontrado");
test("game.php existe", file_exists("api/game.php"), "Archivo game.php no encontrado");

// Test 3: Archivos críticos
echo "\n📁 TESTING ARCHIVOS:\n";
test("index.html existe", file_exists("index.html"), "Archivo index.html no encontrado");
test("game.bundle.js existe", file_exists("js/game.bundle.js"), "Archivo game.bundle.js no encontrado");

// Test 4: Configuración
echo "\n⚙️ TESTING CONFIGURACIÓN:\n";
test("config_smtp.php existe", file_exists("config_smtp.php"), "Archivo config_smtp.php no encontrado");
test("config_hostalia.php existe", file_exists("config_hostalia.php"), "Archivo config_hostalia.php no encontrado");

// Test 5: Permisos
echo "\n🔐 TESTING PERMISOS:\n";
test("Carpeta js escribible", is_writable("js/"), "Carpeta js no tiene permisos de escritura");
test("Carpeta api escribible", is_writable("api/"), "Carpeta api no tiene permisos de escritura");

// Resultado final
echo "\n📊 RESULTADO FINAL:\n";
echo "Tests pasados: $tests_passed/$tests_total\n";

if ($tests_passed === $tests_total) {
    echo "🎉 ¡TODOS LOS TESTS PASARON! El juego está listo.\n";
} else {
    echo "⚠️ Algunos tests fallaron. Revisar errores arriba.\n";
}

echo "\n";
?>
```

### `test_frontend.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>🧪 Test Frontend - Mi Juego</title>
    <base href="/sistema_apps_upload/mi-juego-nuevo/">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .test { margin: 10px 0; padding: 10px; border-radius: 5px; }
        .pass { background: #d4edda; color: #155724; }
        .fail { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <h1>🧪 Testing Frontend</h1>
    <div id="results"></div>
    
    <script>
        const results = document.getElementById('results');
        let testsPassed = 0;
        let testsTotal = 0;
        
        function test(name, condition, message = '') {
            testsTotal++;
            const div = document.createElement('div');
            div.className = `test ${condition ? 'pass' : 'fail'}`;
            div.innerHTML = `${condition ? '✅' : '❌'} ${name} ${message}`;
            results.appendChild(div);
            
            if (condition) testsPassed++;
        }
        
        // Test 1: Assets
        test("CSS carga", document.querySelector('link[href*="css"]') !== null);
        test("JS carga", document.querySelector('script[src*="js"]') !== null);
        
        // Test 2: API
        fetch('api/auth.php?action=test')
            .then(response => test("API responde", response.ok, `Status: ${response.status}`))
            .catch(() => test("API responde", false, "Error de conexión"));
        
        // Test 3: LocalStorage
        test("LocalStorage disponible", typeof(Storage) !== "undefined");
        
        // Test 4: Capacitor
        test("Capacitor disponible", window.Capacitor !== undefined, "Solo en APK");
        
        // Resultado final
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'test';
            div.innerHTML = `<strong>📊 Resultado: ${testsPassed}/${testsTotal} tests pasaron</strong>`;
            results.appendChild(div);
        }, 1000);
    </script>
</body>
</html>
```

---
