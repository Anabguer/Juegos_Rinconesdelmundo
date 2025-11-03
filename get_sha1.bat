@echo off
echo ========================================
echo    OBTENER SHA-1 PARA FIREBASE
echo ========================================
echo.

echo Buscando keystore de debug...
set KEYSTORE_PATH=%USERPROFILE%\.android\debug.keystore

if not exist "%KEYSTORE_PATH%" (
    echo ERROR: No se encontro el keystore de debug en:
    echo %KEYSTORE_PATH%
    echo.
    echo Posibles soluciones:
    echo 1. Ejecutar Android Studio al menos una vez
    echo 2. Compilar un proyecto Android
    echo 3. Crear keystore manualmente
    echo.
    pause
    exit /b 1
)

echo Keystore encontrado: %KEYSTORE_PATH%
echo.
echo Obteniendo SHA-1...
echo.

keytool -list -v -keystore "%KEYSTORE_PATH%" -alias androiddebugkey -storepass android -keypass android

echo.
echo ========================================
echo    INSTRUCCIONES
echo ========================================
echo.
echo 1. Copia el SHA1 que aparece arriba
echo 2. Ve a Firebase Console: https://console.firebase.google.com/
echo 3. Crea un nuevo proyecto: "Rincones del Mundo"
echo 4. Añade app Android con package: com.intocables.rinconesdelmundo
echo 5. Pega el SHA1 en la configuracion
echo 6. Descarga el google-services.json real
echo 7. Reemplaza android/app/google-services.json
echo.
echo ========================================
pause