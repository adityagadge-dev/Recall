import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
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

interface RotatingCardsProps {
  cards: SubjectCard[];
}

export const RotatingCards: React.FC<RotatingCardsProps> = ({ cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] aspect-[3/4] sm:aspect-[4/5] flex items-center justify-center perspective-[1200px]">
          
          {cards.map((card, index) => {
            const indexFactor = index;
            // The active range for this card to be front-and-center
            const start = indexFactor * (1 / cards.length);
            const end = (indexFactor + 1) * (1 / cards.length);
            
            // As we scroll through, cards fan out from the bottom stack, rise up, then fade out
            const zIndex = cards.length - index;
            
            // Transform logic:
            // Before its turn: waiting in a stack at the bottom.
            // During its turn: front and center.
            // After its turn: scales up and fades out (moving "behind the camera").
            
            const scale = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.2), start, end, Math.min(1, end + 0.2)],
              [0.8, 1, 1, 1.2]
            );

            const y = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.2), start, end, Math.min(1, end + 0.2)],
              [100 + (index * 20), 0, 0, -100]
            );

            const rotateX = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.2), start, end, Math.min(1, end + 0.2)],
              [15, 0, 0, -10]
            );

            const opacity = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.2), start, end, Math.min(1, end + 0.1)],
              [0, 1, 1, 0]
            );
            
            // A subtle rotation tilt per card to make the stack look organic
            const baseRotationZ = index % 2 === 0 ? (index * 2) : -(index * 2);
            
            const rotateZ = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.2), start, end],
              [baseRotationZ, 0, 0]
            );

            return (
              <motion.div
                key={card.id}
                style={{
                  scale,
                  y,
                  rotateX,
                  rotateZ,
                  opacity,
                  zIndex,
                  transformOrigin: 'bottom center',
                }}
                className="absolute inset-0 w-full h-full rounded-[2rem] bg-[#11151F] border border-[#323B4E] shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden group hover:shadow-[0_0_40px_rgba(255,107,97,0.15)] transition-shadow duration-500"
              >
                {/* Background Image with Cinematic Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-[#0D1017]/80 to-transparent z-10" />
                  <div className="absolute inset-0 bg-[#07080C]/40 z-10" />
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                
                {/* Top Glowing Border Line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 z-20 opacity-80"
                  style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
                />

                {/* Content */}
                <div className="relative z-20 h-full p-6 sm:p-10 flex flex-col justify-end">
                  
                  {/* Eyebrow */}
                  <div className="mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span 
                      className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                      style={{ color: card.color }}
                    >
                      World {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-none">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-[#9AA4B8] font-medium leading-relaxed mb-8 max-w-[90%]">
                    {card.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {card.skills.map(skill => (
                      <span key={skill} className="text-xs font-bold text-white/70 bg-white/5 border border-white/10 rounded-md px-2.5 py-1 backdrop-blur-sm">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Link 
                    to={card.route}
                    className="inline-flex items-center gap-2 self-start font-bold text-sm tracking-wider uppercase transition-colors"
                    style={{ color: card.color }}
                  >
                    <span>Enter World</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
