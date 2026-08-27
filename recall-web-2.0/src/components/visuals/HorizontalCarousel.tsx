import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubjectCard {
  id: string;
  title: string;
  description: string;
  skills: string[];
  image: string;
  color: string;
  route: string;
}

interface HorizontalCarouselProps {
  cards: SubjectCard[];
}

export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    
    // Only attach if in viewport? Or just globally if focused
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          window.addEventListener('keydown', handleKeyDown);
        } else {
          window.removeEventListener('keydown', handleKeyDown);
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, [cards.length]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-12"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative w-full max-w-[1200px] mx-auto h-[480px] flex justify-center items-center perspective-[1000px]">
        <AnimatePresence mode="popLayout">
          {cards.map((card, idx) => {
            // Calculate relative position
            let offset = idx - activeIndex;
            if (offset < -1) offset += cards.length;
            if (offset > 1) offset -= cards.length;

            // Only render -1, 0, 1 for performance
            if (Math.abs(offset) > 1 && cards.length > 3) return null;

            const isActive = offset === 0;
            const zIndex = isActive ? 10 : 5 - Math.abs(offset);
            const scale = isActive ? 1 : 0.85;
            const x = offset * 260; // Distance between cards
            const rotateY = offset * -15;
            const opacity = isActive ? 1 : 0.5;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8, x: offset * 400 }}
                animate={{
                  opacity,
                  scale,
                  x,
                  rotateY,
                  zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                className="absolute w-[300px] md:w-[360px] h-[480px] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => !isActive && setActiveIndex(idx)}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080C] via-[#07080C]/80 to-transparent" />
                
                {isActive && (
                  <div className="absolute inset-0 border-2 rounded-2xl z-20 pointer-events-none" style={{ borderColor: card.color, opacity: 0.5 }} />
                )}

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">
                  <div className="flex gap-2 flex-wrap mb-4">
                    {card.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-xs font-bold px-2 py-1 rounded-md bg-[#11151F]/80 backdrop-blur-md text-white border border-[#323B4E]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-white mb-2" style={{ color: isActive ? card.color : '#FFF' }}>
                    {card.title}
                  </h3>
                  <p className="text-[#9AA4B8] text-sm md:text-base leading-relaxed mb-6 font-medium line-clamp-2">
                    {card.description}
                  </p>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link 
                        to={card.route}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-bold text-[#07080C] transition-all hover:-translate-y-1"
                        style={{ backgroundColor: card.color }}
                      >
                        EXPLORE WORLD
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-12 z-20 relative">
        <button 
          onClick={prev}
          aria-label="Previous subject"
          className="p-3 rounded-full bg-[#11151F]/80 backdrop-blur border border-[#323B4E] text-[#F7F8FC] hover:bg-[#1A2030] hover:border-[#FF6B61] hover:text-[#FF6B61] hover:shadow-[0_0_15px_rgba(255,107,97,0.2)] transition-all focus:outline-none active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="font-display text-[#9AA4B8] font-bold text-sm tracking-widest px-4">
          0{activeIndex + 1} / 0{cards.length}
        </div>
        <button 
          onClick={next}
          aria-label="Next subject"
          className="p-3 rounded-full bg-[#11151F]/80 backdrop-blur border border-[#323B4E] text-[#F7F8FC] hover:bg-[#1A2030] hover:border-[#54D6C2] hover:text-[#54D6C2] hover:shadow-[0_0_15px_rgba(84,214,194,0.2)] transition-all focus:outline-none active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
