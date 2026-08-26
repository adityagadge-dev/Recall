import React from 'react';
import { Subject, Course } from '../../types';
import { Coins, ShieldCheck, HeartPulse, MessageSquareShare, Lock, CheckCircle2, ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const ICON_MAP: Record<string, React.ElementType> = {
  Coins,
  ShieldCheck,
  HeartPulse,
  MessageSquareShare,
};

export const SkillTreeInteractive: React.FC<{
  subjects: Subject[];
  userMastery?: Record<string, number>;
  onSelectSubject?: (subject: Subject) => void;
}> = ({ subjects, userMastery = {}, onSelectSubject }) => {
  return (
    <div id="interactive-skill-tree" className="relative w-full overflow-hidden rounded-3xl border border-[#202838] bg-[#0c1017] p-6 sm:p-10">
      {/* Background Kinetic Canvas Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.03),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-0.5 text-xs font-semibold text-lime-400 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-ping" />
            <span>NEURAL PROGRESSION MATRIX</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Your life should come with a skill tree.
          </h3>
          <p className="text-sm text-[#9AA4B8] max-w-xl mt-1">
            Master interconnected capabilities across personal finance, digital defense, trauma response, and high-trust dialogue.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#9AA4B8]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-lime-400" />
            <span>Active Mastery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <span>Unlocked</span>
          </div>
        </div>
      </div>

      {/* Grid of Interconnected Skill Nodes */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((sub, idx) => {
          const Icon = ICON_MAP[sub.iconName] || Coins;
          const mastery = userMastery[sub.id] || 0;
          const isMastered = mastery >= 80;

          return (
            <Link
              key={sub.id}
              to={`/app/subjects/${sub.slug}`}
              id={`skill-node-${sub.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#21293a] bg-[#121622]/80 p-5 transition-all hover:-translate-y-1 hover:border-lime-500/40 hover:bg-[#161c2b] hover:shadow-xl hover:shadow-lime-950/20"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/60 bg-[#18202e] ${sub.accentColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#161c28] px-2.5 py-1 text-xs font-mono font-bold text-[#687286]">
                    <span className="text-lime-400">{mastery}%</span>
                    <span className="text-[#9AA4B8]">Mastery</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-lime-300 transition mb-1 flex items-center justify-between">
                  <span>{sub.title}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition text-lime-400" />
                </h4>
                <p className="text-xs text-[#9AA4B8] line-clamp-2 leading-relaxed mb-4">
                  {sub.tagline}
                </p>

                {/* Key competencies tags */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9AA4B8]">Core Node Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {sub.keyCompetencies.slice(0, 3).map((comp, i) => (
                      <span key={i} className="rounded-md border border-[#232c3d] bg-[#151a26] px-2 py-0.5 text-[10px] text-[#687286]">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1d2535] pt-3 flex items-center justify-between text-xs text-[#9AA4B8]">
                <div className="flex items-center gap-1 text-lime-400 font-semibold text-[11px]">
                  <Zap className="h-3.5 w-3.5 fill-[#EAB308] text-[#EAB308]" />
                  <span>+{sub.totalXp} XP Available</span>
                </div>
                <span className="font-mono text-[11px] text-[#9AA4B8]">
                  {sub.totalLessons} Lessons
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const LeaderboardRow: React.FC<{
  entry: {
    rank: number;
    previousRank: number;
    userId: string;
    userName: string;
    avatarUrl: string;
    level: number;
    totalXp: number;
    streakDays: number;
    badgesCount: number;
    isCurrentUser?: boolean;
  };
}> = ({ entry }) => {
  const isUp = entry.rank < entry.previousRank;
  const isDown = entry.rank > entry.previousRank;

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border p-3.5 transition ${
        entry.isCurrentUser
          ? 'border-teal-300 bg-teal-50 shadow-sm'
          : 'border-[#323B4E] bg-[#11151F] hover:border-teal-200 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center font-bold text-sm font-mono">
          {entry.rank === 1 ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-400 text-black shadow-md">1</span>
          ) : entry.rank === 2 ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-300 text-black shadow-md">2</span>
          ) : entry.rank === 3 ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-800 text-white shadow-md">3</span>
          ) : (
            <span className="text-[#9AA4B8]">#{entry.rank}</span>
          )}
        </div>

        <img
          src={entry.avatarUrl}
          alt={entry.userName}
          className="h-10 w-10 shrink-0 rounded-full border border-slate-700 object-cover"
        />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#F7F8FC] truncate">
              {entry.userName}
            </span>
            {entry.isCurrentUser && (
              <span className="rounded bg-lime-500/20 px-1.5 py-0.5 text-[10px] font-bold text-lime-300">
                YOU
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-[#9AA4B8]">
            <span>Level {entry.level}</span>
            <span>•</span>
            <span className="text-teal-400 font-medium">{entry.streakDays}d streak</span>
          </div>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="flex items-center justify-end gap-1 font-mono text-sm font-extrabold text-lime-300">
          <span>{entry.totalXp.toLocaleString()}</span>
          <span className="text-xs font-normal text-[#9AA4B8]">XP</span>
        </div>
        <div className="text-[10px] text-[#9AA4B8] font-mono">
          {entry.badgesCount} badges earned
        </div>
      </div>
    </div>
  );
};
