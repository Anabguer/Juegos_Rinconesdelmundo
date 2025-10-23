package com.intocables.rinconesdelmundo;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Transaction;

import java.util.HashMap;
import java.util.Map;

public class NickSetupActivity extends AppCompatActivity {
    
    private static final String APP_ID = "rinconesdelmundo";
    private static final String TAG = "NickSetupActivity";
    
    private EditText editTextNick;
    private Button buttonSetNick;
    private ProgressBar progressBar;
    
    private FirebaseAuth mAuth;
    private FirebaseFirestore db;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nick_setup);
        
        // Inicializar Firebase
        mAuth = FirebaseAuth.getInstance();
        db = FirebaseFirestore.getInstance();
        
        // Inicializar vistas
        editTextNick = findViewById(R.id.nickEditText);
        buttonSetNick = findViewById(R.id.setNickButton);
        progressBar = findViewById(R.id.progressBar);
        
        // Configurar botón
        buttonSetNick.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setNick();
            }
        });
    }
    
    private void setNick() {
        String nick = editTextNick.getText().toString().trim();
        
        // Validar nick
        if (TextUtils.isEmpty(nick)) {
            editTextNick.setError("El nick no puede estar vacío");
            return;
        }
        
        if (nick.length() < 3) {
            editTextNick.setError("El nick debe tener al menos 3 caracteres");
            return;
        }
        
        if (nick.length() > 20) {
            editTextNick.setError("El nick no puede tener más de 20 caracteres");
            return;
        }
        
        // Verificar que el usuario esté logueado
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if (currentUser == null) {
            Toast.makeText(this, "Usuario no autenticado", Toast.LENGTH_SHORT).show();
            return;
        }
        
        // Mostrar progreso
        showProgress(true);
        
        // Transacción para verificar disponibilidad y crear nick
        String lowerNick = nick.toLowerCase();
        db.runTransaction(new Transaction.Function<Void>() {
            @Override
            public Void apply(@NonNull Transaction transaction) {
                try {
                    // Verificar si el nick ya existe
                    var nickRef = db.collection("apps").document(APP_ID)
                            .collection("nicks").document(lowerNick);
                    
                    if (transaction.get(nickRef).exists()) {
                        throw new RuntimeException("NICK_TAKEN");
                    }
                
                // Crear documento de nick
                Map<String, Object> nickData = new HashMap<>();
                nickData.put("uid", currentUser.getUid());
                nickData.put("nick", nick);
                nickData.put("createdAt", com.google.firebase.firestore.FieldValue.serverTimestamp());
                transaction.set(nickRef, nickData);
                
                // Crear/actualizar documento de usuario
                var userRef = db.collection("apps").document(APP_ID)
                        .collection("users").document(currentUser.getUid());
                
                Map<String, Object> userData = new HashMap<>();
                userData.put("nick", nick);
                userData.put("puzzlesCompletados", 0);
                userData.put("createdAt", com.google.firebase.firestore.FieldValue.serverTimestamp());
                userData.put("lastSeen", com.google.firebase.firestore.FieldValue.serverTimestamp());
                transaction.set(userRef, userData, com.google.firebase.firestore.SetOptions.merge());
                
                return null;
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                showProgress(false);
                
                if (task.isSuccessful()) {
                    Toast.makeText(NickSetupActivity.this, "Nick configurado correctamente", Toast.LENGTH_SHORT).show();
                    
                    // Ir a la actividad principal
                    Intent intent = new Intent(NickSetupActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                } else {
                    Exception exception = task.getException();
                    if (exception != null && exception.getMessage() != null && exception.getMessage().contains("NICK_TAKEN")) {
                        editTextNick.setError("Este nick ya está en uso");
                    } else {
                        Toast.makeText(NickSetupActivity.this, "Error al configurar nick", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });
    }
    
    private void showProgress(boolean show) {
        if (show) {
            progressBar.setVisibility(View.VISIBLE);
            buttonSetNick.setEnabled(false);
            editTextNick.setEnabled(false);
        } else {
            progressBar.setVisibility(View.GONE);
            buttonSetNick.setEnabled(true);
            editTextNick.setEnabled(true);
        }
    }
}

