import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Coins, ShieldCheck, HeartPulse, MessageSquareShare, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../hooks/useGlobalClickSound';

const SUBJECTS = [
  {
    id: 'finance',
    name: 'Financial Literacy',
    description: 'Build confidence with money, saving, budgeting and everyday financial decisions.',
    skills: ['Budgeting', 'Saving', 'Consumer Awareness', 'Fraud Awareness'],
    icon: Coins,
    color: 'text-amber-500',
    bg: 'bg-amber-100',
    accent: 'bg-amber-500',
    route: '/subjects/financial-literacy',
    image: '/financial literacy.jpeg'
  },
  {
    id: 'digital-safety',
    name: 'Digital Safety',
    description: 'Identify phishing vectors, manage digital identity, secure credentials, and navigate online threats safely.',
    skills: ['Phishing Defense', 'Identity Protection', 'Password Security', 'Scam Recognition'],
    icon: ShieldCheck,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    accent: 'bg-blue-500',
    route: '/subjects/digital-safety',
    image: '/Digital Safety.jpeg'
  },
  {
    id: 'first-aid',
    name: 'First Aid',
    description: 'Learn life-saving emergency protocols, situational awareness, and crucial trauma response techniques.',
    skills: ['Emergency Response', 'CPR Basics', 'Wound Care', 'Situational Awareness'],
    icon: HeartPulse,
    color: 'text-rose-500',
    bg: 'bg-rose-100',
    accent: 'bg-rose-500',
    route: '/subjects/first-aid',
    image: '/first aid.jpeg'
  },
  {
    id: 'communication',
    name: 'Communication Skills',
    description: 'Master active listening, conflict resolution, empathetic response, and clear professional speaking.',
    skills: ['Active Listening', 'Conflict Resolution', 'Empathy', 'Clear Speaking'],
    icon: MessageSquareShare,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100',
    accent: 'bg-emerald-500',
    route: '/subjects/communication',
    image: '/communication.jpeg'
  }
];

export const SubjectCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < SUBJECTS.length - 1 ? prev + 1 : 0));
    playClickSound('default');
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SUBJECTS.length - 1));
    playClickSound('default');
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isHovered) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev < SUBJECTS.length - 1 ? prev + 1 : 0));
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-[#F7F8FC] mb-4">Four skills everyone should know.</h2>
        <p className="text-[#9AA4B8]">
          Explore the skills Recall helps you build for real life.
        </p>
      </div>

      <div 
        className="relative h-[700px] sm:h-[650px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientY)}
        onTouchEnd={(e) => {
          const touchEnd = e.changedTouches[0].clientY;
          if (touchStart - touchEnd > 50) handleNext();
          if (touchEnd - touchStart > 50) handlePrev();
        }}
      >
        <div className="absolute left-4 sm:left-12 flex flex-col gap-4 z-20 hidden md:flex">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-[#11151F] border border-[#323B4E] shadow-sm flex items-center justify-center text-[#9AA4B8] hover:text-[#F7F8FC] hover:border-[#4A5568] transition-all hover:-translate-y-1 active:scale-95"
            aria-label="Previous Subject"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[#11151F] border border-[#323B4E] shadow-sm flex items-center justify-center text-[#9AA4B8] hover:text-[#F7F8FC] hover:border-[#4A5568] transition-all hover:translate-y-1 active:scale-95"
            aria-label="Next Subject"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        <div className="relative w-full max-w-2xl h-full flex items-center justify-center perspective-[1000px]">
          {SUBJECTS.map((subject, index) => {
            // Calculate relative offset handling wrap-around for smooth looping
            // Wait, for 4 items, we can just do simple distance
            let offset = index - activeIndex;
            // if we want to loop, we can adjust offsets.
            // But let's just use linear offset for simplicity and not looping the visual wrap, just jumps back, 
            // OR we can make it wrap:
            if (offset > 2) offset -= SUBJECTS.length;
            if (offset < -1) offset += SUBJECTS.length;

            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Curved path logic
            const yOffset = offset * 160; 
            // Create a gentle S-curve using Math.sin
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const xOffset = isMobile ? offset * 10 : Math.sin(offset * 0.8) * 60;
            const scale = isActive ? 1 : 1 - Math.abs(offset) * 0.15;
            const opacity = isActive ? 1 : 1 - Math.abs(offset) * 0.4;
            const zIndex = 10 - Math.abs(offset);
            const rotateZ = offset * 2; // slight tilt

            return (
              <motion.div
                key={subject.id}
                initial={false}
                animate={{
                  y: yOffset,
                  x: xOffset,
                  scale,
                  opacity,
                  zIndex,
                  rotateZ
                }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 30,
                  mass: 0.8
                }}
                className={`absolute w-full px-4 md:px-0`}
                style={{ originY: offset < 0 ? 1 : 0 }}
              >
                {isActive ? (
                  <div className="bg-[#FFFDF8] border border-[#323B4E] shadow-2xl shadow-[#25364A]/5 rounded-[2rem] overflow-hidden flex flex-col-reverse sm:flex-row group transition-colors">
                    <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">
                      <div className={`w-14 h-14 rounded-2xl ${subject.bg} ${subject.color} flex items-center justify-center mb-6`}>
                        <subject.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#F7F8FC] mb-4">
                        {subject.name}
                      </h3>
                      <p className="text-[#9AA4B8] mb-6 leading-relaxed">
                        {subject.description}
                      </p>
                      <ul className="space-y-2 mb-8">
                        {subject.skills.map((skill, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm font-medium text-[#F7F8FC]">
                            <div className={`w-1.5 h-1.5 rounded-full ${subject.accent}`} />
                            {skill}
                          </li>
                        ))}
                      </ul>
                      <div>
                        <Link 
                          to={subject.route}
                          onClick={() => playClickSound('default')}
                          className="inline-flex items-center gap-2 bg-[#F7C928] text-[#F7F8FC] px-6 py-3 rounded-full font-bold shadow-sm hover:bg-[#E5B81F] hover:-translate-y-0.5 transition-all group/btn"
                        >
                          Explore {subject.name}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                    <div className="block h-32 sm:h-auto sm:w-2/5 relative overflow-hidden bg-[#1A2030] shrink-0">
                      <motion.img 
                        src={subject.image}
                        alt={subject.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t sm:inset-y-0 sm:left-0 sm:h-full sm:w-16 sm:bg-gradient-to-r from-[#FFFDF8] to-transparent" />
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      setActiveIndex(index);
                      playClickSound('default');
                    }}
                    className="max-w-sm mx-auto bg-[#11151F]/80 backdrop-blur-sm border border-[#323B4E]/60 shadow-lg rounded-3xl p-6 cursor-pointer hover:bg-[#11151F] hover:border-[#4A5568] transition-colors flex items-center gap-6 group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${subject.bg} ${subject.color} flex items-center justify-center shrink-0`}>
                      <subject.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#F7F8FC] mb-1 group-hover:text-[#F7C928] transition-colors">{subject.name}</h4>
                      <p className="text-sm text-[#9AA4B8] line-clamp-1">{subject.description}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile controls */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4 md:hidden z-20">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-[#11151F] border border-[#323B4E] shadow-sm flex items-center justify-center text-[#9AA4B8] active:scale-95"
            aria-label="Previous Subject"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[#11151F] border border-[#323B4E] shadow-sm flex items-center justify-center text-[#9AA4B8] active:scale-95"
            aria-label="Next Subject"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
