@echo off
echo ========================================
echo    GENERAR SHA-1 AUTOMÁTICAMENTE
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

echo 🔍 Generando SHA-1 para Firebase...
echo.

REM Intentar con gradlew
if exist "gradlew.bat" (
    echo 📱 Ejecutando gradlew signingReport...
    call gradlew.bat signingReport
    if %ERRORLEVEL% neq 0 (
        echo ❌ Error al ejecutar gradlew signingReport
        echo.
        echo 🔍 Intentando con keytool directamente...
        echo.
        
        REM Intentar con keytool en diferentes ubicaciones
        set KEYTOOL_FOUND=0
        
        REM Buscar keytool en JAVA_HOME
        if defined JAVA_HOME (
            echo 🔍 Buscando keytool en JAVA_HOME...
            "%JAVA_HOME%\bin\keytool" -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android 2>nul
            if %ERRORLEVEL% equ 0 (
                set KEYTOOL_FOUND=1
            )
        )
        
        REM Buscar keytool en PATH
        if %KEYTOOL_FOUND% equ 0 (
            echo 🔍 Buscando keytool en PATH...
            keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android 2>nul
            if %ERRORLEVEL% equ 0 (
                set KEYTOOL_FOUND=1
            )
        )
        
        REM Buscar keytool en Android SDK
        if %KEYTOOL_FOUND% equ 0 (
            echo 🔍 Buscando keytool en Android SDK...
            if exist "%LOCALAPPDATA%\Android\Sdk\build-tools" (
                for /d %%i in ("%LOCALAPPDATA%\Android\Sdk\build-tools\*") do (
                    "%%i\keytool" -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android 2>nul
                    if %ERRORLEVEL% equ 0 (
                        set KEYTOOL_FOUND=1
                        goto :found
                    )
                )
            )
        )
        
        :found
        if %KEYTOOL_FOUND% equ 0 (
            echo ❌ No se pudo encontrar keytool
            echo.
            echo 📋 INSTRUCCIONES MANUALES:
            echo    1. Abrir Android Studio
            echo    2. Abrir el proyecto android/
            echo    3. Ir a Build → Generate Signed Bundle/APK
            echo    4. Crear un keystore de debug
            echo    5. Copiar el SHA-1 que aparece
            echo.
            echo 📋 O usar keytool manualmente:
            echo    keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
            echo.
        ) else (
            echo ✅ SHA-1 obtenido correctamente
            echo.
            echo 📋 PRÓXIMOS PASOS:
            echo    1. Copiar el SHA-1 que aparece arriba
            echo    2. Ir a Firebase Console
            echo    3. Añadir el SHA-1 a la app Android
            echo    4. Descargar google-services.json actualizado
            echo    5. Reemplazar el archivo en app/
            echo.
        )
    ) else (
        echo ✅ SHA-1 obtenido correctamente
        echo.
        echo 📋 PRÓXIMOS PASOS:
        echo    1. Copiar el SHA-1 que aparece arriba
        echo    2. Ir a Firebase Console
        echo    3. Añadir el SHA-1 a la app Android
        echo    4. Descargar google-services.json actualizado
        echo    5. Reemplazar el archivo en app/
        echo.
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
    echo 📋 O usar keytool manualmente:
    echo    keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
    echo.
)

echo.
echo ========================================
echo    SHA-1 GENERADOS
echo ========================================
echo.
echo 📋 SHA-1 para Firebase Console:
echo    (Copiar el SHA-1 que aparece arriba)
echo.
echo 🔥 CONFIGURACIÓN FIREBASE:
echo    1. Ir a https://console.firebase.google.com/
echo    2. Seleccionar proyecto "Rincones del Mundo"
echo    3. Ir a Project Settings → Your apps
echo    4. Seleccionar la app Android
echo    5. Añadir SHA-1 (obtenido arriba)
echo    6. Descargar google-services.json actualizado
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

