import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RecallLogo } from '../brand/RecallLogo';

const BOOT_LINES = [
  'INITIALIZING RECALL',
  'INDEXING REAL-WORLD SKILLS',
  'BUILDING MEMORY MAP',
  'LOADING SKILL WORLDS',
];

interface RecallLoaderProps {
  onComplete?: () => void;
}

export const RecallLoader: React.FC<RecallLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [bootLine, setBootLine] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timerRef.current.push(t);
      return t;
    };

    // Sequence timing
    schedule(() => setPhase(1), 300);   // Light point
    schedule(() => setPhase(2), 1000);  // Ring
    schedule(() => setPhase(3), 1600);  // Boot text
    schedule(() => setBootLine(1), 2200);
    schedule(() => setBootLine(2), 2800);
    schedule(() => setBootLine(3), 3400);
    schedule(() => setPhase(4), 4000);  // Logo
    schedule(() => setPhase(5), 5200);  // Exit
    schedule(() => setVisible(false), 6200); // Complete

    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!visible && onComplete) {
      onComplete();
    }
  }, [visible, onComplete]);

  const handleSkip = () => {
    timerRef.current.forEach(clearTimeout);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="recall-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080C] pointer-events-auto overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Subtle noise grain */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

          {/* Skip button */}
          <button onClick={handleSkip} className="absolute bottom-8 right-8 font-mono text-[9px] text-[#687286] hover:text-[#F7F8FC] tracking-widest transition-colors z-50">
            SKIP &rsaquo;
          </button>

          {/* Phase 1: Light point */}
          <AnimatePresence>
            {phase >= 1 && phase < 5 && (
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-[#F7F8FC]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, boxShadow: '0 0 20px 4px rgba(247, 248, 252, 0.4)' }}
                exit={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Phase 2: Expanding ring */}
          <AnimatePresence>
            {phase >= 2 && phase < 5 && (
              <motion.div
                className="absolute w-[120px] h-[120px] rounded-full border border-[rgba(247,248,252,0.3)]"
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 0.6, 0.4], boxShadow: '0 0 30px 2px rgba(255, 107, 97, 0.1)' }}
                exit={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Phase 3: Boot text */}
          <AnimatePresence mode="wait">
            {phase >= 3 && phase < 4 && (
              <motion.div
                key={bootLine}
                className="absolute bottom-[40%] font-mono text-[8px] text-[#9AA4B8] tracking-[0.2em]"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: [0, 0.8, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
              >
                {BOOT_LINES[bootLine]}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 4: Logo Reveal */}
          <AnimatePresence>
            {phase >= 4 && (
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center gap-8"
                initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                animate={
                  phase >= 5
                    ? { scale: 2.5, opacity: 0, filter: 'blur(30px)' }
                    : { scale: 1, opacity: 1, filter: 'blur(0px)' }
                }
                transition={{
                  duration: phase >= 5 ? 1.2 : 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="absolute text-[20vw] font-black text-[rgba(247,248,252,0.02)] tracking-tighter select-none whitespace-nowrap pointer-events-none -z-10">
                  RECALL
                </div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <RecallLogo color="#F7F8FC" className="scale-150 drop-shadow-[0_0_40px_rgba(255,107,97,0.2)]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
