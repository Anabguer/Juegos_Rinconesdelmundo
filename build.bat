@echo off
echo Compilando Rincones del Mundo...
echo.

REM Verificar que estamos en el directorio correcto
if not exist "app\build.gradle" (
    echo Error: No se encuentra app\build.gradle
    echo Asegurate de ejecutar este script desde la carpeta android\
    pause
    exit /b 1
)

REM Limpiar compilaciones anteriores
echo Limpiando compilaciones anteriores...
call gradlew.bat clean
if %ERRORLEVEL% neq 0 (
    echo Error al limpiar proyecto
    pause
    exit /b 1
)

REM Compilar proyecto
echo Compilando proyecto...
call gradlew.bat assembleDebug
if %ERRORLEVEL% neq 0 (
    echo Error al compilar proyecto
    pause
    exit /b 1
)

echo.
echo ✅ Compilación exitosa!
echo APK generado en: app\build\outputs\apk\debug\app-debug.apk
echo.

REM Preguntar si instalar en dispositivo
set /p install="¿Instalar en dispositivo conectado? (s/n): "
if /i "%install%"=="s" (
    echo Instalando en dispositivo...
    call gradlew.bat installDebug
    if %ERRORLEVEL% neq 0 (
        echo Error al instalar en dispositivo
        pause
        exit /b 1
    )
    echo ✅ Instalación exitosa!
)

echo.
echo Presiona cualquier tecla para continuar...
pause >nul

