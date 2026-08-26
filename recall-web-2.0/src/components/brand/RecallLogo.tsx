import React from 'react';
import { Sparkles } from 'lucide-react';

export const RecallLogo: React.FC<{ className?: string; color?: string }> = ({ className = '', color = '#F7F8FC' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B61] text-[#07080C]">
        <Sparkles className="h-4 w-4 fill-[#07080C] text-[#07080C]" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight" style={{ color }}>RECALL</span>
      </div>
    </div>
  );
};
