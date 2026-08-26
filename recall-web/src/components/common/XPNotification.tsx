import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Award, Sparkles, X, CheckCircle2 } from 'lucide-react';

export const XPNotificationContainer: React.FC = () => {
  const { floatingXpList } = useGamification();

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none">
      <AnimatePresence>
        {floatingXpList.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20, scale: 0.85, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-3 rounded-xl border border-lime-500/40 bg-[#0f141c]/95 px-4 py-2.5 shadow-xl shadow-lime-950/40 backdrop-blur-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-500/20 text-lime-400 border border-lime-500/30">
              <Zap className="h-4 w-4 fill-lime-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-lime-300">+{item.amount} XP</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Awarded</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1">{item.reason}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const BadgeUnlockModal: React.FC = () => {
  const { unlockedBadge, dismissBadgeModal } = useGamification();

  if (!unlockedBadge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-md rounded-2xl border border-teal-600/40 bg-[#121620] p-6 text-center shadow-2xl shadow-teal-600/10"
      >
        <button
          onClick={dismissBadgeModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-teal-400/50 bg-gradient-to-b from-teal-600/20 to-transparent shadow-lg shadow-teal-600/20">
          <Award className="h-10 w-10 text-teal-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-600/30 bg-teal-600/10 px-3 py-1 text-xs font-semibold text-teal-300 mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>NEW BADGE UNLOCKED</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{unlockedBadge.title}</h3>
        <p className="text-sm text-slate-300 mb-4">{unlockedBadge.description}</p>

        <div className="rounded-xl border border-[#232b3c] bg-[#171c28] p-3 text-left mb-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Criteria Satisfied:</span>
            <span className="font-semibold text-teal-400 capitalize">{unlockedBadge.tier} Tier</span>
          </div>
          <p className="text-xs text-slate-200">{unlockedBadge.criteria}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-lime-400 text-sm font-semibold">
            <Zap className="h-4 w-4 fill-lime-400" />
            <span>+{unlockedBadge.xpBonus} Bonus XP</span>
          </div>
          <button
            onClick={dismissBadgeModal}
            className="flex items-center gap-1.5 rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-lime-300 shadow-lg shadow-lime-400/20"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Claim & Continue</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
