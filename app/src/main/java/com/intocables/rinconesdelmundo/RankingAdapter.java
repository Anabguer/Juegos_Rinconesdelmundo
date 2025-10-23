package com.intocables.rinconesdelmundo;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.DiffUtil;
import androidx.recyclerview.widget.ListAdapter;
import androidx.recyclerview.widget.RecyclerView;

public class RankingAdapter extends ListAdapter<RankingActivity.RankingItem, RankingAdapter.RankingViewHolder> {
    
    public RankingAdapter() {
        super(DIFF_CALLBACK);
    }
    
    @NonNull
    @Override
    public RankingViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(android.R.layout.simple_list_item_2, parent, false);
        return new RankingViewHolder(view);
    }
    
    @Override
    public void onBindViewHolder(@NonNull RankingViewHolder holder, int position) {
        RankingActivity.RankingItem item = getItem(position);
        holder.bind(item, position);
    }
    
    static class RankingViewHolder extends RecyclerView.ViewHolder {
        private TextView positionText;
        private TextView nickText;
        private TextView puzzlesText;
        
        public RankingViewHolder(@NonNull View itemView) {
            super(itemView);
            positionText = itemView.findViewById(android.R.id.text1);
            nickText = itemView.findViewById(android.R.id.text2);
            puzzlesText = itemView.findViewById(android.R.id.text2);
        }
        
        public void bind(RankingActivity.RankingItem item, int position) {
            positionText.setText("#" + item.position);
            nickText.setText(item.nick);
            puzzlesText.setText(item.puzzlesCompletados + " puzzles");
            
            // Destacar al usuario actual
            if (item.isCurrentUser) {
                itemView.setBackgroundColor(0xFFE3F2FD); // Azul claro
                positionText.setTextColor(0xFF1976D2); // Azul
                nickText.setTextColor(0xFF1976D2); // Azul
                puzzlesText.setTextColor(0xFF1976D2); // Azul
            } else {
                itemView.setBackgroundColor(0xFFFFFFFF); // Blanco
                positionText.setTextColor(0xFF212121); // Negro
                nickText.setTextColor(0xFF212121); // Negro
                puzzlesText.setTextColor(0xFF757575); // Gris
            }
        }
    }
    
    private static final DiffUtil.ItemCallback<RankingActivity.RankingItem> DIFF_CALLBACK =
            new DiffUtil.ItemCallback<RankingActivity.RankingItem>() {
                @Override
                public boolean areItemsTheSame(@NonNull RankingActivity.RankingItem oldItem, 
                                             @NonNull RankingActivity.RankingItem newItem) {
                    return oldItem.uid.equals(newItem.uid);
                }
                
                @Override
                public boolean areContentsTheSame(@NonNull RankingActivity.RankingItem oldItem, 
                                                @NonNull RankingActivity.RankingItem newItem) {
                    return oldItem.nick.equals(newItem.nick) && 
                           oldItem.puzzlesCompletados == newItem.puzzlesCompletados &&
                           oldItem.position == newItem.position &&
                           oldItem.isCurrentUser == newItem.isCurrentUser;
                }
            };
}

