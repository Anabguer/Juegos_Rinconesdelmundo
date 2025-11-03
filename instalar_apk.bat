@echo off
echo ========================================
echo    INSTALAR APK - RINCONES DEL MUNDO
echo ========================================
echo.

REM Verificar que estamos en el directorio correcto
if not exist "app\build.gradle" (
    echo ❌ Error: No se encuentra app\build.gradle
    echo Asegurate de ejecutar este script desde la carpeta android\
    pause
    exit /b 1
)

echo ✅ Directorio correcto encontrado
echo.

echo 🔍 Verificando dispositivo conectado...
adb devices
echo.

echo 🔨 Compilando APK...
call gradlew.bat assembleDebug
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al compilar APK
    echo.
    echo 🔍 Posibles soluciones:
    echo    1. Verificar que Android SDK esté instalado
    echo    2. Verificar que JAVA_HOME esté configurado
    echo    3. Verificar que local.properties tenga la ruta correcta
    echo    4. Verificar que google-services.json esté presente
    echo.
    pause
    exit /b 1
)

echo ✅ APK compilado correctamente
echo.

echo 📱 Instalando APK en dispositivo...
call gradlew.bat installDebug
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al instalar APK
    echo.
    echo 🔍 Posibles soluciones:
    echo    1. Verificar que el dispositivo esté conectado
    echo    2. Verificar que USB debugging esté habilitado
    echo    3. Verificar que se haya aceptado la autorización
    echo    4. Verificar que el dispositivo esté desbloqueado
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
echo 🎯 PRÓXIMOS PASOS:
echo    1. Abrir la app en el dispositivo
echo    2. Probar login con Google
echo    3. Configurar nick único
echo    4. Completar algunos puzzles
echo    5. Ver ranking con tu posición
echo    6. Verificar anuncios AdMob
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

