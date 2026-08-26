import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { ProgressApi } from '../../services/progressApi';
import { RewardApi } from '../../services/rewardApi';
import { MasteryRing } from '../../components/gamification/XPBar';
import { BadgeCard, AchievementCard } from '../../components/gamification/BadgeCard';
import { Badge, Achievement } from '../../types';
import {
  TrendingUp,
  Award,
  Zap,
  Calendar,
  Clock,
  CheckCircle2,
  Flame,
  BarChart3,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

export const ProgressPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await ProgressApi.getLearnerProgress();
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const weeklyXpData = [
    { day: 'Mon', xp: 240 },
    { day: 'Tue', xp: 480 },
    { day: 'Wed', xp: 320 },
    { day: 'Thu', xp: 650 },
    { day: 'Fri', xp: 520 },
    { day: 'Sat', xp: 780 },
    { day: 'Sun', xp: 450 },
  ];

  const subjectMasteryData = [
    { name: 'Finance', score: 64, color: '#f59e0b' },
    { name: 'Digital Defense', score: 42, color: '#06b6d4' },
    { name: 'First Aid', score: 88, color: '#84cc16' },
    { name: 'Communication', score: 35, color: '#c084fc' },
  ];

  return (
    <div id="student-progress-page" className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#323B4E] pb-6">
        <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#0F766E]">
          <span>PROGRESS_TELEMETRY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F8FC]">Neural Progress & Mastery</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">
          Detailed cognitive analytics, XP velocity, and retention metrics.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#323B4E] bg-[#0D1017] p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase text-[#9AA4B8]">Total XP Velocity</span>
          <div className="text-2xl font-black text-[#0F766E] font-mono">3,440 XP</div>
          <span className="text-[10px] text-[#9AA4B8]">+780 XP this week</span>
        </div>

        <div className="rounded-2xl border border-[#323B4E] bg-[#0D1017] p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase text-[#9AA4B8]">Retention Score</span>
          <div className="text-2xl font-black text-[#0F766E] font-mono">94.8%</div>
          <span className="text-[10px] text-[#9AA4B8]">Teach-Back accuracy</span>
        </div>

        <div className="rounded-2xl border border-[#323B4E] bg-[#0D1017] p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase text-[#9AA4B8]">Active Streak</span>
          <div className="text-2xl font-black text-teal-400 font-mono">14 Days</div>
          <span className="text-[10px] text-[#9AA4B8]">2 streak shields stored</span>
        </div>

        <div className="rounded-2xl border border-[#323B4E] bg-[#0D1017] p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase text-[#9AA4B8]">Cognitive Focus</span>
          <div className="text-2xl font-black text-purple-400 font-mono">18.5 Hrs</div>
          <span className="text-[10px] text-[#9AA4B8]">Applied scenario time</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* XP Activity Line Chart */}
        <div className="lg:col-span-8 rounded-3xl border border-[#323B4E] bg-[#11151F] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F7F8FC]">Weekly Learning Velocity</h3>
            <span className="text-xs font-mono text-[#9AA4B8]">Last 7 Days</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyXpData}>
                <defs>
                  <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a3e635" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a3e635" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c2434" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#101522', borderColor: '#263145', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#a3e635" strokeWidth={3} fillOpacity={1} fill="url(#xpGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Mastery Radar/Bars */}
        <div className="lg:col-span-4 rounded-3xl border border-[#323B4E] bg-[#11151F] p-6 space-y-4">
          <h3 className="text-base font-bold text-[#F7F8FC]">Domain Mastery</h3>
          <div className="space-y-4 pt-2">
            {subjectMasteryData.map((sub, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#9AA4B8]">{sub.name}</span>
                  <span className="font-mono font-bold text-[#F7F8FC]">{sub.score}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#0D1017] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${sub.score}%`, backgroundColor: sub.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const RewardsPage: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filterTier, setFilterTier] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [bRes, aRes] = await Promise.all([
          RewardApi.getBadges(),
          RewardApi.getAchievements(),
        ]);
        setBadges(bRes.data);
        setAchievements(aRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredBadges = filterTier === 'all'
    ? badges
    : badges.filter(b => b.tier === filterTier);

  return (
    <motion.div id="rewards-page" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} className="space-y-8 pb-12">
      {/* Header */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#323B4E] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#0F766E]">
            <span>REWARDS_&_ACHIEVEMENTS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F8FC]">Gamification & Badges</h1>
          <p className="text-xs text-[#9AA4B8] mt-1">
            Proof-of-competency credentials earned through real simulations and teach-back mastery.
          </p>
        </div>

        {/* Tier Filter */}
        <div className="flex items-center gap-1.5 rounded-xl border border-[#323B4E] bg-[#0D1017] p-1 text-xs">
          {['all', 'bronze', 'silver', 'gold', 'platinum'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`rounded-lg px-2.5 py-1 font-bold uppercase text-[10px] transition ${
                filterTier === tier
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-[#9AA4B8] hover:text-teal-700 hover:bg-[#1A2030]'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Badges Grid */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-4">
        <h3 className="text-base font-bold text-[#F7F8FC] flex items-center gap-2">
          <Award className="h-4 w-4 text-teal-600" />
          <span>Earned Competency Badges ({filteredBadges.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBadges.map((b) => (
            <BadgeCard key={b.id} badge={b} isUnlocked={true} />
          ))}
        </div>
      </motion.div>

      {/* Achievements Quests List */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-4 pt-4">
        <h3 className="text-base font-bold text-[#F7F8FC] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#0F766E]" />
          <span>Long-Term Milestone Quests</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
