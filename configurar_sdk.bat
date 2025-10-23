@echo off
echo ========================================
echo    CONFIGURAR ANDROID SDK
echo ========================================
echo.

echo 🔍 Buscando Android SDK...
echo.

REM Buscar en ubicaciones comunes
set SDK_PATH=""

REM Ubicación estándar
if exist "%LOCALAPPDATA%\Android\Sdk" (
    set SDK_PATH="%LOCALAPPDATA%\Android\Sdk"
    echo ✅ SDK encontrado en: %SDK_PATH%
    goto :found
)

REM Ubicación alternativa
if exist "C:\Users\%USERNAME%\AppData\Local\Android\Sdk" (
    set SDK_PATH="C:\Users\%USERNAME%\AppData\Local\Android\Sdk"
    echo ✅ SDK encontrado en: %SDK_PATH%
    goto :found
)

REM Buscar en Program Files
if exist "C:\Program Files\Android\Android Studio\sdk" (
    set SDK_PATH="C:\Program Files\Android\Android Studio\sdk"
    echo ✅ SDK encontrado en: %SDK_PATH%
    goto :found
)

REM Buscar en Program Files (x86)
if exist "C:\Program Files (x86)\Android\Android Studio\sdk" (
    set SDK_PATH="C:\Program Files (x86)\Android\Android Studio\sdk"
    echo ✅ SDK encontrado en: %SDK_PATH%
    goto :found
)

echo ❌ Android SDK no encontrado
echo.
echo 📋 INSTRUCCIONES:
echo    1. Instalar Android Studio
echo    2. O instalar Android SDK Command Line Tools
echo    3. O especificar la ruta manualmente
echo.
echo 📝 Para especificar manualmente:
echo    echo sdk.dir=C:\ruta\a\tu\Android\Sdk > local.properties
echo.
pause
exit /b 1

:found
echo.
echo 🔧 Configurando local.properties...
echo sdk.dir=%SDK_PATH% > local.properties
echo ✅ local.properties configurado
echo.

echo 🔨 Compilando APK...
gradlew.bat assembleDebug
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al compilar APK
    echo.
    echo 🔍 Posibles soluciones:
    echo    1. Verificar que Android SDK esté completo
    echo    2. Instalar Android SDK Build-Tools
    echo    3. Verificar que JAVA_HOME esté configurado
    echo.
    pause
    exit /b 1
)

echo ✅ APK compilado correctamente
echo.

echo 📱 Instalando APK en dispositivo...
gradlew.bat installDebug
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al instalar APK
    echo.
    echo 🔍 Posibles soluciones:
    echo    1. Verificar que el dispositivo esté conectado
    echo    2. Verificar que USB debugging esté habilitado
    echo    3. Verificar que se haya aceptado la autorización
    echo.
    pause
    exit /b 1
)

echo ✅ APK instalado correctamente
echo.

echo ========================================
echo    INSTALACIÓN COMPLETADA
echo ========================================
echo.
echo 🎉 RINCONES DEL MUNDO INSTALADO
echo.
echo 📱 FUNCIONALIDADES DISPONIBLES:
echo    🔐 Login con Google
echo    🏷️  Configuración de nick único
echo    🏆 Ranking completo con posición del usuario
echo    📱 Banner AdMob siempre visible
echo    🎬 Anuncio intersticial cada 5 puzzles
echo    🎁 Anuncios bonificados para botones
echo    🔄 Sincronización automática de puzzles
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

