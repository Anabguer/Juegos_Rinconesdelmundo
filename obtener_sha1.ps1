# Script PowerShell para obtener SHA-1
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    OBTENER SHA-1 PARA FIREBASE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Buscar keystore de debug
$keystorePath = ""
$possiblePaths = @(
    "$env:USERPROFILE\.android\debug.keystore",
    "C:\Users\Usuario\.android\debug.keystore",
    "C:\Users\$env:USERNAME\.android\debug.keystore"
)

Write-Host "🔍 Buscando keystore de debug..." -ForegroundColor Yellow
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $keystorePath = $path
        Write-Host "✅ Keystore encontrado en: $path" -ForegroundColor Green
        break
    }
}

if (-not $keystorePath) {
    Write-Host "❌ Keystore no encontrado" -ForegroundColor Red
    Write-Host ""
    Write-Host "📋 INSTRUCCIONES MANUALES:" -ForegroundColor Yellow
    Write-Host "   1. Abrir Android Studio"
    Write-Host "   2. Abrir el proyecto android/"
    Write-Host "   3. Ir a Build → Generate Signed Bundle/APK"
    Write-Host "   4. Crear un keystore de debug"
    Write-Host "   5. Copiar el SHA-1 que aparece"
    Write-Host ""
    Read-Host "Presiona Enter para continuar"
    exit 1
}

Write-Host ""
Write-Host "🔑 Obteniendo SHA-1..." -ForegroundColor Yellow
Write-Host ""

# Intentar con keytool
try {
    $keytoolPath = "keytool"
    
    # Buscar keytool en JAVA_HOME
    if ($env:JAVA_HOME) {
        $javaKeytool = Join-Path $env:JAVA_HOME "bin\keytool.exe"
        if (Test-Path $javaKeytool) {
            $keytoolPath = $javaKeytool
        }
    }
    
    # Buscar keytool en Android SDK
    $androidSdkPath = "$env:LOCALAPPDATA\Android\Sdk"
    if (Test-Path $androidSdkPath) {
        $buildToolsPath = Join-Path $androidSdkPath "build-tools"
        if (Test-Path $buildToolsPath) {
            $latestBuildTools = Get-ChildItem $buildToolsPath | Sort-Object Name -Descending | Select-Object -First 1
            if ($latestBuildTools) {
                $sdkKeytool = Join-Path $latestBuildTools.FullName "keytool.exe"
                if (Test-Path $sdkKeytool) {
                    $keytoolPath = $sdkKeytool
                }
            }
        }
    }
    
    Write-Host "📱 Ejecutando keytool..." -ForegroundColor Yellow
    $result = & $keytoolPath -list -v -keystore $keystorePath -alias androiddebugkey -storepass android -keypass android 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ SHA-1 obtenido correctamente:" -ForegroundColor Green
        Write-Host ""
        Write-Host $result -ForegroundColor White
        Write-Host ""
        Write-Host "📋 Copia el SHA-1 que aparece arriba" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Error al ejecutar keytool" -ForegroundColor Red
        Write-Host $result -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error al ejecutar keytool: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    CONFIGURACIÓN FIREBASE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔥 PASOS PARA CONFIGURAR FIREBASE:" -ForegroundColor Yellow
Write-Host "   1. Ir a https://console.firebase.google.com/"
Write-Host "   2. Seleccionar proyecto 'Rincones del Mundo'"
Write-Host "   3. Ir a Project Settings → Your apps"
Write-Host "   4. Seleccionar la app Android"
Write-Host "   5. Añadir SHA-1 (copiado arriba)"
Write-Host "   6. Descargar google-services.json actualizado"
Write-Host ""
Write-Host "📱 CONFIGURACIÓN ACTUAL:" -ForegroundColor Yellow
Write-Host "   ✅ Package: com.intocables.rinconesdelmundo"
Write-Host "   ✅ Android Client ID: 989954746255-kehgfamu60qpf1jtvmb44ovegbf54tc3.apps.googleusercontent.com"
Write-Host "   ✅ google-services.json: Archivo real en ubicación correcta"
Write-Host "   ⚠️  SHA-1: Pendiente de obtener"
Write-Host ""

Read-Host "Presiona Enter para continuar"

