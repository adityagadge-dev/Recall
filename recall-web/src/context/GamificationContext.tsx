import React, { createContext, useContext, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Badge } from '../types';
import { MOCK_BADGES } from '../mock/mockData';

export interface FloatingXp {
  id: string;
  amount: number;
  reason: string;
}

interface GamificationContextType {
  currentXp: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  nextLevelXp: number;
  floatingXpList: FloatingXp[];
  unlockedBadge: Badge | null;
  addXp: (amount: number, reason: string) => void;
  triggerLevelUpConfetti: () => void;
  dismissBadgeModal: () => void;
  unlockBadgeById: (badgeId: string) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const LEVEL_TIERS = [
  { level: 1, title: 'Explorer', xpNeeded: 500 },
  { level: 2, title: 'Curious Learner', xpNeeded: 1000 },
  { level: 3, title: 'Practitioner', xpNeeded: 2000 },
  { level: 4, title: 'Skilled Practitioner', xpNeeded: 3500 },
  { level: 5, title: 'Proficient Master', xpNeeded: 5500 },
  { level: 6, title: 'Field Mentor', xpNeeded: 8000 },
  { level: 7, title: 'Recall Paragon', xpNeeded: 12000 },
];

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentXp, setCurrentXp] = useState<number>(4850);
  const [streakDays, setStreakDays] = useState<number>(14);
  const [floatingXpList, setFloatingXpList] = useState<FloatingXp[]>([]);
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);

  // Compute level from XP
  let level = 1;
  let levelTitle = 'Explorer';
  let nextLevelXp = 500;

  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    if (currentXp >= LEVEL_TIERS[i].xpNeeded) {
      level = LEVEL_TIERS[i].level;
      levelTitle = LEVEL_TIERS[i].title;
      nextLevelXp = LEVEL_TIERS[i + 1]?.xpNeeded || LEVEL_TIERS[i].xpNeeded * 1.5;
    }
  }

  const triggerLevelUpConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A3E635', '#38BDF8', '#F59E0B', '#C084FC'],
    });
  }, []);

  const addXp = useCallback((amount: number, reason: string) => {
    const id = `xp_${Date.now()}_${Math.random()}`;
    setFloatingXpList(prev => [...prev, { id, amount, reason }]);
    setCurrentXp(prev => prev + amount);

    // Auto remove toast after 3.2s
    setTimeout(() => {
      setFloatingXpList(prev => prev.filter(item => item.id !== id));
    }, 3200);
  }, []);

  const unlockBadgeById = useCallback((badgeId: string) => {
    const badge = MOCK_BADGES.find(b => b.id === badgeId);
    if (badge) {
      setUnlockedBadge(badge);
      triggerLevelUpConfetti();
    }
  }, [triggerLevelUpConfetti]);

  const dismissBadgeModal = useCallback(() => {
    setUnlockedBadge(null);
  }, []);

  return (
    <GamificationContext.Provider
      value={{
        currentXp,
        level,
        levelTitle,
        streakDays,
        nextLevelXp,
        floatingXpList,
        unlockedBadge,
        addXp,
        triggerLevelUpConfetti,
        dismissBadgeModal,
        unlockBadgeById,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within a GamificationProvider');
  return context;
};
