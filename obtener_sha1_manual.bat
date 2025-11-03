@echo off
echo ========================================
echo    OBTENER SHA-1 MANUALMENTE
echo ========================================
echo.

echo 🔍 SHA-1 para Firebase Console
echo.

echo 📋 INSTRUCCIONES PASO A PASO:
echo.
echo 1. 📱 ABRIR ANDROID STUDIO:
echo    - Abrir Android Studio
echo    - Abrir el proyecto android/
echo.
echo 2. 🔑 GENERAR SHA-1:
echo    - Ir a Build → Generate Signed Bundle/APK
echo    - Seleccionar "APK"
echo    - Crear un keystore de debug
echo    - Copiar el SHA-1 que aparece
echo.
echo 3. 🔥 CONFIGURAR FIREBASE:
echo    - Ir a https://console.firebase.google.com/
echo    - Seleccionar proyecto "Rincones del Mundo"
echo    - Ir a Project Settings → Your apps
echo    - Seleccionar la app Android
echo    - Añadir SHA-1 (obtenido en paso 2)
echo    - Descargar google-services.json actualizado
echo.
echo 4. 📱 ACTUALIZAR APP:
echo    - Reemplazar android/app/google-services.json
echo    - Compilar proyecto
echo.
echo ========================================
echo    SHA-1 TÍPICOS PARA DEBUG
echo ========================================
echo.
echo 📋 SHA-1 típicos para keystore de debug:
echo    (Estos son ejemplos, necesitas obtener el tuyo específico)
echo.
echo 🔑 SHA-1 Debug (típico):
echo    XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
echo.
echo 🔑 SHA-256 Debug (típico):
echo    XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
echo.
echo ⚠️  IMPORTANTE: Estos son ejemplos. Necesitas obtener tus SHA-1 específicos.
echo.
echo ========================================
echo    COMANDO ALTERNATIVO
echo ========================================
echo.
echo 📋 Si tienes keytool disponible, usa:
echo    keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
echo.
echo 📋 Si tienes Android SDK, usa:
echo    gradlew signingReport
echo.
echo ========================================
echo    CONFIGURACIÓN ACTUAL
echo ========================================
echo.
echo ✅ Package: com.intocables.rinconesdelmundo
echo ✅ Android Client ID: 989954746255-kehgfamu60qpf1jtvmb44ovegbf54tc3.apps.googleusercontent.com
echo ✅ google-services.json: Movido a android/app/
echo ⚠️  SHA-1: Pendiente de obtener
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

