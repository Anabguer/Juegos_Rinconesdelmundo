# 🌍 Rincones del Mundo - Android Nativo

## 📱 Descripción
Aplicación Android nativa para el juego de puzzles "Rincones del Mundo". 
Implementa un sistema híbrido con WebView para el juego HTML5/JavaScript y funcionalidades nativas para mejor rendimiento.

## 🏗️ Arquitectura
- **WebView**: Juego HTML5/JavaScript (sin cambios)
- **Nativo**: AdMob, Audio, Almacenamiento, Sincronización
- **Híbrido**: Comunicación JavaScript ↔ Android

## 🚀 Características
- ✅ **Offline/Online**: Funciona sin internet, sincroniza cuando hay conexión
- ✅ **AdMob Nativo**: Banner e Interstitial ads
- ✅ **Audio Nativo**: MediaPlayer + SoundPool
- ✅ **Almacenamiento**: SQLite + SharedPreferences
- ✅ **Sincronización**: HTTP requests a Hostalia
- ✅ **150 Puzzles**: Todos los puzzles incluidos
- ✅ **10 Mundos**: Navegación libre (modo relax)

## 📁 Estructura del Proyecto
```
app/
├── src/main/
│   ├── java/com/rincones/mundo/
│   │   ├── MainActivity.java          # Pantalla principal
│   │   ├── GameActivity.java          # WebView del juego
│   │   ├── GameManager.java           # Gestión del juego
│   │   └── PuzzleActivity.java        # Actividad de puzzle
│   ├── res/
│   │   ├── layout/                    # Layouts XML
│   │   ├── values/                    # Strings, colors, themes
│   │   ├── drawable/                  # Recursos gráficos
│   │   └── raw/                       # Archivos de audio
│   └── assets/
│       ├── index.html                 # Juego HTML5
│       ├── css/                       # Estilos
│       ├── js/                        # JavaScript del juego
│       ├── data/                      # Configuración JSON
│       └── puzzles/                   # 150 imágenes de puzzles
```

## 🔧 Configuración

### Requisitos
- Android Studio 2023.1+
- JDK 8+
- Android SDK 21+ (API Level 21)
- Gradle 7.4+

### Instalación
1. Abrir proyecto en Android Studio
2. Sincronizar Gradle
3. Ejecutar `build_apk.bat` o usar Android Studio

### AdMob
- **App ID**: `ca-app-pub-3940256099942544~3347511713` (Test)
- **Banner**: `ca-app-pub-3940256099942544/6300978111` (Test)
- **Interstitial**: `ca-app-pub-3940256099942544/1033173712` (Test)

## 🎮 Funcionalidades

### Offline
- Juego completo sin internet
- Progreso guardado localmente
- Audio nativo
- Ads en caché

### Online
- Sincronización con Hostalia
- Autenticación
- Backup en la nube
- Ads en vivo

### Híbrido
- WebView para el juego
- Interfaz nativa para navegación
- Comunicación JavaScript ↔ Android

## 📱 Build y Deploy

### Generar APK
```bash
# Windows
build_apk.bat

# Linux/Mac
./gradlew assembleDebug
```

### Instalar en Dispositivo
```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

## 🔄 Sincronización

### Servidor (Hostalia)
- **URL**: `https://colisan.com/sistema_apps_upload/rincones_del_mundo/`
- **API**: `api/auth.php`, `api/game.php`
- **Base de datos**: MySQL con tablas del sistema

### Cliente (Android)
- **Local**: SQLite + SharedPreferences
- **Remoto**: HTTP requests con OkHttp
- **Merge**: Lógica inteligente de sincronización

## 🎯 Próximos Pasos

### Fase 2: Funcionalidades Avanzadas
- [ ] Sistema de autenticación completo
- [ ] Sincronización bidireccional
- [ ] Notificaciones push
- [ ] Analytics nativo

### Fase 3: Optimizaciones
- [ ] Caché de imágenes
- [ ] Compresión de assets
- [ ] Optimización de memoria
- [ ] Testing automatizado

## 📞 Soporte
- **Desarrollador**: AGL
- **Proyecto**: Rincones del Mundo
- **Versión**: 1.0.0
- **Fecha**: Octubre 2025

---

**¡Disfruta explorando los rincones del mundo! 🌍🧩**
