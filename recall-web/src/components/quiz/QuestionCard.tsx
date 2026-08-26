import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuestionOption, QuizResponse } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, HelpCircle, Clock, Lightbulb, ArrowRight, Zap } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSubmit: (response: QuizResponse) => void;
  showInstantFeedback?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSubmit,
  showInstantFeedback = true,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [shortAnswerText, setShortAnswerText] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(question.timeLimitSeconds || 60);

  useEffect(() => {
    setSelectedOptionId(null);
    setShortAnswerText('');
    setSubmitted(false);
    setShowHint(false);
    setTimeLeft(question.timeLimitSeconds || 60);
  }, [question.id]);

  const handleSelectOption = (optId: string) => {
    if (submitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmit = () => {
    if (submitted) return;
    if (!selectedOptionId && !shortAnswerText.trim()) return;

    setSubmitted(true);
    const chosenOpt = question.options?.find(o => o.id === selectedOptionId);
    const isCorrect = chosenOpt?.isCorrect ?? true;

    onAnswerSubmit({
      questionId: question.id,
      selectedOptionId: selectedOptionId || undefined,
      textAnswer: shortAnswerText || undefined,
      timeSpentSeconds: (question.timeLimitSeconds || 60) - timeLeft,
      isCorrect,
      scoreAwarded: isCorrect ? question.xpValue : 0,
    });
  };

  const selectedOpt = question.options?.find(o => o.id === selectedOptionId);

  return (
    <div id={`question-card-${question.id}`} className="w-full max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
      {/* Progress Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-mono font-bold text-[#0F766E] border border-teal-50">
            Q{currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-xs font-semibold text-slate-600 capitalize">
            {question.type.replace('_', ' ')} • {question.competency}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {question.timeLimitSeconds && (
            <div className="flex items-center gap-1.5 font-mono text-xs text-teal-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs font-bold text-[#0F766E]">
            <Zap className="h-3.5 w-3.5 fill-[#0F766E]" />
            <span>+{question.xpValue} XP</span>
          </div>
        </div>
      </div>

      {/* Scenario context if available */}
      {question.scenarioContext && (
        <div className="mb-4 rounded-xl border border-teal-50 bg-cyan-950/20 p-4 text-xs text-cyan-200 leading-relaxed">
          <strong className="bg-teal-500 block mb-1 font-mono uppercase text-[10px]">Scenario Context:</strong>
          {question.scenarioContext}
        </div>
      )}

      {/* Question Prompt */}
      <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-6 leading-snug">
        {question.prompt}
      </h3>

      {/* Answer Options (MCQ / True False / Scenario) */}
      {question.options && question.options.length > 0 && (
        <div className="space-y-3 mb-6">
          {question.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let optStyle = 'border-slate-200 bg-slate-50 hover:border-slate-600 hover:bg-slate-50 text-slate-700';

            if (isSelected && !submitted) {
              optStyle = 'border-[#0F766E] bg-lime-950/30 text-[#0F172A] ring-1 ring-[#0F766E]';
            }

            if (submitted) {
              if (opt.isCorrect) {
                optStyle = 'border-teal-50 bg-lime-950/40 text-lime-200 ring-1 ring-[#0F766E]';
              } else if (isSelected && !opt.isCorrect) {
                optStyle = 'border-red-500/60 bg-red-950/40 text-red-200 ring-1 ring-red-400';
              } else {
                optStyle = 'border-slate-200 bg-white opacity-50 text-slate-600';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={submitted}
                className={`w-full text-left rounded-2xl border p-4 text-xs sm:text-sm font-medium transition flex items-start justify-between gap-3 ${optStyle}`}
              >
                <span>{opt.text}</span>
                {submitted && opt.isCorrect && (
                  <CheckCircle2 className="h-4 w-4 text-[#0F766E] shrink-0 mt-0.5" />
                )}
                {submitted && isSelected && !opt.isCorrect && (
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Short Answer text area if type is short_answer */}
      {question.type === 'short_answer' && (
        <div className="mb-6">
          <textarea
            rows={3}
            value={shortAnswerText}
            onChange={(e) => setShortAnswerText(e.target.value)}
            disabled={submitted}
            placeholder="Type your structured explanation or response..."
            className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-700 placeholder-slate-500 focus:border-[#0F766E] focus:outline-none"
          />
        </div>
      )}

      {/* Instant Feedback Panel */}
      {submitted && showInstantFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border p-4 mb-6 ${
            selectedOpt?.isCorrect
              ? 'border-teal-50 bg-lime-950/20 text-lime-200'
              : 'border-red-500/40 bg-red-950/20 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase mb-1">
            {selectedOpt?.isCorrect ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#0F766E]" />
                <span>Correct • High Precision</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-400" />
                <span>Incorrect • Review Explanation</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mt-1">{question.explanation}</p>
        </motion.div>
      )}

      {/* Controls / Hint / Submit */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
        <div>
          {question.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-teal-300 transition"
            >
              <Lightbulb className="h-3.5 w-3.5 text-teal-400" />
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>
          )}
          {showHint && question.hint && (
            <p className="text-[11px] text-teal-300/80 mt-1 max-w-sm">{question.hint}</p>
          )}
        </div>

        <div>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOptionId && !shortAnswerText.trim()}
              className="flex items-center gap-2 rounded-xl bg-[#0F766E] px-6 py-2.5 text-xs font-bold text-white hover:bg-teal-500 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#0F766E]/20"
            >
              <span>Submit Answer</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <span className="text-xs font-mono text-slate-600">Response Recorded</span>
          )}
        </div>
      </div>
    </div>
  );
};
