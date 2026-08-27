import React, { useState } from 'react';
import { Lesson, Module, Course } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  CheckCircle2,
  Bookmark,
  FileEdit,
  Sparkles,
  Zap,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Bot,
  Sliders,
  RotateCcw,
  Check,
} from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';

interface LessonReaderProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  onComplete: () => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

export const LessonReader: React.FC<LessonReaderProps> = ({
  course,
  module,
  lesson,
  onComplete,
  onNextLesson,
  onPrevLesson,
}) => {
  const { addXp, triggerLevelUpConfetti } = useGamification();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Simulated Learning Agent State
  const [aiState, setAiState] = useState<'idle' | 'personalizing' | 'adapting_difficulty' | 'generating_examples'>('idle');
  const [adaptedDifficulty, setAdaptedDifficulty] = useState<'standard' | 'simplified' | 'advanced'>('standard');

  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleCompleteLesson = () => {
    if (isCompleted) return;
    setIsCompleted(true);
    addXp(lesson?.xpReward || 50, `Completed Lesson: ${lesson?.title || 'Lesson'}`);
    triggerLevelUpConfetti();
    onComplete();
  };

  const triggerAiPersonalization = (type: 'personalizing' | 'adapting_difficulty' | 'generating_examples') => {
    setAiState(type);
    setTimeout(() => {
      setAiState('idle');
      if (type === 'adapting_difficulty') {
        setAdaptedDifficulty(prev => (prev === 'standard' ? 'advanced' : 'standard'));
      }
    }, 2200);
  };

  // Safe extractors for string vs object content structures
  const contentObj = typeof lesson?.content === 'object' && lesson?.content !== null ? lesson.content : null;
  const rawContentString = typeof lesson?.content === 'string' ? lesson.content : '';

  const introduction = contentObj?.introduction || rawContentString || 'Welcome to this foundational lesson.';
  const keyConcept = contentObj?.keyConcept || 'Core principles and mental models.';
  const realWorldScenario = contentObj?.realWorldScenario || 'Practical application of this concept in real-world environments.';
  const actionableTakeaways = contentObj?.actionableTakeaways || [];
  const commonPitfalls = contentObj?.commonPitfalls || [];
  const supportingResources = lesson?.supportingResources || [];

  return (
    <div id="lesson-reader-container" className="max-w-4xl mx-auto space-y-6">
      {/* Course and Module Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#323B4E] pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#0F766E] uppercase">{course?.title || 'Course'}</span>
          <h2 className="text-sm font-semibold text-[#9AA4B8] mt-0.5">{module?.title || 'Module'}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="bookmark-btn"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
              isBookmarked
                ? 'border-teal-50 bg-teal-50 bg-teal-500'
                : 'border-[#323B4E] bg-[#0D1017] text-[#9AA4B8] hover:text-[#F7F8FC]'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-[#0F766E]' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            id="notes-toggle-btn"
            onClick={() => setNotesOpen(!notesOpen)}
            className="flex items-center gap-1.5 rounded-xl border border-[#323B4E] bg-[#0D1017] px-3 py-1.5 text-xs font-medium text-[#9AA4B8] hover:text-[#F7F8FC] transition"
          >
            <FileEdit className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>Notes</span>
          </button>
        </div>
      </div>

      {/* Future Learning Agent Simulation Control Card */}
      <div className="rounded-2xl border border-teal-50 bg-gradient-to-r from-cyan-950/20 to-transparent p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] border border-teal-50">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#F7F8FC]">Google ADK Learning Agent</span>
                <span className="rounded bg-teal-50 px-1.5 py-0.2 text-[9px] font-mono font-semibold bg-teal-500">
                  {adaptedDifficulty.toUpperCase()} TIER
                </span>
              </div>
              <p className="text-[11px] text-[#9AA4B8]">Personalized on Creator-verified research grounding</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => triggerAiPersonalization('adapting_difficulty')}
              disabled={aiState !== 'idle'}
              className="flex items-center gap-1.5 rounded-lg border border-teal-50 bg-[#0D1017] px-2.5 py-1 text-[11px] font-semibold bg-teal-500 hover:bg-teal-50 transition disabled:opacity-50"
            >
              <Sliders className="h-3 w-3" />
              <span>Adapt Difficulty</span>
            </button>
            <button
              onClick={() => triggerAiPersonalization('generating_examples')}
              disabled={aiState !== 'idle'}
              className="flex items-center gap-1.5 rounded-lg border border-[#323B4E] bg-[#0D1017] px-2.5 py-1 text-[11px] font-semibold text-[#9AA4B8] hover:text-[#F7F8FC] transition disabled:opacity-50"
            >
              <Sparkles className="h-3 w-3 text-[#0F766E]" />
              <span>Dynamic Examples</span>
            </button>
          </div>
        </div>

        {/* Dynamic AI Loading State Banner */}
        <AnimatePresence>
          {aiState !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-teal-50 flex items-center gap-2.5 text-xs bg-teal-500 font-mono"
            >
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0F766E] border-t-transparent" />
              <span>
                {aiState === 'adapting_difficulty' && 'Learning Agent adjusting explanation depth & cognitive load...'}
                {aiState === 'generating_examples' && 'Synthesizing contextual analogies grounded in Creator research...'}
                {aiState === 'personalizing' && 'Personalizing lesson narrative for your knowledge gaps...'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lesson Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#9AA4B8]">
          <span>{lesson?.durationMinutes || '10'} MIN READ</span>
          <span>•</span>
          <span className="text-[#0F766E] font-bold">+{lesson?.xpReward || 50} XP REWARD</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F8FC] tracking-tight">{lesson?.title || 'Lesson Title'}</h1>
        {lesson?.subtitle && <p className="text-sm text-[#9AA4B8] mt-1">{lesson.subtitle}</p>}
      </div>

      {/* Notes Drawer (Expandable) */}
      {notesOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[#323B4E] bg-[#0D1017] p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F8FC]">Your Personal Notes</h4>
            <span className="text-[10px] text-[#9AA4B8]">Auto-synced with learning profile</span>
          </div>
          <textarea
            rows={3}
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="Jot down personal takeaways, formulas, or key reminders..."
            className="w-full rounded-xl border border-[#323B4E] bg-[#11151F] p-3 text-xs text-[#F7F8FC] placeholder-slate-500 focus:border-[#0F766E] focus:outline-none resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSaveNote}
              className="flex items-center gap-1.5 rounded-lg bg-[#0F766E] px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-500 transition"
            >
              {noteSaved ? <Check className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
              <span>{noteSaved ? 'Saved!' : 'Save Note'}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Core Lesson Content Blocks */}
      <div className="space-y-6 text-[#F7F8FC] leading-relaxed">
        {/* Introduction */}
        <div className="rounded-2xl border border-[#323B4E] bg-[#0D1017] p-5 sm:p-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#9AA4B8]">1. Conceptual Primer</h3>
          <p className="text-sm sm:text-base leading-relaxed text-[#9AA4B8]">
            {introduction}
          </p>
        </div>

        {/* Key Mechanism Block */}
        <div className="rounded-2xl border border-teal-50 bg-[#0D1017] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="h-4 w-4" />
            <span>Core Mathematical / Cognitive Mechanism</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-[#F7F8FC] leading-relaxed">
            {keyConcept}
          </p>
        </div>

        {/* Interactive Breakdown Simulator */}
        {contentObj?.interactiveExample && (
          <div className="rounded-2xl border border-[#323B4E] bg-[#11151F] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#F7F8FC]">{contentObj.interactiveExample.title}</h4>
              <span className="text-[10px] font-mono text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-50">
                Interactive Model
              </span>
            </div>
            <p className="text-xs text-[#9AA4B8]">{contentObj.interactiveExample.context}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {contentObj.interactiveExample.breakdown?.map((item: any, idx: number) => (
                <div key={idx} className="rounded-xl border border-[#323B4E] bg-[#0D1017] p-3.5 space-y-1">
                  <span className="text-[11px] font-bold text-[#9AA4B8] uppercase">{item.label}</span>
                  <div className="text-base font-extrabold font-mono bg-teal-500">{item.value}</div>
                  <p className="text-[11px] text-[#9AA4B8] leading-snug">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Real World Scenario */}
        <div className="rounded-2xl border border-[#323B4E] bg-[#0D1017] p-5 sm:p-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F766E]">2. Real-World Field Scenario</h3>
          <p className="text-sm leading-relaxed text-[#9AA4B8]">
            {realWorldScenario}
          </p>
        </div>

        {/* Actionable Takeaways */}
        {actionableTakeaways.length > 0 && (
          <div className="rounded-2xl border border-[#323B4E] bg-[#0D1017] p-5 sm:p-6 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F766E]">3. Actionable Tactical Protocols</h3>
            <ul className="space-y-2">
              {actionableTakeaways.map((takeaway: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9AA4B8]">
                  <CheckCircle2 className="h-4 w-4 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Common Pitfalls */}
        {commonPitfalls.length > 0 && (
          <div className="rounded-2xl border border-teal-600/25 bg-amber-950/10 p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4" />
              <span>Common Cognitive Pitfalls to Avoid</span>
            </div>
            <ul className="space-y-2">
              {commonPitfalls.map((pitfall: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9AA4B8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0 mt-2" />
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Grounded Research Attribution */}
        {supportingResources.length > 0 && (
          <div className="rounded-xl border border-[#323B4E] bg-[#11151F] p-4 text-xs space-y-2">
            <span className="font-bold uppercase tracking-wider text-[#9AA4B8] text-[10px]">Verified Knowledge Grounding:</span>
            {supportingResources.map((res: any, i: number) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-[#0F766E] hover:bg-teal-500 transition"
              >
                <span className="truncate">{res.title}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 ml-2" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Completion & Next Step Gateway */}
      <div className="rounded-2xl border border-teal-50 bg-[#0D1017] p-6 text-center space-y-4">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E] border border-teal-50 mb-2">
            <Zap className="h-6 w-6 fill-[#0F766E]" />
          </div>
          <h3 className="text-lg font-bold text-[#F7F8FC]">Lesson Completed?</h3>
          <p className="text-xs text-[#9AA4B8] max-w-md">
            Claim your XP reward and proceed to test your understanding via Quiz, Teach-Back, or Spin & Teach.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            id="complete-lesson-btn"
            onClick={handleCompleteLesson}
            disabled={isCompleted}
            className="flex items-center gap-2 rounded-xl bg-[#0F766E] px-6 py-3 text-xs font-extrabold text-white shadow-lg shadow-[#0F766E]/20 hover:bg-teal-500 transition active:scale-95 disabled:opacity-60"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isCompleted ? 'Completed (+60 XP Claimed)' : 'Mark Complete & Claim XP'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};