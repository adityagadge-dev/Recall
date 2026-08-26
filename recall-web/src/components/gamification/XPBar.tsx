import React from 'react';
import { motion } from 'motion/react';
import { Zap, Flame, Award, ShieldCheck } from 'lucide-react';

interface XPBarProps {
  currentXp: number;
  nextLevelXp: number;
  level: number;
  levelTitle?: string;
  showLabels?: boolean;
  className?: string;
}

export const XPBar: React.FC<XPBarProps> = ({
  currentXp,
  nextLevelXp,
  level,
  levelTitle = 'Practitioner',
  showLabels = true,
  className = '',
}) => {
  const percentage = Math.min(100, Math.round((currentXp / (nextLevelXp || 1)) * 100));

  return (
    <div className={`w-full ${className}`}>
      {showLabels && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold text-[#0F172A]">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0F766E]/20 text-white text-[11px] font-bold border border-[#0F766E]/30">
              L{level}
            </span>
            <span>{levelTitle}</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
            <span className="text-teal-700 font-bold">{currentXp.toLocaleString()}</span>
            <span>/</span>
            <span>{nextLevelXp.toLocaleString()} XP</span>
          </div>
        </div>
      )}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200 border border-slate-300/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative h-full rounded-full bg-[#0F766E] shadow-sm"
        >
          <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/40 blur-[1px]" />
        </motion.div>
      </div>
    </div>
  );
};

export const StreakCounterBadge: React.FC<{ streakDays: number; freezeAvailable?: number }> = ({
  streakDays,
  freezeAvailable = 2,
}) => {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs shadow-sm">
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-100 text-teal-700 border border-teal-200">
        <Flame className="h-4 w-4 fill-teal-600 animate-pulse text-teal-600" />
      </div>
      <div>
        <div className="flex items-center gap-1 font-bold text-teal-800">
          <span>{streakDays} Day Streak</span>
        </div>
        <div className="text-[10px] text-teal-700/80 flex items-center gap-1">
          <span>{freezeAvailable} Shield{freezeAvailable !== 1 ? 's' : ''} active</span>
        </div>
      </div>
    </div>
  );
};

export const MasteryRing: React.FC<{ percentage: number; size?: number; strokeWidth?: number; color?: string; label?: string }> = ({
  percentage,
  size = 54,
  strokeWidth = 5,
  color = '#3B82F6', // Blue for light theme
  label,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span className="absolute text-[11px] font-bold font-mono text-[#0F172A]">
          {percentage}%
        </span>
      </div>
      {label && <span className="mt-1 text-[11px] font-medium text-slate-500">{label}</span>}
    </div>
  );
};
