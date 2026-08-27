import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseApi } from '../../services/courseApi';
import { Course, Module, Lesson } from '../../types';
import { LessonReader } from '../../components/learning/LessonReader';
import { QuestionCard } from '../../components/quiz/QuestionCard';
import { AssessmentResultSummary } from '../../components/quiz/ParaWiseQuestionView';
import { SpinWheel } from '../../components/gamification/SpinWheel';
import { Play, Zap } from 'lucide-react';

export const CourseLearningPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  function createFallbackCourse(idParam: string): Course {
    const formattedTitle = idParam
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      id: idParam,
      title: formattedTitle.length > 2 ? formattedTitle : 'Foundations Course',
      description: 'Master core principles and practical applications.',
      subjectId: 'subj_finance',
      totalXp: 500,
      difficulty: 'Beginner',
      modules: [
        {
          id: 'mod_1',
          title: 'Module 1: Core Fundamentals',
          lessons: [
            {
              id: 'les_1',
              title: '1. Introduction & Basic Mental Models',
              content: 'Welcome to this foundational lesson. Learn core mechanics and terminology.',
              duration: '10 mins',
            },
            {
              id: 'les_2',
              title: '2. Practical Frameworks & Use Cases',
              content: 'Explore real-world applications and step-by-step methodologies.',
              duration: '15 mins',
            },
          ],
        },
      ],
    } as unknown as Course;
  }

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const id = courseId || 'crs_finance_foundations';
      let courseData: Course | null = null;

      try {
        setLoading(true);
        const res = await CourseApi.getCourseById(id).catch(() => null);
        if (res) {
          courseData = (res.data || res) as Course;
        }
      } catch (err) {
        console.warn('API error:', err);
      }

      if (!courseData || !courseData.modules || courseData.modules.length === 0) {
        courseData = createFallbackCourse(id);
      }

      if (isMounted) {
        const firstMod = courseData.modules?.[0] || null;
        const firstLes = firstMod?.lessons?.[0] || null;

        setCourse(courseData);
        setActiveModule(firstMod);
        setActiveLesson(firstLes);
        setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  if (loading) {
    return <div className="p-8 text-center text-[#9AA4B8]">Loading learning environment...</div>;
  }

  const safeCourse = course || createFallbackCourse(courseId || 'financial-literacy-foundations');
  const safeModule = activeModule || safeCourse.modules[0];
  const safeLesson = activeLesson || safeModule.lessons[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
      {/* Lesson Reader Container with Runtime Fallback */}
      <div className="lg:col-span-8">
        {safeCourse && safeModule && safeLesson ? (
          <LessonReader
            course={safeCourse}
            module={safeModule}
            lesson={safeLesson}
            onComplete={() => console.log('Lesson completed')}
          />
        ) : (
          <div className="rounded-2xl border border-[#323B4E] bg-[#11151F] p-6 text-center text-[#9AA4B8]">
            Unable to render lesson reader for this course ID.
          </div>
        )}
      </div>

      {/* Course Curriculum Outline Sidebar */}
      <div className="lg:col-span-4 space-y-4">
        <div className="rounded-3xl border border-[#323B4E] bg-[#11151F] p-5 space-y-4 sticky top-20">
          <div className="flex items-center justify-between border-b border-[#323B4E] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9AA4B8]">Module Outline</span>
            <span className="text-[11px] font-mono text-[#0F766E] font-bold">
              {safeCourse.modules?.length || 0} Modules
            </span>
          </div>

          <div className="space-y-4">
            {safeCourse.modules?.map((mod, modIdx) => (
              <div key={mod.id || modIdx} className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9AA4B8]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0D1017] text-[10px] font-mono text-[#0F766E] border border-[#323B4E]">
                    {modIdx + 1}
                  </span>
                  <span className="truncate">{mod.title}</span>
                </div>

                <div className="space-y-1 pl-4 border-l border-[#323B4E]">
                  {mod.lessons?.map((les) => {
                    const isActive = les.id === safeLesson?.id;
                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveModule(mod);
                          setActiveLesson(les);
                        }}
                        className={`w-full text-left rounded-xl px-3 py-2 text-xs transition flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-[#0F766E] font-bold text-white'
                            : 'text-[#9AA4B8] hover:bg-[#0D1017] hover:text-[#F7F8FC]'
                        }`}
                      >
                        <span className="truncate">{les.title}</span>
                        {isActive && <Play className="h-3 w-3 text-white shrink-0 fill-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#323B4E]">
            <button
              onClick={() => navigate('/app/quiz/quiz_fin_01')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] py-2.5 text-xs font-bold text-white hover:bg-[#115e59] transition"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Take Module Diagnostic Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    import('../../mock/mockData').then(({ MOCK_QUIZZES }) => {
      setQuiz(MOCK_QUIZZES[0]);
    });
  }, [quizId]);

  if (!quiz) return <div className="p-8 text-center text-[#9AA4B8]">Loading Diagnostic Quiz...</div>;

  const currentQ = quiz.questions[currentQuestionIdx];

  const handleAnswerSubmit = (resp: any) => {
    const nextResponses = [...responses, resp];
    setResponses(nextResponses);

    if (currentQuestionIdx + 1 < quiz.questions.length) {
      setTimeout(() => setCurrentQuestionIdx(currentQuestionIdx + 1), 1200);
    } else {
      setTimeout(() => setIsFinished(true), 1200);
    }
  };

  return (
    <div className="py-6 space-y-6">
      {!isFinished ? (
        <QuestionCard
          question={currentQ}
          currentIndex={currentQuestionIdx}
          totalQuestions={quiz.questions.length}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : (
        <AssessmentResultSummary
          title={quiz.title}
          totalScore={responses.filter((r) => r.isCorrect).length * 40}
          maxScore={quiz.questions.length * 40}
          xpEarned={quiz.xpReward}
          correctCount={responses.filter((r) => r.isCorrect).length}
          totalQuestions={quiz.questions.length}
          onRetry={() => {
            setCurrentQuestionIdx(0);
            setResponses([]);
            setIsFinished(false);
          }}
          onContinue={() => navigate('/app')}
        />
      )}
    </div>
  );
};

export const SpinTeachPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    import('../../mock/mockData').then(({ MOCK_SPIN_ITEMS }) => {
      setItems(MOCK_SPIN_ITEMS);
    });
  }, []);

  return (
    <div className="py-6 space-y-6">
      <SpinWheel items={items} />
    </div>
  );
};