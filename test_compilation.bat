@echo off
echo ========================================
echo    TESTING COMPILACION - FASE 4
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

REM Verificar archivos críticos
echo 🔍 Verificando archivos críticos...

if not exist "app\google-services.json" (
    echo ⚠️  Advertencia: google-services.json no encontrado
    echo    Usando template temporal para testing
) else (
    echo ✅ google-services.json encontrado
)

if not exist "app\src\main\assets\index.html" (
    echo ❌ Error: index.html no encontrado en assets
    pause
    exit /b 1
) else (
    echo ✅ index.html encontrado
)

if not exist "app\src\main\assets\js\app.js" (
    echo ❌ Error: app.js no encontrado en assets
    pause
    exit /b 1
) else (
    echo ✅ app.js encontrado
)

if not exist "app\src\main\assets\js\firebase-integration.js" (
    echo ❌ Error: firebase-integration.js no encontrado
    pause
    exit /b 1
) else (
    echo ✅ firebase-integration.js encontrado
)

echo.
echo 🔍 Verificando archivos Java...

if not exist "app\src\main\java\com\rinconesdelmundo\MainActivity.java" (
    echo ❌ Error: MainActivity.java no encontrado
    pause
    exit /b 1
) else (
    echo ✅ MainActivity.java encontrado
)

if not exist "app\src\main\java\com\rinconesdelmundo\GameBridge.java" (
    echo ❌ Error: GameBridge.java no encontrado
    pause
    exit /b 1
) else (
    echo ✅ GameBridge.java encontrado
)

if not exist "app\src\main\java\com\rinconesdelmundo\LoginActivity.java" (
    echo ❌ Error: LoginActivity.java no encontrado
    pause
    exit /b 1
) else (
    echo ✅ LoginActivity.java encontrado
)

if not exist "app\src\main\java\com\rinconesdelmundo\NickSetupActivity.java" (
    echo ❌ Error: NickSetupActivity.java no encontrado
    pause
    exit /b 1
) else (
    echo ✅ NickSetupActivity.java encontrado
)

if not exist "app\src\main\java\com\rinconesdelmundo\RankingActivity.java" (
    echo ❌ Error: RankingActivity.java no encontrado
    pause
    exit /b 1
) else (
    echo ✅ RankingActivity.java encontrado
)

echo.
echo 🔍 Verificando archivos de configuración...

if not exist "app\src\main\AndroidManifest.xml" (
    echo ❌ Error: AndroidManifest.xml no encontrado
    pause
    exit /b 1
) else (
    echo ✅ AndroidManifest.xml encontrado
)

if not exist "app\src\main\res\values\strings.xml" (
    echo ❌ Error: strings.xml no encontrado
    pause
    exit /b 1
) else (
    echo ✅ strings.xml encontrado
)

echo.
echo ========================================
echo    INICIANDO COMPILACION
echo ========================================
echo.

REM Limpiar compilaciones anteriores
echo 🧹 Limpiando compilaciones anteriores...
call gradlew.bat clean
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al limpiar proyecto
    pause
    exit /b 1
)
echo ✅ Limpieza completada

echo.
echo 🔨 Compilando proyecto...
call gradlew.bat assembleDebug
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al compilar proyecto
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

echo.
echo ========================================
echo    COMPILACION EXITOSA
echo ========================================
echo.
echo ✅ APK generado en: app\build\outputs\apk\debug\app-debug.apk
echo.

REM Verificar que el APK se generó
if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo ✅ APK encontrado y listo para instalar
    echo.
    
    REM Mostrar información del APK
    for %%I in ("app\build\outputs\apk\debug\app-debug.apk") do (
        echo 📱 Tamaño del APK: %%~zI bytes
    )
    
    echo.
    echo 🎯 PRÓXIMOS PASOS:
    echo    1. Instalar APK en dispositivo: gradlew installDebug
    echo    2. Configurar Firebase real (opcional)
    echo    3. Probar funcionalidades
    echo    4. Verificar logs en logcat
    echo.
    
    set /p install="¿Instalar en dispositivo conectado? (s/n): "
    if /i "%install%"=="s" (
        echo.
        echo 📱 Instalando en dispositivo...
        call gradlew.bat installDebug
        if %ERRORLEVEL% neq 0 (
            echo ❌ Error al instalar en dispositivo
            echo    Verificar que el dispositivo esté conectado y con USB debugging habilitado
        ) else (
            echo ✅ Instalación exitosa
            echo.
            echo 🎮 La app está lista para testing
        )
    )
) else (
    echo ❌ Error: APK no se generó correctamente
    pause
    exit /b 1
)

echo.
echo ========================================
echo    TESTING COMPLETADO
echo ========================================
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

