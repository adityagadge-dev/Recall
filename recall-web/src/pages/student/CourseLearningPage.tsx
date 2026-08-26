import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseApi } from '../../services/courseApi';
import { Course, Module, Lesson } from '../../types';
import { LessonReader } from '../../components/learning/LessonReader';
import { QuestionCard } from '../../components/quiz/QuestionCard';
import { AssessmentResultSummary } from '../../components/quiz/ParaWiseQuestionView';
import { SpinWheel } from '../../components/gamification/SpinWheel';
import { BookOpen, CheckCircle2, ChevronRight, Play, Lock, Zap } from 'lucide-react';

export const CourseLearningPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const id = courseId || 'crs_finance_foundations';
        const res = await CourseApi.getCourseById(id);
        if (res.data) {
          const courseData = res.data;
          // DIAGNOSTIC CHECK
          const diagnosticStatus = localStorage.getItem(`diagnostic_completed_${courseData.subjectId}`);
          if (!diagnosticStatus) {
            navigate(`/app/diagnostic/${courseData.subjectId}?returnTo=/app/learning/${id}`);
            return;
          }

          setCourse(courseData);
          const firstMod = courseData.modules[0];
          setActiveModule(firstMod);
          setActiveLesson(firstMod.lessons[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId, navigate]);

  if (loading || !course || !activeModule || !activeLesson) {
    return <div className="p-8 text-center text-slate-600">Loading learning environment...</div>;
  }

  const handleCompleteLesson = () => {
    // Navigate to next lesson or quiz
    console.log('Lesson completed');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
      {/* Lesson Reader Area */}
      <div className="lg:col-span-8">
        <LessonReader
          course={course}
          module={activeModule}
          lesson={activeLesson}
          onComplete={handleCompleteLesson}
        />
      </div>

      {/* Course Curriculum Outline Sidebar */}
      <div className="lg:col-span-4 space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4 sticky top-20">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Module Outline</span>
            <span className="text-[11px] font-mono text-[#0F766E] font-bold">{course.modules.length} Modules</span>
          </div>

          <div className="space-y-4">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-50 text-[10px] font-mono text-[#0F766E] border border-slate-200">
                    {modIdx + 1}
                  </span>
                  <span className="truncate">{mod.title}</span>
                </div>

                <div className="space-y-1 pl-4 border-l border-slate-200">
                  {mod.lessons.map((les) => {
                    const isActive = les.id === activeLesson.id;
                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveModule(mod);
                          setActiveLesson(les);
                        }}
                        className={`w-full text-left rounded-xl px-3 py-2 text-xs transition flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-teal-50 bg-teal-500 font-bold border border-teal-50'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]'
                        }`}
                      >
                        <span className="truncate">{les.title}</span>
                        {isActive && <Play className="h-3 w-3 text-[#0F766E] shrink-0 fill-[#0F766E]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => navigate('/app/quiz/quiz_fin_01')}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-teal-50 bg-teal-50 py-2.5 text-xs font-bold bg-teal-500 hover:bg-teal-50 transition"
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
    // Load mock quiz
    import('../../mock/mockData').then(({ MOCK_QUIZZES }) => {
      const found = MOCK_QUIZZES[0];
      setQuiz(found);
    });
  }, [quizId]);

  if (!quiz) return <div className="p-8 text-center text-slate-600">Loading Diagnostic Quiz...</div>;

  const currentQ = quiz.questions[currentQuestionIdx];

  const handleAnswerSubmit = (resp: any) => {
    const nextResponses = [...responses, resp];
    setResponses(nextResponses);

    if (currentQuestionIdx + 1 < quiz.questions.length) {
      setTimeout(() => {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
      }, 1200);
    } else {
      setTimeout(() => {
        setIsFinished(true);
      }, 1200);
    }
  };

  return (
    <div className="py-6 space-y-6">
      {!isFinished ? (
        <div>
          <QuestionCard
            question={currentQ}
            currentIndex={currentQuestionIdx}
            totalQuestions={quiz.questions.length}
            onAnswerSubmit={handleAnswerSubmit}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <AssessmentResultSummary
            title={quiz.title}
            totalScore={responses.filter(r => r.isCorrect).length * 40}
            maxScore={quiz.questions.length * 40}
            xpEarned={quiz.xpReward}
            correctCount={responses.filter(r => r.isCorrect).length}
            totalQuestions={quiz.questions.length}
            onRetry={() => {
              setCurrentQuestionIdx(0);
              setResponses([]);
              setIsFinished(false);
            }}
            onContinue={() => navigate('/app')}
          />
        </div>
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
