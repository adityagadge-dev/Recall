import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILL_NODES = [
  { label: 'Budget Basics', level: 1, color: '#FFD166', unlocked: true },
  { label: 'Password Security', level: 1, color: '#54D6C2', unlocked: true },
  { label: 'CPR Fundamentals', level: 2, color: '#FF6B61', unlocked: true },
  { label: 'Active Listening', level: 2, color: '#A78BFA', unlocked: true },
  { label: 'Investing 101', level: 3, color: '#FFD166', unlocked: false },
  { label: 'Encryption', level: 3, color: '#54D6C2', unlocked: false },
  { label: 'Trauma Response', level: 4, color: '#FF6B61', unlocked: false },
  { label: 'Negotiation', level: 4, color: '#A78BFA', unlocked: false },
];

const BADGES = [
  { emoji: '💰', label: 'Budget Master', color: '#FFD166' },
  { emoji: '🛡️', label: 'Digital Guardian', color: '#54D6C2' },
  { emoji: '🏥', label: 'First Responder', color: '#FF6B61' },
  { emoji: '💬', label: 'Communicator', color: '#A78BFA' },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {target.toLocaleString()}{suffix}
        </motion.span>
      ) : '0'}
    </motion.span>
  );
}

export function GameProgression() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* XP Panel */}
        <motion.div
          className="bg-gradient-to-b from-[#11151F]/60 to-[#07080C]/80 border border-[#323B4E]/50 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-start justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="text-[#9AA4B8] font-mono text-[9px] tracking-[0.15em] mb-4">EXPERIENCE POINTS</div>
          <div className="font-display text-5xl sm:text-6xl font-black text-[#F7F8FC] mb-6">
            <AnimatedCounter target={2847} suffix=" XP" />
          </div>
          <div className="w-full h-2 bg-[#1A2030] rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-[#A78BFA] to-[#FF6B61] rounded-full shadow-[0_0_10px_rgba(167,139,250,0.5)]"
              initial={{ width: 0 }}
              whileInView={{ width: '65%' }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
              viewport={{ once: true }}
            />
          </div>
          <div className="text-[#687286] font-mono text-[8px] tracking-[0.1em]">LEVEL 7 &rarr; LEVEL 8</div>
        </motion.div>

        {/* Streak Panel */}
        <motion.div
          className="bg-gradient-to-b from-[#11151F]/60 to-[#07080C]/80 border border-[#323B4E]/50 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="text-[#9AA4B8] font-mono text-[9px] tracking-[0.15em] mb-4">DAILY STREAK</div>
          <div className="font-display text-7xl font-black text-[#FFD166] flex items-center gap-2">
            <AnimatedCounter target={14} />
          </div>
          <div className="text-4xl my-4 animate-bounce">🔥</div>
          <div className="text-[#FFD166] font-mono text-[8px] tracking-[0.1em]">DAYS IN A ROW</div>
        </motion.div>

        {/* Skill Nodes */}
        <motion.div
          className="md:col-span-2 bg-gradient-to-b from-[#11151F]/60 to-[#07080C]/80 border border-[#323B4E]/50 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="text-[#9AA4B8] font-mono text-[9px] tracking-[0.15em] mb-6">SKILL TREE</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILL_NODES.map((node, i) => (
              <motion.div
                key={node.label}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  node.unlocked 
                    ? 'bg-[#F7F8FC]/5 border-transparent' 
                    : 'bg-[#1A2030]/30 border-[#323B4E]/30'
                }`}
                style={{
                  borderColor: node.unlocked ? `${node.color}40` : undefined,
                  boxShadow: node.unlocked ? `0 0 12px ${node.color}20` : undefined,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: node.unlocked ? node.color : '#323B4E' }}
                />
                <span className={`font-medium text-sm flex-grow ${node.unlocked ? 'text-[#F7F8FC]' : 'text-[#687286]'}`}>
                  {node.label}
                </span>
                {!node.unlocked && <span className="text-[10px] opacity-50">🔒</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="md:col-span-2 bg-gradient-to-b from-[#11151F]/60 to-[#07080C]/80 border border-[#323B4E]/50 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="text-[#9AA4B8] font-mono text-[9px] tracking-[0.15em] mb-6">BADGES EARNED</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {BADGES.map((badge, i) => (
              <motion.div
                key={badge.label}
                className="flex flex-col items-center gap-4 p-6 bg-[#F7F8FC]/[0.02] border border-[#F7F8FC]/5 rounded-2xl cursor-pointer"
                style={{ borderColor: `${badge.color}20` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -4, backgroundColor: 'rgba(247,248,252,0.04)' }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl">{badge.emoji}</span>
                <span className="text-[#9AA4B8] font-mono text-[8px] tracking-[0.1em] text-center">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
