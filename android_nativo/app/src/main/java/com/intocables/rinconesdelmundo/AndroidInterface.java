package com.intocables.rinconesdelmundo;

import android.util.Log;
import android.webkit.JavascriptInterface;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.SetOptions;
import org.json.JSONObject;
import java.util.HashMap;
import java.util.Map;

public class AndroidInterface {
    private static final String TAG = "AndroidInterface";
    private static final String APP_ID = "rinconesdelmundo";
    private static final String WEB_CLIENT_ID = "439019722673-oaibju1ssbvnbnvvgbvj3ibetu68tsv2.apps.googleusercontent.com";
    
    private GameActivity activity;
    private FirebaseAuth mAuth;
    private FirebaseFirestore db;

    public AndroidInterface(GameActivity activity) {
        this.activity = activity;
        this.mAuth = FirebaseAuth.getInstance();
        this.db = FirebaseFirestore.getInstance();
        
        Log.d(TAG, "🚀 AndroidInterface inicializado");
    }

    @JavascriptInterface
    public void login() {
        Log.d(TAG, "🔐 login() llamado desde JavaScript");
        activity.runOnUiThread(() -> activity.doNativeLogin());
    }

    @JavascriptInterface
    public void logout() {
        Log.d(TAG, "🚪 logout() llamado desde JavaScript");
        activity.runOnUiThread(() -> activity.doNativeLogout());
    }

    @JavascriptInterface
    public void getUser() {
        Log.d(TAG, "👤 getUser() llamado desde JavaScript");
        FirebaseUser u = mAuth.getCurrentUser();
        if (u != null) {
            activity.sendUserToJS(u);
        } else {
            activity.evalJS("window.__onNativeLogout && __onNativeLogout()");
        }
    }

    @JavascriptInterface
    public void saveNick(String nick) {
        Log.d(TAG, "💾 saveNick() llamado desde JavaScript: " + nick);
        activity.runOnUiThread(() -> activity.saveNickNative(nick));
    }

    @JavascriptInterface
    public void updateAudioEnabled(boolean enabled) {
        Log.d(TAG, "🔊 updateAudioEnabled() llamado: " + enabled);
        
        FirebaseUser u = mAuth.getCurrentUser();
        if (u == null) {
            Log.w(TAG, "⚠️ Usuario no logueado");
            return;
        }
        
        Map<String, Object> userData = new HashMap<>();
        userData.put("audioEnabled", enabled);
        userData.put("lastSeen", java.time.Instant.now().toString());
        
        db.collection("apps").document(APP_ID).collection("users").document(u.getUid())
                .set(userData, SetOptions.merge())
                .addOnSuccessListener(v -> Log.d(TAG, "✅ audioEnabled actualizado: " + enabled))
                .addOnFailureListener(e -> Log.e(TAG, "❌ Error actualizando audioEnabled", e));
    }
    
    @JavascriptInterface
    public void updateSoundEnabled(boolean enabled) {
        Log.d(TAG, "🔊 updateSoundEnabled() llamado: " + enabled);
        
        FirebaseUser u = mAuth.getCurrentUser();
        if (u == null) {
            Log.w(TAG, "⚠️ Usuario no logueado");
            return;
        }
        
        Map<String, Object> userData = new HashMap<>();
        userData.put("soundEnabled", enabled);
        userData.put("lastSeen", java.time.Instant.now().toString());
        
        db.collection("apps").document(APP_ID).collection("users").document(u.getUid())
                .set(userData, SetOptions.merge())
                .addOnSuccessListener(v -> Log.d(TAG, "✅ soundEnabled actualizado: " + enabled))
                .addOnFailureListener(e -> Log.e(TAG, "❌ Error actualizando soundEnabled", e));
    }

