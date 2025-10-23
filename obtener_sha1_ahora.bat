@echo off
echo ========================================
echo    OBTENER SHA-1 AHORA
echo ========================================
echo.

echo 🔍 Buscando keystore de debug...
echo.

REM Buscar keystore en ubicaciones comunes
set KEYSTORE_PATH=""
if exist "%USERPROFILE%\.android\debug.keystore" (
    set KEYSTORE_PATH="%USERPROFILE%\.android\debug.keystore"
    echo ✅ Keystore encontrado en: %KEYSTORE_PATH%
) else (
    echo ❌ Keystore no encontrado en ubicación estándar
    echo.
    echo 🔍 Buscando en otras ubicaciones...
    
    REM Buscar en C:\Users\Usuario\.android\
    if exist "C:\Users\Usuario\.android\debug.keystore" (
        set KEYSTORE_PATH="C:\Users\Usuario\.android\debug.keystore"
        echo ✅ Keystore encontrado en: %KEYSTORE_PATH%
    ) else (
        echo ❌ Keystore no encontrado
        echo.
        echo 📋 INSTRUCCIONES MANUALES:
        echo    1. Abrir Android Studio
        echo    2. Abrir el proyecto android/
        echo    3. Ir a Build → Generate Signed Bundle/APK
        echo    4. Crear un keystore de debug
        echo    5. Copiar el SHA-1 que aparece
        echo.
        pause
        exit /b 1
    )
)

echo.
echo 🔑 Obteniendo SHA-1...
echo.

REM Intentar con keytool
echo 📱 Ejecutando keytool...
keytool -list -v -keystore %KEYSTORE_PATH% -alias androiddebugkey -storepass android -keypass android

if %ERRORLEVEL% neq 0 (
    echo ❌ Error al ejecutar keytool
    echo.
    echo 🔍 Intentando con gradlew...
    echo.
    
    REM Intentar con gradlew
    if exist "gradlew.bat" (
        call gradlew.bat signingReport
        if %ERRORLEVEL% neq 0 (
            echo ❌ Error al ejecutar gradlew
            echo.
            echo 📋 INSTRUCCIONES MANUALES:
            echo    1. Abrir Android Studio
            echo    2. Abrir el proyecto android/
            echo    3. Ir a Build → Generate Signed Bundle/APK
            echo    4. Crear un keystore de debug
            echo    5. Copiar el SHA-1 que aparece
            echo.
        ) else (
            echo ✅ SHA-1 obtenido con gradlew
        )
    ) else (
        echo ❌ gradlew.bat no encontrado
        echo.
        echo 📋 INSTRUCCIONES MANUALES:
        echo    1. Abrir Android Studio
        echo    2. Abrir el proyecto android/
        echo    3. Ir a Build → Generate Signed Bundle/APK
        echo    4. Crear un keystore de debug
        echo    5. Copiar el SHA-1 que aparece
        echo.
    )
) else (
    echo ✅ SHA-1 obtenido con keytool
)

echo.
echo ========================================
echo    SHA-1 OBTENIDO
echo ========================================
echo.
echo 📋 Copia el SHA-1 que aparece arriba
echo.
echo 🔥 CONFIGURACIÓN FIREBASE:
echo    1. Ir a https://console.firebase.google.com/
echo    2. Seleccionar proyecto "Rincones del Mundo"
echo    3. Ir a Project Settings → Your apps
echo    4. Seleccionar la app Android
echo    5. Añadir SHA-1 (copiado arriba)
echo    6. Descargar google-services.json actualizado
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

