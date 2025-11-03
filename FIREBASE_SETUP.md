# 🔥 CONFIGURACIÓN FIREBASE - Rincones del Mundo

## 📋 **PASOS PARA CONFIGURAR FIREBASE**

### **1. Crear proyecto en Firebase Console:**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "Rincones del Mundo"
3. Habilita Google Analytics (opcional)

### **2. Añadir aplicación Android:**
1. En el proyecto Firebase, haz clic en "Añadir app" → Android
2. **Package name:** `com.rinconesdelmundo`
3. **App nickname:** Rincones del Mundo
4. **SHA-1:** Ejecuta `./gradlew signingReport` para obtenerlo

### **3. Descargar google-services.json:**
1. Descarga el archivo `google-services.json`
2. Colócalo en `android/app/google-services.json`

### **4. Configurar Authentication:**
1. Ve a Authentication → Sign-in method
2. Habilita "Google" como proveedor
3. Configura el email de soporte del proyecto

### **5. Configurar Firestore:**
1. Ve a Firestore Database
2. Crea base de datos en modo de prueba
3. Configura las reglas de seguridad (ver abajo)

### **6. Obtener Web Client ID:**
1. Ve a Authentication → Sign-in method → Google
2. Copia el "Web client ID"
3. Actualiza `android/app/src/main/res/values/strings.xml`

---

## 🛡️ **REGLAS DE SEGURIDAD FIRESTORE**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Estructura: apps/{appId}/users/{uid}
    match /apps/rinconesdelmundo/users/{uid} {
      allow read: if true; // Ranking público
      allow write: if request.auth != null && 
                      request.auth.uid == uid &&
                      // Validar que puzzlesCompletados solo aumente
                      (resource == null || 
                       request.resource.data.puzzlesCompletados >= resource.data.puzzlesCompletados);
    }

    // Estructura: apps/{appId}/nicks/{lowerNick}
    match /apps/rinconesdelmundo/nicks/{lowerNick} {
      allow read: if true; // Verificar disponibilidad de nick
      allow create: if request.auth != null &&
                       request.auth.uid == resource.data.uid &&
                       !exists(/databases/$(database)/documents/apps/rinconesdelmundo/nicks/$(lowerNick));
      allow update: if false; // Nicks no se pueden modificar
      allow delete: if false; // Nicks no se pueden eliminar
    }
  }
}
```

---

## 📱 **CONFIGURACIÓN ANDROID**

### **1. Actualizar strings.xml:**
```xml
<string name="default_web_client_id">TU_WEB_CLIENT_ID_AQUI</string>
```

### **2. Verificar build.gradle:**
- ✅ Firebase BOM 32.7.0
- ✅ Firebase Firestore
- ✅ Firebase Auth
- ✅ Google Sign-In 20.7.0

### **3. Verificar AndroidManifest.xml:**
- ✅ Permisos de Internet
- ✅ Activities configuradas

---

## 🧪 **TESTING INICIAL**

### **1. Compilar proyecto:**
```bash
cd android
./gradlew assembleDebug
```

### **2. Instalar en dispositivo:**
```bash
./gradlew installDebug
```

### **3. Verificar:**
- ✅ App se abre correctamente
- ✅ WebView carga el juego
- ✅ No hay errores en logcat

---

## 🚨 **PROBLEMAS COMUNES**

### **Error: "Google Sign-In failed"**
- Verificar que `google-services.json` esté en `android/app/`
- Verificar que `default_web_client_id` esté correcto
- Verificar que SHA-1 esté añadido en Firebase

### **Error: "Firestore permission denied"**
- Verificar reglas de seguridad
- Verificar que usuario esté autenticado
- Verificar estructura de colecciones

### **Error: "WebView not loading"**
- Verificar que assets estén copiados
- Verificar permisos de Internet
- Verificar que `index.html` exista

---

## 📞 **SIGUIENTE PASO**

Una vez configurado Firebase:
1. ✅ Colocar `google-services.json` en `android/app/`
2. ✅ Actualizar `default_web_client_id` en `strings.xml`
3. ✅ Configurar reglas de Firestore
4. ✅ Compilar y probar

**Después de completar estos pasos, continuaremos con la implementación del GameBridge.**

