@echo off
echo 🚀 GENERANDO APK - RINCONES DEL MUNDO
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

echo.
echo 📋 INFORMACIÓN DEL APK:
for %%I in (app\build\outputs\apk\debug\app-debug.apk) do (
    echo Tamaño: %%~zI bytes
    echo Fecha: %%~tI
)

echo.
echo 🎮 ¡Listo para instalar en tu dispositivo!
pause
