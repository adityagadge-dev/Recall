import React from 'react';
import { Badge, Achievement, DailyChallenge } from '../../types';
import { Award, Zap, CheckCircle2, Lock, Flame, ShieldAlert, HeartPulse, MessageSquare, TrendingUp, Mic, Target, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const ICON_MAP: Record<string, React.ElementType> = {
  HeartPulse,
  ShieldAlert,
  TrendingUp,
  Flame,
  MessageSquare,
  MessageSquareCheck: MessageSquare,
  Award,
  Mic,
  Target,
  Lock,
  Zap,
};

export const BadgeCard: React.FC<{ badge: Badge; isUnlocked?: boolean; onClick?: () => void }> = ({
  badge,
  isUnlocked = true,
  onClick,
}) => {
  const IconComponent = ICON_MAP[badge.icon] || Award;

  const tierBorders = {
    bronze: 'border-orange-200 bg-orange-50 text-orange-700',
    silver: 'border-[#323B4E] bg-[#0D1017] text-[#9AA4B8]',
    gold: 'border-yellow-200 bg-yellow-50 text-yellow-700',
    platinum: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  };

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col justify-between rounded-2xl border p-4 transition-all ${
        isUnlocked
          ? 'border-[#323B4E] bg-[#11151F] hover:border-teal-200 hover:shadow-md cursor-pointer'
          : 'border-[#1A2030] bg-[#0D1017]/50 opacity-60'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${tierBorders[badge.tier] || tierBorders.bronze}`}>
            {isUnlocked ? <IconComponent className="h-6 w-6" /> : <Lock className="h-5 w-5 text-[#9AA4B8]" />}
          </div>
          <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${tierBorders[badge.tier]}`}>
            {badge.tier}
          </span>
        </div>

        <h4 className="text-sm font-bold text-[#F7F8FC] mb-1 group-hover:text-teal-600 transition">
          {badge.title}
        </h4>
        <p className="text-xs text-[#9AA4B8] line-clamp-2 mb-3 leading-relaxed">
          {badge.description}
        </p>
      </div>

      <div className="border-t border-[#1A2030] pt-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-[#EAB308] font-semibold text-[11px]">
          <Zap className="h-3.5 w-3.5 fill-[#EAB308] text-[#EAB308]" />
          <span>+{badge.xpBonus} XP</span>
        </div>
        <span className="text-[11px] text-[#9AA4B8] font-mono">
          {isUnlocked ? 'Unlocked' : 'Locked'}
        </span>
      </div>
    </div>
  );
};

export const AchievementCard: React.FC<{
  achievement: Achievement;
  onClaim?: (id: string) => void;
}> = ({ achievement, onClaim }) => {
  const IconComponent = ICON_MAP[achievement.icon] || Award;
  const percentage = Math.min(100, Math.round((achievement.currentProgress / achievement.maxProgress) * 100));

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#323B4E] bg-[#11151F] p-4 transition hover:border-teal-200 hover:shadow-md">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
          achievement.isCompleted
            ? 'border-lime-500/40 bg-lime-500/10 text-[#EAB308]'
            : 'border-[#323B4E] bg-[#0D1017] text-[#9AA4B8]'
        }`}>
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-[#F7F8FC] truncate">{achievement.title}</h4>
            {achievement.isCompleted && (
              <CheckCircle2 className="h-3.5 w-3.5 text-[#EAB308] shrink-0" />
            )}
          </div>
          <p className="text-xs text-[#9AA4B8] line-clamp-1">{achievement.description}</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-1.5 w-32 rounded-full bg-[#1A2030] overflow-hidden">
              <div
                className="h-full rounded-full bg-teal-500 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-[#9AA4B8]">
              {achievement.currentProgress} / {achievement.maxProgress}
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div className="mb-1.5 flex items-center justify-end gap-1 text-xs font-bold text-[#EAB308]">
          <Zap className="h-3.5 w-3.5 fill-[#EAB308] text-[#EAB308]" />
          <span>+{achievement.rewardXp} XP</span>
        </div>
        {achievement.isCompleted ? (
          <span className="inline-block rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700">
            Completed
          </span>
        ) : (
          <span className="text-[11px] text-[#9AA4B8] font-mono">In Progress</span>
        )}
      </div>
    </div>
  );
};

export const DailyChallengeCard: React.FC<{ challenge: DailyChallenge; onComplete?: () => void }> = ({
  challenge,
  onComplete,
}) => {
  return (
    <div className={`relative flex items-center justify-between gap-4 rounded-xl border p-3.5 transition ${
      challenge.isCompleted
        ? 'border-teal-200 bg-teal-50'
        : 'border-[#323B4E] bg-[#11151F] hover:border-teal-200'
    }`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
          challenge.isCompleted
            ? 'border-lime-500/40 bg-lime-500/20 text-[#EAB308]'
            : 'border-[#323B4E] bg-[#1A2030] text-[#9AA4B8]'
        }`}>
          {challenge.isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Target className="h-4 w-4" />}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h5 className="text-xs font-bold text-[#F7F8FC] truncate">{challenge.title}</h5>
            <span className="rounded bg-[#1a212f] px-1.5 py-0.5 text-[9px] font-mono text-[#9AA4B8] uppercase">
              {challenge.type}
            </span>
          </div>
          <p className="text-[11px] text-[#9AA4B8] truncate">{challenge.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1 text-xs font-bold text-[#EAB308]">
          <Zap className="h-3.5 w-3.5 fill-[#EAB308] text-[#EAB308]" />
          <span>+{challenge.xpReward} XP</span>
        </div>
        {challenge.isCompleted ? (
          <span className="text-xs font-semibold text-[#EAB308]">Done</span>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center gap-1 rounded-lg bg-teal-500 px-2.5 py-1 text-[11px] font-bold text-black hover:bg-lime-300 transition"
          >
            <span>Start</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};
