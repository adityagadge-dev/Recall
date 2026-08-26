import React, { useEffect, useState } from 'react';
import { RewardApi } from '../../services/rewardApi';
import { motion } from 'motion/react';
import { LeaderboardRow } from '../../components/gamification/SkillNode';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import {
  Trophy,
  Crown,
  Flame,
  Zap,
  Award,
  User,
  Shield,
  Bell,
  Volume2,
  Mic,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState<'weekly' | 'all_time'>('weekly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await RewardApi.getLeaderboard();
        setLeaderboard(res.data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [timeframe]);

  return (
    <motion.div id="leaderboard-page" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} className="space-y-8 pb-12">
      {/* Header */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#0F766E]">
            <span>DIAMOND_LEAGUE_TIER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Global Mastery Leaderboard</h1>
          <p className="text-xs text-slate-600 mt-1">
            Rankings based on verified scenario accuracy, teach-back scores, and daily streaks.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
              timeframe === 'weekly' ? 'bg-teal-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe('all_time')}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
              timeframe === 'all_time' ? 'bg-teal-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All-Time
          </button>
        </div>
      </motion.div>

      {/* Top 3 Podium Cards */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((entry, idx) => (
          <div
            key={entry.userId}
            className={`relative rounded-3xl border p-6 text-center space-y-3 transition-transform duration-300 hover:-translate-y-1 ${
              idx === 0
                ? 'border-teal-200 bg-teal-50 shadow-md'
                : idx === 1 ? 'border-slate-200 bg-slate-50 shadow-sm' : 'border-orange-100 bg-orange-50 shadow-sm'
            }`}
          >
            <div className="mx-auto relative w-16 h-16">
              <img
                src={entry.avatarUrl}
                alt={entry.userName}
                className="w-full h-full rounded-full object-cover border-2 border-slate-200"
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-400 font-bold text-white text-xs font-mono">
                #{entry.rank}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">{entry.userName}</h4>
              <span className="text-xs text-slate-600 font-mono">Level {entry.level} Practitioner</span>
            </div>

            <div className="flex items-center justify-center gap-1 font-mono text-base font-extrabold text-teal-700">
              <Zap className="h-4 w-4 fill-[#EAB308] text-[#EAB308]" />
              <span>{entry.totalXp.toLocaleString()} XP</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Full Leaderboard List */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 px-2">Complete League Standings</h3>
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <LeaderboardRow key={entry.userId} entry={entry} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { currentXp, level, levelTitle, streakDays } = useGamification();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div id="profile-page" className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Profile Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'}
            alt={user?.name || 'Aria'}
            className="h-24 w-24 rounded-full border-2 border-[#0F766E]/50 object-cover shadow-xl"
          />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-[#0F172A]">{user?.name || 'Aria Chen'}</h1>
              <span className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-bold text-[#0F766E] border border-teal-50">
                Level {level} {levelTitle}
              </span>
            </div>
            <p className="text-xs text-slate-600">{user?.email || 'aria@recall.edu'} • Joined March 2026</p>
            <p className="text-xs text-slate-600 max-w-md">
              Focused on emergency CPR readiness and personal zero-based cashflow optimization.
            </p>
          </div>
        </div>
      </div>

      {/* Settings & Preferences */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-[#0F172A]">Learning Environment Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <Mic className="h-5 w-5 text-[#0F766E]" />
              <div>
                <h5 className="text-xs font-bold text-[#0F172A]">Voice Microphone Input</h5>
                <p className="text-[11px] text-slate-600">Enable voice recording for Teach-Back Feynman exercises</p>
              </div>
            </div>
            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`h-6 w-11 rounded-full transition ${micEnabled ? 'bg-teal-600' : 'bg-slate-700'} relative`}
            >
              <span className={`h-4 w-4 rounded-full bg-black absolute top-1 transition ${micEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-teal-400" />
              <div>
                <h5 className="text-xs font-bold text-[#0F172A]">Kinetic Sound & Haptics</h5>
                <p className="text-[11px] text-slate-600">Play auditory cues on XP gains, wheel clicks, and level-ups</p>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`h-6 w-11 rounded-full transition ${soundEnabled ? 'bg-teal-600' : 'bg-slate-700'} relative`}
            >
              <span className={`h-4 w-4 rounded-full bg-black absolute top-1 transition ${soundEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-purple-400" />
              <div>
                <h5 className="text-xs font-bold text-[#0F172A]">Spaced Retrieval Reminders</h5>
                <p className="text-[11px] text-slate-600">Daily notification to maintain your active streak</p>
              </div>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`h-6 w-11 rounded-full transition ${notificationsEnabled ? 'bg-teal-600' : 'bg-slate-700'} relative`}
            >
              <span className={`h-4 w-4 rounded-full bg-black absolute top-1 transition ${notificationsEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
