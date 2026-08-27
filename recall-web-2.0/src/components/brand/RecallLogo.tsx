import React from 'react';

export const RecallLogo: React.FC<{ className?: string; color?: string }> = ({ className = '', color = '#F7F8FC' }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <img 
        src="https://raw.githubusercontent.com/adityagadge-dev/Recall/refs/heads/main/assets/recall_white.png" 
        alt="Recall Logo" 
        className="h-10 w-10 object-contain"
      />
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight" style={{ color }}>RECALL</span>
      </div>
    </div>
  );
};
