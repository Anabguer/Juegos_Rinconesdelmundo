# 🔧 CONFIGURACIÓN ANDROID NATIVO - RINCONES DEL MUNDO

## 📋 **REQUISITOS PREVIOS**

### **1. Java Development Kit (JDK)**
- **Versión**: JDK 8 o superior
- **Descarga**: https://adoptium.net/
- **Configuración**: `JAVA_HOME` en variables de entorno

### **2. Android SDK**
- **Ubicación**: `%USERPROFILE%\AppData\Local\Android\Sdk`
- **Configuración**: `ANDROID_HOME` en variables de entorno
- **PATH**: Añadir `%ANDROID_HOME%\tools` y `%ANDROID_HOME%\platform-tools`

### **3. Android Studio (Opcional)**
- **Descarga**: https://developer.android.com/studio
- **Nota**: No es necesario para generar APK

---

## 🚀 **CONFIGURACIÓN AUTOMÁTICA**

### **Paso 1: Ejecutar Setup**
```bash
setup_project.bat
```

### **Paso 2: Generar APK**
```bash
build_apk.bat
```

### **Paso 3: Instalar en Dispositivo**
```bash
install_apk.bat
```

---

## 🔧 **CONFIGURACIÓN MANUAL**

### **1. Variables de Entorno**
```bash
# Java
JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-8.0.392.8-hotspot

# Android SDK
ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\Sdk

# PATH
PATH=%PATH%;%JAVA_HOME%\bin;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
```

### **2. Archivo local.properties**
```properties
sdk.dir=C\:\\Users\\%USERNAME%\\AppData\\Local\\Android\\Sdk
```

### **3. Verificar Configuración**
```bash
# Java
java -version

# Android SDK
adb version

# Gradle
gradlew --version
```

---

## 📱 **GENERACIÓN DE APK**

### **Comando Directo**
```bash
gradlew assembleDebug
```

### **Ubicación del APK**
```
app\build\outputs\apk\debug\app-debug.apk
```

### **Instalación Manual**
```bash
adb install app\build\outputs\apk\debug\app-debug.apk
```

---

## 🎮 **FUNCIONALIDADES IMPLEMENTADAS**

### **✅ Sistema Híbrido**
- **WebView**: Juego HTML5/JavaScript
- **Nativo**: AdMob, Audio, Almacenamiento
- **Comunicación**: JavaScript ↔ Android

### **✅ Offline/Online**
- **Offline**: Juego completo sin internet
- **Online**: Sincronización con Hostalia
- **Híbrido**: Transición transparente

### **✅ AdMob Nativo**
- **Banner**: Parte inferior de la pantalla
- **Interstitial**: Entre niveles
- **Test IDs**: Configurados para testing

### **✅ Audio Nativo**
- **MediaPlayer**: Música de fondo
- **SoundPool**: Efectos de sonido
- **Control**: Play/Pause/Stop

### **✅ Almacenamiento**
- **SharedPreferences**: Configuración
- **SQLite**: Progreso del juego
- **Sincronización**: HTTP con Hostalia

---

## 🔄 **SINCRONIZACIÓN CON HOSTALIA**

### **URLs de API**
- **Base**: `https://colisan.com/sistema_apps_upload/rincones_del_mundo/api/`
- **Auth**: `auth.php`
- **Game**: `game.php`

### **Acciones Soportadas**
- **save_progress**: Guardar progreso
- **load_progress**: Cargar progreso
- **check_session**: Verificar sesión

### **Formato de Datos**
```json
{
  "action": "save_progress",
  "progress": "{\"completedLevels\":[1,2,3],\"currentWorld\":1}"
}
```

---

## 🐛 **TROUBLESHOOTING**

### **Error: "SDK location not found"**
```bash
# Crear local.properties
echo sdk.dir=%ANDROID_HOME% > local.properties
```

### **Error: "Java version not supported"**
```bash
# Verificar JAVA_HOME
echo %JAVA_HOME%
java -version
```

### **Error: "ADB not found"**
```bash
# Añadir al PATH
set PATH=%PATH%;%ANDROID_HOME%\platform-tools
```

### **Error: "Device not found"**
```bash
# Verificar dispositivo
adb devices
# Habilitar depuración USB en el dispositivo
```

---

## 📊 **ESTRUCTURA DEL PROYECTO**

```
android_nativo/
├── app/
│   ├── src/main/
│   │   ├── java/com/rincones/mundo/
│   │   │   ├── MainActivity.java
│   │   │   ├── GameActivity.java
│   │   │   ├── GameManager.java
│   │   │   ├── PuzzleActivity.java
│   │   │   └── SyncManager.java
│   │   ├── res/
│   │   │   ├── layout/
│   │   │   ├── values/
│   │   │   ├── drawable/
│   │   │   └── raw/
│   │   └── assets/
│   │       ├── index.html
│   │       ├── css/
│   │       ├── js/
│   │       ├── data/
│   │       └── puzzles/
│   └── build.gradle
├── build.gradle
├── settings.gradle
├── gradle.properties
├── setup_project.bat
├── build_apk.bat
└── install_apk.bat
```

---

## 🎯 **PRÓXIMOS PASOS**

### **Fase 2: Funcionalidades Avanzadas**
- [ ] Autenticación completa
- [ ] Notificaciones push
- [ ] Analytics nativo
- [ ] Caché de imágenes

### **Fase 3: Optimizaciones**
- [ ] Compresión de assets
- [ ] Optimización de memoria
- [ ] Testing automatizado
- [ ] CI/CD pipeline

---

**¡El proyecto está listo para generar APK! 🚀**
