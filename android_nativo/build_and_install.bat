@echo off
echo ============================================
echo COMPILAR + INSTALAR (debug) - ANDROID NATIVO
echo ============================================
echo.

REM Directorio del repo (asumiendo que este script vive en android_nativo)
set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..

REM Configurar ANDROID_HOME si no está
if not defined ANDROID_HOME (
    set ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\Sdk
)

REM Añadir platform-tools al PATH para adb
set PATH=%PATH%;%ANDROID_HOME%\platform-tools

echo [1/3] Verificando ADB...
adb version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: ADB no encontrado. Instala Android SDK o ajusta ANDROID_HOME.
    exit /b 1
)

echo [2/3] Compilando APK (assembleDebug)...
pushd %SCRIPT_DIR%
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo ❌ Error compilando el proyecto.
    popd
    exit /b 1
)
popd

set APK_PATH=%SCRIPT_DIR%app\build\outputs\apk\debug\app-debug.apk
if not exist "%APK_PATH%" (
    echo ERROR: No se encontró la APK en: %APK_PATH%
    exit /b 1
)

echo [3/3] Instalando APK en el dispositivo...
adb install -r "%APK_PATH%"
if %errorlevel% neq 0 (
    echo ❌ Error instalando la APK. Verifica que el dispositivo está conectado (adb devices).
    exit /b 1
)

echo ✅ Instalación completada correctamente (sin iniciar la app).
exit /b 0