    @JavascriptInterface
    public void getFirebaseProgress() {
        Log.d(TAG, "📥 getFirebaseProgress() llamado");
        
        FirebaseUser u = mAuth.getCurrentUser();
        if (u == null) {
            Log.w(TAG, "⚠️ Usuario no logueado");
            activity.evalJS("window.__onFirebaseProgressLoaded && __onFirebaseProgressLoaded(null)");
            return;
        }
        
        // Cargar progreso desde Firebase
        db.collection("apps").document(APP_ID).collection("progress").document(u.getUid()).get()
                .addOnSuccessListener(doc -> {
                    if (doc.exists()) {
                        try {
                            JSONObject progress = new JSONObject();
                            
                            // Convertir completedLevels de Lista de Java a JSONArray correctamente
                            Object completedLevelsObj = doc.get("completedLevels");
                            if (completedLevelsObj instanceof java.util.List) {
                                java.util.List<?> list = (java.util.List<?>) completedLevelsObj;
                                org.json.JSONArray jsonArray = new org.json.JSONArray();
                                for (Object item : list) {
                                    jsonArray.put(item);
                                }
                                progress.put("completedLevels", jsonArray);
                                Log.d(TAG, "✅ completedLevels convertido a JSONArray: " + jsonArray.toString());
                            } else {
                                progress.put("completedLevels", new org.json.JSONArray());
                                Log.w(TAG, "⚠️ completedLevels no es una lista, usando array vacío");
                            }
                            
                            progress.put("currentWorld", doc.get("currentWorld"));
                            progress.put("currentLevel", doc.get("currentLevel"));
                            progress.put("totalTime", doc.get("totalTime"));
                            
                            Log.d(TAG, "✅ Progreso cargado desde Firebase: " + progress.toString());
                            activity.evalJS("window.__onFirebaseProgressLoaded && __onFirebaseProgressLoaded(" + JSONObject.quote(progress.toString()) + ")");
                        } catch (Exception e) {
                            Log.e(TAG, "❌ Error parseando progreso de Firebase", e);
                            activity.evalJS("window.__onFirebaseProgressLoaded && __onFirebaseProgressLoaded(null)");
                        }
                    } else {
                        Log.d(TAG, "ℹ️ No hay progreso en Firebase");
                        activity.evalJS("window.__onFirebaseProgressLoaded && __onFirebaseProgressLoaded(null)");
                    }
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "❌ Error cargando progreso de Firebase", e);
                    activity.evalJS("window.__onFirebaseProgressLoaded && __onFirebaseProgressLoaded(null)");
                });
    }

    @JavascriptInterface
    public void saveProgress(String progressJson) {
        Log.d(TAG, "💾 saveProgress() llamado");
        Log.d(TAG, "📄 Progress JSON: " + progressJson);
        
        FirebaseUser u = mAuth.getCurrentUser();
        if (u == null) {
            Log.w(TAG, "⚠️ Usuario no logueado");
            return;
        }
        
        try {
            JSONObject progress = new JSONObject(progressJson);
            
            Map<String, Object> progressData = new HashMap<>();
            
            // Extraer completedLevels como lista
            if (progress.has("completedLevels")) {
                Log.d(TAG, "📋 Procesando completedLevels...");
                org.json.JSONArray completedArray = progress.getJSONArray("completedLevels");
                Log.d(TAG, "   JSONArray length: " + completedArray.length());
                Log.d(TAG, "   JSONArray toString: " + completedArray.toString());
                
                java.util.List<String> completedList = new java.util.ArrayList<>();
                for (int i = 0; i < completedArray.length(); i++) {
                    String item = completedArray.getString(i);
                    Log.d(TAG, "   Index " + i + ": '" + item + "'");
                    completedList.add(item);
                }
                
                Log.d(TAG, "   Lista final: " + completedList.toString());
                progressData.put("completedLevels", completedList);
            }
            
            // Extraer otros campos (SIN audioEnabled)
            if (progress.has("currentWorld")) {
                progressData.put("currentWorld", (long) progress.getInt("currentWorld"));
            }
            if (progress.has("currentLevel")) {
                progressData.put("currentLevel", (long) progress.getInt("currentLevel"));
            }
            if (progress.has("totalTime")) {
                progressData.put("totalTime", (long) progress.getInt("totalTime"));
            }
            
            progressData.put("lastUpdated", java.time.Instant.now().toString());
            
            // Guardar progreso en apps/rinconesdelmundo/progress/{uid}
            db.collection("apps").document(APP_ID).collection("progress").document(u.getUid())
                    .set(progressData, SetOptions.merge())
                    .addOnSuccessListener(v -> Log.d(TAG, "✅ Progreso guardado correctamente"))
                    .addOnFailureListener(e -> Log.e(TAG, "❌ Error guardando progreso", e));
            
            // Actualizar lastSeen en users
            Map<String, Object> userData = new HashMap<>();
            userData.put("lastSeen", java.time.Instant.now().toString());
            
            db.collection("apps").document(APP_ID).collection("users").document(u.getUid())
                    .set(userData, SetOptions.merge())
                    .addOnSuccessListener(v -> Log.d(TAG, "✅ lastSeen actualizado"))
                    .addOnFailureListener(e -> Log.e(TAG, "❌ Error actualizando lastSeen", e));
                    
        } catch (Exception e) {
            Log.e(TAG, "❌ Error parseando progress JSON", e);
        }
    }
}
