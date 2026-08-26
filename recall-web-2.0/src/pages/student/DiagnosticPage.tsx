import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { DIAGNOSTIC_QUESTIONS, DiagnosticQuestion } from '../../data/diagnosticQuestions';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Code, Copy, Check } from 'lucide-react';

interface QuizResponse {
  question_id: string;
  topic: string;
  question_text: string;
  selected_option: string;
  correct_option: string;
  is_correct: boolean;
  difficulty_tag: "beginner" | "intermediate" | "advanced";
}

interface DiagnosticResultJSON {
  user_id: string;
  subject_id: string;
  subject_name: string;
  score: number;
  total_questions: number;
  quiz_responses: QuizResponse[];
}

export const DiagnosticPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/app';
  const navigate = useNavigate();
  const { user } = useAuth();

  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [resultJSON, setResultJSON] = useState<DiagnosticResultJSON | null>(null);
  const [showJSONPreview, setShowJSONPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);

  useEffect(() => {
    const subjectQuestions = DIAGNOSTIC_QUESTIONS.filter(q => q.subject_id === subjectId);
    if (subjectQuestions.length === 0) {
      // If no diagnostic questions found, skip diagnostic
      navigate(returnTo, { replace: true });
    } else {
      setQuestions(subjectQuestions);
    }
  }, [subjectId, navigate, returnTo]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const subjectName = questions[0].subject_name;

  const handleStart = () => setStage('quiz');

  const handleSelectOption = (option: string) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.question_id]: option
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Submit
      submitDiagnostic();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const submitDiagnostic = async () => {
    const quiz_responses: QuizResponse[] = questions.map(q => {
      const selected = responses[q.question_id] || '';
      return {
        question_id: q.question_id,
        topic: q.topic,
        question_text: q.question_text,
        selected_option: selected,
        correct_option: q.correct_option,
        is_correct: selected === q.correct_option,
        difficulty_tag: q.difficulty_tag,
      };
    });

    const score = quiz_responses.filter(r => r.is_correct).length;

    const payload: DiagnosticResultJSON = {
      user_id: user?.id || 'mock_user_123',
      subject_id: subjectId!,
      subject_name: subjectName,
      score,
      total_questions: questions.length,
      quiz_responses,
    };

    setResultJSON(payload);
    setIsAnalyzing(true);
    setStage('result');

    try {
      // 🚀 Send JSON directly to your Flask server!
      const res = await fetch('http://localhost:5000/api/agent/evaluate-and-teach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setAiResponse(data.data);
      }
    } catch (error) {
      console.error('Error connecting to Flask backend:', error);
    } finally {
      setIsAnalyzing(false);
      localStorage.setItem(`diagnostic_completed_${subjectId}`, 'true');
    }
  };

  const handleCopyJSON = () => {
    if (resultJSON) {
      navigator.clipboard.writeText(JSON.stringify(resultJSON, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F0FDFA] flex flex-col font-sans relative">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <AnimatePresence mode="wait">
          
          {/* INTRO STAGE */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-teal-100">
                <ShieldCheck className="h-8 w-8 text-teal-600" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2 block">
                {subjectName}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-3">
                Let's understand your level first.
              </h1>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                Answer 5 quick questions so Recall can tailor your learning experience. There are no penalties, so answer honestly to help us personalize the course just for you.
              </p>
              <button
                onClick={handleStart}
                className="w-full bg-[#0F766E] hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-sm hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Start Diagnostic
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* QUIZ STAGE */}
          {stage === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl w-full"
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    {subjectName} <span className="mx-2 text-slate-300">•</span> 5-question diagnostic
                  </h2>
                  <span className="text-sm font-bold text-[#0F766E]">
                    {currentIndex + 1} / {questions.length}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="bg-[#0F766E] h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 mb-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-8 leading-snug">
                  {currentQuestion.question_text}
                </h3>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = responses[currentQuestion.question_id] === option;
                    const letter = String.fromCharCode(65 + idx); // A, B, C, D
                    return (
                      <button
                        key={option}
                        onClick={() => handleSelectOption(option)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 active:scale-[0.99] hover:-translate-y-0.5 flex items-center gap-4 group ${
                          isSelected
                            ? 'border-[#0F766E] bg-[#F0FDFA]'
                            : 'border-slate-100 bg-white hover:border-teal-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold text-sm shrink-0 transition-colors ${
                          isSelected ? 'bg-[#0F766E] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-700'
                        }`}>
                          {letter}
                        </div>
                        <span className={`text-sm font-medium ${isSelected ? 'text-[#0F172A]' : 'text-slate-600'}`}>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition ${
                    currentIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-500 hover:bg-slate-200 hover:text-[#0F172A]'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                
                {currentIndex === questions.length - 1 ? (
                  <button
                    onClick={() => {
                      if (window.confirm("You've answered all 5 questions. Submit your diagnostic?")) {
                        handleNext();
                      }
                    }}
                    disabled={!responses[currentQuestion.question_id]}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition shadow-sm ${
                      !responses[currentQuestion.question_id]
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-[#0F766E] text-white hover:bg-teal-700 hover:-translate-y-0.5'
                    }`}
                  >
                    Submit Diagnostic
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!responses[currentQuestion.question_id]}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition shadow-sm ${
                      !responses[currentQuestion.question_id]
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-[#0F766E] text-white hover:bg-teal-700 hover:-translate-y-0.5'
                    }`}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* RESULT STAGE */}
          {stage === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F766E]" />
              
              {isAnalyzing ? (
                <div className="py-12 space-y-4">
                  <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <h2 className="text-lg font-bold text-[#0F172A]">AI Agent Evaluation in Progress...</h2>
                  <p className="text-xs text-slate-500">Analyzing responses and building your skill level profile.</p>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                    <CheckCircle2 className="h-10 w-10 text-teal-600" />
                  </div>
                  
                  <h1 className="text-2xl font-extrabold text-[#0F172A] mb-1">
                    Diagnostic Complete
                  </h1>

                  {aiResponse?.assessment?.level && (
                    <div className="mt-2 inline-block bg-teal-100 text-[#0F766E] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      Assessed Level: {aiResponse.assessment.level}
                    </div>
                  )}
                  
                  <div className="my-6 py-6 border-y border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Score</p>
                    <div className="text-4xl font-extrabold text-[#0F766E]">
                      {resultJSON?.score} <span className="text-slate-300 text-2xl">/ 5</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-8 text-sm font-medium">
                    Your baseline level has been stored.
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate(returnTo)}
                      className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-sm hover:-translate-y-0.5"
                    >
                      Continue to Course
                    </button>
                    
                    <button
                      onClick={() => setShowJSONPreview(true)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3.5 px-6 rounded-2xl transition border border-slate-200 text-xs"
                    >
                      <Code className="h-4 w-4" />
                      View Diagnostic JSON (Developer)
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* JSON PREVIEW MODAL */}
      <AnimatePresence>
        {showJSONPreview && resultJSON && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                  <Code className="h-4 w-4" />
                  JSON Payload Output
                </div>
                <button
                  onClick={() => setShowJSONPreview(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-200 transition"
                >
                  Close
                </button>
              </div>
              
              <div className="flex-1 overflow-auto p-4 bg-slate-900">
                <pre className="text-[11px] sm:text-xs font-mono text-teal-300 leading-relaxed">
                  {JSON.stringify(resultJSON, null, 2)}
                </pre>
              </div>
              
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={handleCopyJSON}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-teal-300 text-slate-700 font-bold py-2.5 px-4 rounded-xl transition shadow-sm"
                >
                  {copied ? <Check className="h-4 w-4 text-teal-600" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied to Clipboard' : 'Copy JSON'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};