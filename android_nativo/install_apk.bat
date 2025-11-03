@echo off
echo ========================================
echo INSTALANDO APK EN DISPOSITIVO ANDROID
echo ========================================
echo.

REM Verificar que ADB esté disponible
adb version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: ADB no encontrado. Asegúrate de tener Android SDK instalado.
    echo Añade %ANDROID_HOME%\platform-tools al PATH
    pause
    exit /b 1
)

REM Verificar dispositivos conectados
echo Verificando dispositivos conectados...
adb devices

echo.
echo Instalando APK...
adb install -r app\build\outputs\apk\debug\app-debug.apk

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ¡APK INSTALADA CORRECTAMENTE!
    echo ========================================
    echo.
    echo La aplicación "Rincones del Mundo" se ha instalado en tu dispositivo.
    echo Puedes encontrarla en el menú de aplicaciones.
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR AL INSTALAR APK
    echo ========================================
    echo.
    echo Posibles soluciones:
    echo 1. Asegúrate de que el dispositivo esté conectado
    echo 2. Habilita "Depuración USB" en el dispositivo
    echo 3. Acepta la autorización de depuración en el dispositivo
    echo 4. Desinstala la aplicación anterior si existe
    echo.
)

pause