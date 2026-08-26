import React, { useState } from 'react';
import { QuizQuestion, QuizResponse, TeachBackAssessmentResult } from '../../types';
import { motion } from 'motion/react';
import {
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  Mic,
  Send,
  Sparkles,
  Award,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';

export const ParaWiseQuestionView: React.FC<{
  passage: string;
  passageTitle: string;
  questions: QuizQuestion[];
  onComplete: (responses: QuizResponse[]) => void;
}> = ({ passage, passageTitle, questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const currentQ = questions[currentIdx];

  const handleAnswer = (resp: QuizResponse) => {
    const updated = [...responses, resp];
    setResponses(updated);
    if (currentIdx + 1 < questions.length) {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 1000);
    } else {
      setTimeout(() => onComplete(updated), 1200);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
      {/* Passage / Document Sidebar */}
      <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 space-y-3 h-fit">
        <div className="flex items-center gap-2 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
          <FileText className="h-4 w-4" />
          <span>Case Document / Real World Context</span>
        </div>
        <h4 className="text-base font-bold text-[#0F172A]">{passageTitle}</h4>
        <div className="prose prose-invert text-xs text-slate-600 leading-relaxed max-h-[420px] overflow-y-auto pr-2 space-y-3">
          <p>{passage}</p>
        </div>
      </div>

      {/* Sub-Questions Container */}
      <div className="lg:col-span-7">
        {currentQ && (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-3">
              <span className="font-mono text-[#0F766E] font-bold">Passage Question {currentIdx + 1} of {questions.length}</span>
              <span className="flex items-center gap-1 bg-teal-500 font-bold"><Zap className="h-3 w-3 fill-[#0F766E]" /> +{currentQ.xpValue} XP</span>
            </div>

            <h3 className="text-base font-bold text-[#0F172A] leading-snug">{currentQ.prompt}</h3>

            <div className="space-y-2.5 pt-2">
              {currentQ.options?.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer({
                    questionId: currentQ.id,
                    selectedOptionId: opt.id,
                    isCorrect: opt.isCorrect,
                    timeSpentSeconds: 15,
                    scoreAwarded: opt.isCorrect ? currentQ.xpValue : 0,
                  })}
                  className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-700 hover:border-[#0F766E] hover:bg-slate-50 transition"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AssessmentResultSummary: React.FC<{
  title: string;
  totalScore: number;
  maxScore: number;
  xpEarned: number;
  correctCount: number;
  totalQuestions: number;
  onRetry?: () => void;
  onContinue?: () => void;
}> = ({
  title,
  totalScore,
  maxScore,
  xpEarned,
  correctCount,
  totalQuestions,
  onRetry,
  onContinue,
}) => {
  const percentage = Math.round((totalScore / (maxScore || 1)) * 100);
  const isPassed = percentage >= 70;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-2xl space-y-6"
    >
      <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border ${
        isPassed
          ? 'border-teal-50 bg-teal-50 text-[#0F766E] shadow-xl shadow-teal-50'
          : 'border-teal-600/50 bg-teal-600/20 text-teal-400'
      }`}>
        {isPassed ? <Award className="h-10 w-10" /> : <AlertTriangle className="h-10 w-10" />}
      </div>

      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2"
          style={{
            borderColor: isPassed ? 'rgba(163,230,53,0.3)' : 'rgba(245,158,11,0.3)',
            backgroundColor: isPassed ? 'rgba(163,230,53,0.1)' : 'rgba(245,158,11,0.1)',
            color: isPassed ? '#a3e635' : '#f59e0b',
          }}
        >
          {isPassed ? 'Assessment Mastered' : 'Needs Reinforcement'}
        </div>
        <h2 className="text-2xl font-extrabold text-[#0F172A]">{title}</h2>
        <p className="text-xs text-slate-600 mt-1">
          {isPassed
            ? 'Excellent! Your mental models show strong conceptual fidelity and actionable transfer.'
            : 'Good effort. Review key takeaways to solidify your understanding.'}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
        <div>
          <span className="text-[10px] font-bold text-slate-600 uppercase">Accuracy</span>
          <div className="text-lg font-bold text-[#0F172A] font-mono">{percentage}%</div>
          <span className="text-[10px] text-slate-600">{correctCount}/{totalQuestions} correct</span>
        </div>
        <div className="border-x border-slate-200">
          <span className="text-[10px] font-bold text-slate-600 uppercase">XP Awarded</span>
          <div className="text-lg font-bold text-[#0F766E] font-mono flex items-center justify-center gap-1">
            <Zap className="h-4 w-4 fill-[#0F766E]" />
            <span>+{xpEarned}</span>
          </div>
          <span className="text-[10px] text-slate-600">Total Reward</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-600 uppercase">Mastery Boost</span>
          <div className="text-lg font-bold text-[#0F766E] font-mono">+12%</div>
          <span className="text-[10px] text-slate-600">Node progress</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#0F172A] transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retry Assessment</span>
          </button>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="flex items-center gap-2 rounded-xl bg-[#0F766E] px-6 py-2.5 text-xs font-bold text-white hover:bg-teal-500 transition shadow-lg shadow-[#0F766E]/20"
          >
            <span>Proceed to Dashboard</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
