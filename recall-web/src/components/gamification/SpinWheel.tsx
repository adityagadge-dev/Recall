import React, { useState } from 'react';
import { SpinWheelItem } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Sparkles, Mic, Send, CheckCircle2, Award, Zap, AlertCircle, RefreshCw } from 'lucide-react';
import { AssessmentApi } from '../../services/assessmentApi';
import { useGamification } from '../../context/GamificationContext';

interface SpinWheelProps {
  items: SpinWheelItem[];
  onFinish?: (xpEarned: number) => void;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({ items, onFinish }) => {
  const { addXp, triggerLevelUpConfetti } = useGamification();
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SpinWheelItem | null>(null);
  const [stage, setStage] = useState<'idle' | 'spinning' | 'revealed' | 'teach_back' | 'evaluating' | 'feedback'>('idle');
  const [explanationText, setExplanationText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [feedbackData, setFeedbackData] = useState<{
    score: number;
    xpEarned: number;
    strengths: string[];
    misconceptions: string[];
  } | null>(null);

  const numSlices = items.length || 6;
  const sliceAngle = 360 / numSlices;

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setStage('spinning');
    setSelectedItem(null);
    setFeedbackData(null);
    setExplanationText('');

    // Random target item index
    const randomIndex = Math.floor(Math.random() * numSlices);
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const centerAngle = randomIndex * sliceAngle + sliceAngle / 2;
    const targetMod = (270 - centerAngle + 360) % 360;
    const delta = (targetMod - (rotation % 360) + 360) % 360;
    const newRotation = rotation + delta + fullSpins * 360;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const picked = items[randomIndex];
      setSelectedItem(picked);
      setStage('revealed');
    }, 4000);
  };

  const handleStartTeachBack = () => {
    setStage('teach_back');
  };

  const handleSubmitExplanation = async () => {
    if (!selectedItem || !explanationText.trim()) return;
    setStage('evaluating');

    try {
      const res = await AssessmentApi.submitTeachBack(
        selectedItem.shortPrompt,
        selectedItem.subjectCategory,
        explanationText,
        isRecording
      );

      setTimeout(() => {
        setFeedbackData({
          score: res.data.score,
          xpEarned: res.data.xpEarned,
          strengths: res.data.strengthsObserved,
          misconceptions: res.data.misconceptionsDetected,
        });
        setStage('feedback');
        addXp(res.data.xpEarned, `Spin & Teach: ${selectedItem.conceptTitle}`);
        triggerLevelUpConfetti();
        if (onFinish) onFinish(res.data.xpEarned);
      }, 1800);
    } catch {
      setStage('feedback');
    }
  };

  return (
    <div id="spin-and-teach-container" className="w-full max-w-4xl mx-auto rounded-3xl border border-teal-100 bg-white p-6 sm:p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-700 mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>DAILY LEARNING CHALLENGE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Spin Spin & Teach Engine Teach</h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto mt-1">
          Spin the concept wheel, get a random real-world challenge, and explain it in your own words.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* The Wheel Visual */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 flex items-center justify-center group">
            {/* Pointer at Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="relative h-0 w-0 border-x-8 border-x-transparent border-t-[16px] border-t-teal-600 drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <div className="absolute -top-[14px] -left-[3px] h-[6px] w-[6px] rounded-full bg-white shadow-sm" />
              </div>
            </div>

            {/* Rotating SVG Wheel */}
            <motion.div
              className="relative h-full w-full rounded-full border-4 border-teal-100 shadow-xl overflow-hidden bg-teal-50 transition-transform duration-500 group-hover:scale-[1.02]"
              whileHover={isSpinning ? {} : { scale: 1.02 }}
              animate={isSpinning ? { rotate: rotation } : { rotate: rotation, y: [0, -3, 0] }}
              transition={isSpinning ? { duration: 4, ease: [0.15, 0.9, 0.25, 1.0] } : { y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {items.map((item, index) => {
                  const startAngle = (index * sliceAngle * Math.PI) / 180;
                  const endAngle = ((index + 1) * sliceAngle * Math.PI) / 180;
                  const x1 = 50 + 50 * Math.cos(startAngle);
                  const y1 = 50 + 50 * Math.sin(startAngle);
                  const x2 = 50 + 50 * Math.cos(endAngle);
                  const y2 = 50 + 50 * Math.sin(endAngle);

                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                  const midAngle = ((index + 0.5) * sliceAngle * Math.PI) / 180;
                  const textX = 50 + 32 * Math.cos(midAngle);
                  const textY = 50 + 32 * Math.sin(midAngle);

                  return (
                    <g key={item.id}>
                      <path
                        d={pathData}
                        fill={index % 2 === 0 ? '#F0FDFA' : '#CCFBF1'}
                        stroke="#99F6E4"
                        strokeWidth="0.8"
                      />
                      <circle cx={textX} cy={textY} r="3.5" fill={item.color} opacity="0.9" />
                    </g>
                  );
                })}
              </svg>
            </motion.div>

            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-200 bg-white shadow-md text-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700">RECALL</span>
            </div>
          </div>

          {/* Spin Trigger Button */}
          <div className="mt-6">
            <button
              id="spin-wheel-btn"
              onClick={handleSpin}
              disabled={isSpinning || stage === 'teach_back' || stage === 'evaluating'}
              className="flex items-center gap-2 rounded-2xl bg-teal-600 text-white shadow-md hover:bg-teal-700 transition hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCw className={`h-4 w-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'SPINNING WHEEL...' : 'SPIN THE WHEEL'}</span>
            </button>
          </div>
        </div>

        {/* Stage Content Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 min-h-[340px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {stage === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
                  <RotateCw className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-[#0F172A] mb-1">Ready for the Teach-Back Test?</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Hit Spin to land on a core concept. If you can explain it clearly without notes, you’ve mastered it.
                </p>
              </motion.div>
            )}

            {stage === 'spinning' && (
              <motion.div
                key="spinning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
                <h4 className="text-base font-bold text-[#0F172A]">Selecting Random Concept...</h4>
                <p className="text-xs text-slate-500">Finding a challenge based on your learning history...</p>
              </motion.div>
            )}

            {stage === 'revealed' && selectedItem && (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-lime-500/30 bg-lime-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-teal-700">
                    Concept Selected
                  </span>
                  <span className="text-xs font-mono text-slate-500">{selectedItem.difficulty} Tier</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-1">{selectedItem.conceptTitle}</h3>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                    "{selectedItem.shortPrompt}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleStartTeachBack}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-xs font-bold text-white hover:bg-teal-700 transition shadow-sm"
                  >
                    <Mic className="h-4 w-4" />
                    <span>Explain in My Own Words</span>
                  </button>
                  <button
                    onClick={handleSpin}
                    className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-600 hover:text-[#0F172A] transition"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Respin</span>
                  </button>
                </div>
              </motion.div>
            )}

            {stage === 'teach_back' && selectedItem && (
              <motion.div
                key="teach_back"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#0F172A] truncate">{selectedItem.conceptTitle}</h4>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition border ${
                      isRecording
                        ? 'border-red-500/50 bg-red-500/20 text-red-400 animate-pulse'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <Mic className="h-3 w-3" />
                    <span>{isRecording ? 'Recording Mic (Active)' : 'Voice Mic Mode'}</span>
                  </button>
                </div>

                <textarea
                  id="teach-back-input"
                  rows={4}
                  value={explanationText}
                  onChange={(e) => setExplanationText(e.target.value)}
                  placeholder="Explain the core mechanism as if teaching a friend. Include the 'why' and a practical example..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-[#0F172A] placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none resize-none leading-relaxed"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {explanationText.trim().split(/\s+/).filter(Boolean).length} words typed
                  </span>
                  <button
                    id="submit-teach-back-btn"
                    onClick={handleSubmitExplanation}
                    disabled={!explanationText.trim()}
                    className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-700 shadow-sm"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Explanation</span>
                  </button>
                </div>
              </motion.div>
            )}

            {stage === 'evaluating' && (
              <motion.div
                key="evaluating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
                <h4 className="text-base font-bold text-[#0F172A]">Reviewing Your Explanation...</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                  Checking for clear understanding and how well you can apply it.
                </p>
              </motion.div>
            )}

            {stage === 'feedback' && feedbackData && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Teach-Back Passed</span>
                    <h3 className="text-lg font-bold text-[#0F172A]">Mastery Score: {feedbackData.score}/100</h3>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold bg-[#FEF9C3] border border-[#FEF08A] text-[#854D0E]">
                    <Zap className="h-4 w-4 fill-[#EAB308] text-[#EAB308]" />
                    <span>+{feedbackData.xpEarned} XP</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Strengths Observed:</span>
                  {feedbackData.strengths.map((str, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSpin}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A]"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Spin Another Concept (+XP)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
