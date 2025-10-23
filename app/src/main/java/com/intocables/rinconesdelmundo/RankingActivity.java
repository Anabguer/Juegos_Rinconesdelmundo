package com.intocables.rinconesdelmundo;

import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import java.util.ArrayList;
import java.util.List;

public class RankingActivity extends AppCompatActivity {
    
    private static final String APP_ID = "rinconesdelmundo";
    
    private RecyclerView rankingRecyclerView;
    private TextView emptyText;
    private ProgressBar progressBar;
    private RankingAdapter adapter;
    
    private FirebaseFirestore db;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ranking);
        
        // Inicializar Firebase
        db = FirebaseFirestore.getInstance();
        
        // Inicializar vistas
        rankingRecyclerView = findViewById(R.id.rankingRecyclerView);
        emptyText = findViewById(R.id.emptyText);
        progressBar = findViewById(R.id.progressBar);
        
        // Configurar RecyclerView
        adapter = new RankingAdapter();
        rankingRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        rankingRecyclerView.setAdapter(adapter);
        
        // Cargar ranking
        loadRanking();
    }
    
    private void loadRanking() {
        showLoading(true);
        
        db.collection("apps").document(APP_ID).collection("users")
                .orderBy("puzzlesCompletados", Query.Direction.DESCENDING)
                .get()
                .addOnSuccessListener(queryDocumentSnapshots -> {
                    showLoading(false);
                    
                    List<RankingItem> items = new ArrayList<>();
                    int position = 1;
                    String currentUserUid = FirebaseAuth.getInstance().getCurrentUser().getUid();
                    
                    for (var document : queryDocumentSnapshots) {
                        String uid = document.getId();
                        String nick = document.getString("nick");
                        Long puzzlesCompletados = document.getLong("puzzlesCompletados");
                        
                        if (nick != null && puzzlesCompletados != null) {
                            boolean isCurrentUser = uid.equals(currentUserUid);
                            items.add(new RankingItem(uid, nick, puzzlesCompletados.intValue(), position, isCurrentUser));
                            position++;
                        }
                    }
                    
                    if (items.isEmpty()) {
                        emptyText.setVisibility(View.VISIBLE);
                        rankingRecyclerView.setVisibility(View.GONE);
                    } else {
                        emptyText.setVisibility(View.GONE);
                        rankingRecyclerView.setVisibility(View.VISIBLE);
                        adapter.submitList(items);
                        
                        // Scroll automático a la posición del usuario actual
                        scrollToCurrentUser(items);
                    }
                })
                .addOnFailureListener(e -> {
                    showLoading(false);
                    emptyText.setText("Error al cargar ranking");
                    emptyText.setVisibility(View.VISIBLE);
                    rankingRecyclerView.setVisibility(View.GONE);
                });
    }
    
    private void scrollToCurrentUser(List<RankingItem> items) {
        for (int i = 0; i < items.size(); i++) {
            if (items.get(i).isCurrentUser) {
                // Scroll a la posición del usuario actual
                final int finalPosition = i;
                rankingRecyclerView.post(() -> {
                    LinearLayoutManager layoutManager = (LinearLayoutManager) rankingRecyclerView.getLayoutManager();
                    if (layoutManager != null) {
                        layoutManager.scrollToPositionWithOffset(finalPosition, 0);
                    }
                });
                break;
            }
        }
    }
    
    private void showLoading(boolean show) {
        if (show) {
            progressBar.setVisibility(View.VISIBLE);
            rankingRecyclerView.setVisibility(View.GONE);
            emptyText.setVisibility(View.GONE);
        } else {
            progressBar.setVisibility(View.GONE);
        }
    }
    
    // Clase para representar un item del ranking
    public static class RankingItem {
        public String uid;
        public String nick;
        public int puzzlesCompletados;
        public int position;
        public boolean isCurrentUser;
        
        public RankingItem(String uid, String nick, int puzzlesCompletados, int position, boolean isCurrentUser) {
            this.uid = uid;
            this.nick = nick;
            this.puzzlesCompletados = puzzlesCompletados;
            this.position = position;
            this.isCurrentUser = isCurrentUser;
        }
    }
}

