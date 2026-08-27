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
import { useParams } from 'react-router-dom';

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
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#323B4E] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F8FC]">
            Welcome back, {user?.name || 'Aria'}
          </h1>
          <p className="text-sm text-[#9AA4B8] mt-1">
            You're on a <strong className="text-[#FF6B61]">{streakDays}-day learning streak</strong>. Keep building your skills.
          </p>
        </div>

        {/* Daily Goal & Streak summary */}
        <div className="flex items-center gap-3">
          <Link
            to="/app/spin-teach"
            id="dash-spin-teach-btn"
            className="group flex items-center gap-2 rounded-2xl bg-[#11151F] border border-[#323B4E] px-5 py-2.5 text-sm font-bold text-[#F7F8FC] shadow-sm hover:border-[#FF6B61] hover:shadow-md transition-all active:scale-95"
          >
            <RotateCw className="h-4 w-4 text-[#0F766E] group-hover:rotate-180 transition-transform duration-500" />
            <span>Spin & Teach (+100 XP)</span>
          </Link>
        </div>
      </motion.div>

      {/* Active Course Resume Banner */}
      {activeCourse && (
        <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="relative overflow-hidden rounded-3xl border border-[#323B4E] bg-[#11151F] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#FF6B61]/10 px-2 py-0.5 text-[10px] font-bold uppercase text-[#FF6B61] border border-[#FF6B61]/30">
                  CONTINUE LEARNING
                </span>
                <span className="text-xs font-mono text-[#9AA4B8]">{activeCourse.difficulty} Level</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#F7F8FC]">{activeCourse.title}</h2>
              <p className="text-sm text-[#9AA4B8] line-clamp-2 leading-relaxed">
                {activeCourse.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-[#687286] pt-1 font-mono">
                <span>{activeCourse.modules.length} Modules</span>
                <span>•</span>
                <span>+{activeCourse.totalXp} XP available</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                to={`/app/learning/${activeCourse.id}`}
                id="resume-course-btn"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B61] px-6 py-3 text-sm font-bold text-white hover:bg-[#FF4D5A] transition-all duration-300 shadow-sm hover:-translate-y-0.5"
              >
                <Play className="h-4 w-4 fill-[#0F172A]" />
                <span>Resume Lesson</span>
              </Link>
              <Link
                to={`/app/quiz/quiz_fin_01`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-[#323B4E] bg-[#11151F] px-5 py-3 text-sm font-bold text-[#9AA4B8] hover:text-[#F7F8FC] hover:bg-[#0D1017] transition-all duration-300"
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
            <h3 className="text-lg font-bold text-[#F7F8FC]">Subject Mastery</h3>
            <Link to="/app/subjects" className="text-sm text-[#FF6B61] hover:underline flex items-center gap-1 font-medium">
              <span>View Curriculum</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {subjects.slice(0, 4).map(sub => {
               const progress = userMasteryMock[sub.id] || 0;
               return (
                 <Link key={sub.id} style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }} to={`/app/subjects/${sub.id}`} className="block rounded-2xl border border-[#323B4E] bg-[#11151F] p-5 hover:shadow-md hover:border-[#FF6B61] transition-all duration-300 group">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-bold uppercase text-[#687286] tracking-wider">{sub.category}</span>
                     <span className="text-xs font-bold text-[#F7F8FC]">{progress}%</span>
                   </div>
                   <h4 className="text-sm font-bold text-[#F7F8FC] mb-4 group-hover:text-[#FF6B61] transition-all duration-300">{sub.title}</h4>
                   <div className="w-full bg-[#1A2030] rounded-full h-1.5 overflow-hidden">
                     <div className="bg-[#FF6B61] h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
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
            <h3 className="text-lg font-bold text-[#F7F8FC] flex items-center gap-2">
              <span>Daily Retrieval Targets</span>
              <span className="rounded-full bg-[#FF6B61]/10 px-2 py-0.5 text-xs font-bold text-[#FF6B61]">
                {challenges.filter(c => c.isCompleted).length}/{challenges.length}
              </span>
            </h3>
            <span className="text-xs text-[#9AA4B8]">Resets daily</span>
          </div>

          <div className="space-y-3">
            {challenges.map((c) => (
              <div key={c.id} className={`flex items-center justify-between gap-4 rounded-xl border p-4 transition-all duration-300 ${
                c.isCompleted ? 'border-green-500/30 bg-green-500/10' : 'border-[#323B4E] bg-[#11151F] hover:border-[#FF6B61]'
              }`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    c.isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-[#1A2030] text-[#9AA4B8]'
                  }`}>
                    {c.isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-sm font-bold text-[#F7F8FC] truncate">{c.title}</h5>
                    <p className="text-xs text-[#9AA4B8] truncate">{c.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1 text-sm font-bold text-[#FF6B61]">
                    <Zap className="h-4 w-4 fill-[#FF6B61]" />
                    <span>+{c.xpReward} XP</span>
                  </div>
                  {c.isCompleted ? (
                    <span className="text-xs font-bold text-green-400">Done</span>
                  ) : (
                    <button
                      onClick={() => handleCompleteChallenge(c.id, c.xpReward)}
                      className="flex items-center gap-1 rounded-lg bg-[#FF6B61] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#FF4D5A] transition-all duration-300"
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
            <h3 className="text-lg font-bold text-[#F7F8FC]">Recent Achievements</h3>
            <Link to="/app/rewards" className="text-sm text-[#FF6B61] hover:underline flex items-center gap-1 font-medium">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center justify-between rounded-xl border border-[#323B4E] bg-[#11151F] p-4 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B61]/10 text-[#FF6B61] border border-[#FF6B61]/30">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#F7F8FC]">{badge.title}</h5>
                    <p className="text-xs text-[#9AA4B8] line-clamp-1">{badge.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-[#FF6B61]">
                  <Zap className="h-3.5 w-3.5 fill-[#FF6B61]" />
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
  const { slug } = useParams<{ slug: string }>();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!slug) {
        setError('No subject slug provided in URL');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await CourseApi.getSubjects();

        const subjectsList: Subject[] = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
            ? res.data
            : [];

        const targetClean = slug.toLowerCase().replace(/[^a-z0-9]/g, '');

        let found = subjectsList.find((s: Subject) => {
          const sIdClean = String(s.id || s._id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const sSlugClean = (s.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const sTitleClean = (s.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

          return (
            sIdClean === targetClean ||
            sSlugClean === targetClean ||
            sTitleClean === targetClean ||
            sTitleClean.includes(targetClean) ||
            targetClean.includes(sTitleClean)
          );
        });

        // Construct fully compliant fallback if not found in list
        if (!found) {
          const formattedTitle = slug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

          found = {
            id: slug,
            _id: slug,
            title: formattedTitle,
            category: 'Core Curriculum',
            description: `Master fundamental concepts and practical skills in ${formattedTitle}.`,
            slug: slug,
            tagline: `Essential skills in ${formattedTitle}`,
            accentColor: '#FF6B61',
            accentGlow: 'rgba(255, 107, 97, 0.2)',
          } as unknown as Subject;
        }

        setSubject(found);

        const targetKey = found._id || found.id;
        try {
          const crs = await CourseApi.getCoursesBySubject(targetKey);
          const courseData = Array.isArray(crs) ? crs : crs?.data || [];

          if (courseData.length > 0) {
            setCourses(courseData);
          } else {
            setCourses(getMockCourses(found.title));
          }
        } catch (courseErr) {
          console.error('Failed to fetch courses, loading defaults:', courseErr);
          setCourses(getMockCourses(found.title));
        }
      } catch (err) {
        console.error('Error fetching subject details:', err);
        setError('Failed to load subject details.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  function getMockCourses(subjectTitle: string): Course[] {
    // Generate valid slug-like IDs that match your learning environment routes
    const baseSlug = subjectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    return [
      {
        id: `${baseSlug}-foundations`,
        title: `Foundations of ${subjectTitle}`,
        description: `Core principles and practical mental models for ${subjectTitle.toLowerCase()}.`,
        difficulty: 'Beginner',
        totalXp: 500,
        modules: [1, 2, 3],
      },
      {
        id: `${baseSlug}-advanced`,
        title: `Advanced ${subjectTitle} Strategies`,
        description: `Deep dive into real-world applications and decision frameworks.`,
        difficulty: 'Intermediate',
        totalXp: 750,
        modules: [1, 2, 3, 4],
      },
    ] as Course[];
  }

  if (loading) {
    return <div className="p-8 text-center text-[#9AA4B8]">Loading Subject...</div>;
  }

  if (error || !subject) {
    return (
      <div className="p-8 text-center text-[#FF6B61]">
        <p>{error || 'Subject not found.'}</p>
        <Link to="/app/subjects" className="text-xs underline mt-2 inline-block text-[#9AA4B8]">
          Back to Subjects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-3xl border border-[#323B4E] bg-[#11151F] p-6 sm:p-10 space-y-4 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-[#687286]">{subject.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F8FC]">{subject.title}</h1>
        <p className="text-sm text-[#9AA4B8] max-w-2xl leading-relaxed">{subject.description}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#F7F8FC]">Curriculum Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c) => {
            const courseId = c.id || (c as unknown as { _id?: string })._id || 'course';
            return (
              <div key={courseId} className="rounded-2xl border border-[#323B4E] bg-[#11151F] p-6 space-y-4 hover:shadow-md hover:border-[#FF6B61] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#1A2030] px-2 py-1 text-[10px] font-bold text-[#9AA4B8] uppercase tracking-wider">
                    {c.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-[#FF6B61]">
                    <Zap className="h-4 w-4 fill-[#FF6B61]" />
                    <span>+{c.totalXp} XP</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-[#F7F8FC]">{c.title}</h4>
                <p className="text-sm text-[#9AA4B8] leading-relaxed line-clamp-2">{c.description}</p>

                <div className="border-t border-[#1A2030] pt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#9AA4B8]">{c.modules?.length || 0} Modules</span>
                  <Link
                    to={`/app/learning/${courseId}`}
                    className="flex items-center gap-1 text-sm font-bold text-[#FF6B61] hover:text-[#FF6B61] transition-all duration-300"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};