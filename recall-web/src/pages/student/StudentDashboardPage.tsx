import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { LearnerApi } from '../../services/learnerApi';
import { CourseApi } from '../../services/courseApi';
import { RewardApi } from '../../services/rewardApi';
import { Subject, Course, DailyChallenge, Badge } from '../../types';
import { SkillTreeInteractive } from '../../components/gamification/SkillNode';
import { DailyChallengeCard, BadgeCard } from '../../components/gamification/BadgeCard';
import { XPBar, StreakCounterBadge } from '../../components/gamification/XPBar';
import {
  Zap,
  Play,
  RotateCw,
  Flame,
  Award,
  ChevronRight,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Target
} from 'lucide-react';

export const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { currentXp, nextLevelXp, level, levelTitle, streakDays, addXp, triggerLevelUpConfetti } = useGamification();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [recentBadges, setRecentBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [dashRes, subRes, rewRes] = await Promise.all([
          LearnerApi.getDashboardData(),
          CourseApi.getSubjects(),
          RewardApi.getBadges(),
        ]);

        setSubjects(subRes.data);
        setActiveCourse(dashRes.data.continueLearning[0] || null);
        setChallenges(dashRes.data.dailyChallenges);
        setRecentBadges(rewRes.data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const handleCompleteChallenge = (challengeId: string, xpReward: number) => {
    setChallenges(prev =>
      prev.map(c => (c.id === challengeId ? { ...c, isCompleted: true } : c))
    );
    addXp(xpReward, 'Completed Daily Challenge');
    triggerLevelUpConfetti();
  };

  const userMasteryMock: Record<string, number> = {
    sub_finance: 64,
    sub_safety: 42,
    sub_firstaid: 88,
    sub_comm: 35,
  };

  return (
    <motion.div id="student-dashboard" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} className="space-y-8 pb-12">
      {/* Welcome Header */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Welcome back, {user?.name || 'Aria'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            You're on a <strong className="text-teal-600">{streakDays}-day learning streak</strong>. Keep building your skills.
          </p>
        </div>

        {/* Daily Goal & Streak summary */}
        <div className="flex items-center gap-3">
          <Link
            to="/app/spin-teach"
            id="dash-spin-teach-btn"
            className="group flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-5 py-2.5 text-sm font-bold text-[#0F172A] shadow-sm hover:border-[#0F766E] hover:shadow-md transition-all active:scale-95"
          >
            <RotateCw className="h-4 w-4 text-[#0F766E] group-hover:rotate-180 transition-transform duration-500" />
            <span>Spin & Teach (+100 XP)</span>
          </Link>
        </div>
      </motion.div>

      {/* Active Course Resume Banner */}
      {activeCourse && (
        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase text-teal-700 border border-teal-100">
                  CONTINUE LEARNING
                </span>
                <span className="text-xs font-mono text-slate-500">{activeCourse.difficulty} Level</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">{activeCourse.title}</h2>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {activeCourse.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
                <span>{activeCourse.modules.length} Modules</span>
                <span>•</span>
                <span>+{activeCourse.totalXp} XP available</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                to={`/app/learning/${activeCourse.id}`}
                id="resume-course-btn"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-[#0F766E] px-6 py-3 text-sm font-bold text-white hover:bg-teal-600 transition shadow-sm hover:-translate-y-0.5"
              >
                <Play className="h-4 w-4 fill-[#0F172A]" />
                <span>Resume Lesson</span>
              </Link>
              <Link
                to={`/app/quiz/quiz_fin_01`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:text-[#0F172A] hover:bg-slate-50 transition"
              >
                <span>Take Diagnostic</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Clean Skills Overview (Replacing overly complex tree for light theme) */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="space-y-4">
         <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0F172A]">Subject Mastery</h3>
            <Link to="/app/subjects" className="text-sm text-teal-600 hover:underline flex items-center gap-1 font-medium">
              <span>View Curriculum</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {subjects.slice(0, 4).map(sub => {
               const progress = userMasteryMock[sub.id] || 0;
               return (
                 <Link key={sub.id} style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }} to={`/app/subjects/${sub.id}`} className="block rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-teal-200 transition group">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{sub.category}</span>
                     <span className="text-xs font-bold text-[#0F172A]">{progress}%</span>
                   </div>
                   <h4 className="text-sm font-bold text-[#0F172A] mb-4 group-hover:text-teal-600 transition">{sub.title}</h4>
                   <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                     <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                   </div>
                 </Link>
               );
             })}
          </div>
      </motion.div>

      {/* Daily Challenges & Badges Grid */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Daily Challenges */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span>Daily Retrieval Targets</span>
              <span className="rounded-full bg-[#0F766E]/10 px-2 py-0.5 text-xs font-bold text-teal-800">
                {challenges.filter(c => c.isCompleted).length}/{challenges.length}
              </span>
            </h3>
            <span className="text-xs text-slate-500">Resets daily</span>
          </div>

          <div className="space-y-3">
            {challenges.map((c) => (
              <div key={c.id} className={`flex items-center justify-between gap-4 rounded-xl border p-4 transition ${
                c.isCompleted ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    c.isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {c.isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-sm font-bold text-[#0F172A] truncate">{c.title}</h5>
                    <p className="text-xs text-slate-500 truncate">{c.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1 text-sm font-bold text-teal-600">
                    <Zap className="h-4 w-4 fill-teal-600" />
                    <span>+{c.xpReward} XP</span>
                  </div>
                  {c.isCompleted ? (
                    <span className="text-xs font-bold text-green-600">Done</span>
                  ) : (
                    <button
                      onClick={() => handleCompleteChallenge(c.id, c.xpReward)}
                      className="flex items-center gap-1 rounded-lg bg-[#0F766E] px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-600 transition"
                    >
                      <span>Start</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Badges & Progression */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0F172A]">Recent Achievements</h3>
            <Link to="/app/rewards" className="text-sm text-teal-600 hover:underline flex items-center gap-1 font-medium">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#0F172A]">{badge.title}</h5>
                    <p className="text-xs text-slate-500 line-clamp-1">{badge.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-teal-600">
                  <Zap className="h-3.5 w-3.5 fill-teal-600" />
                  <span>+{badge.xpBonus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SubjectDetailsPage: React.FC = () => {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const subs = await CourseApi.getSubjects();
        const found = subs.data[0];
        setSubject(found);
        const crs = await CourseApi.getCoursesBySubject(found.id);
        setCourses(crs.data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!subject) return <div className="p-8 text-center text-slate-500">Loading Subject...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 space-y-4 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{subject.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">{subject.title}</h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">{subject.description}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A]">Curriculum Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 hover:shadow-md hover:border-slate-300 transition">
              <div className="flex items-center justify-between">
                <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {c.difficulty}
                </span>
                <div className="flex items-center gap-1 text-sm font-bold text-teal-600">
                  <Zap className="h-4 w-4 fill-teal-600" />
                  <span>+{c.totalXp} XP</span>
                </div>
              </div>

              <h4 className="text-lg font-bold text-[#0F172A]">{c.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{c.description}</p>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{c.modules.length} Modules</span>
                <Link
                  to={`/app/learning/${c.id}`}
                  className="flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 transition"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
