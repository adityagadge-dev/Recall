import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import AnimatedText from '../components/visuals/CinematicAnimatedText';
import './MasteryScene.css';

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function MasteryScene() {
  return (
    <section className="scene mastery" id="mastery">
      <div className="scene__inner mastery__inner">
        
        <div className="mastery__content">
          <AnimatedText mode="fadeUp" tag="div" className="text-label text-gold" delay={0.1}>
            ◈ REAL-WORLD MASTERY
          </AnimatedText>
          
          <AnimatedText mode="wordSlide" tag="h2" className="heading-display mastery__title" delay={0.2}>
            Level up your actual life.
          </AnimatedText>
          
          <AnimatedText mode="fadeUp" tag="p" className="text-body mastery__subtitle" delay={0.4}>
            Track your progress, earn verified credentials, and build a portfolio of skills that traditional institutions ignore.
          </AnimatedText>
        </div>

        <div className="mastery__stats">
          <motion.div 
            className="mastery__stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mastery__stat-value heading-display text-coral">
              <AnimatedCounter value={94} />%
            </div>
            <div className="mastery__stat-label text-game">RETENTION RATE</div>
            <p className="text-body text-sm mt-2">Compared to 15% in passive video learning.</p>
          </motion.div>

          <motion.div 
            className="mastery__stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mastery__stat-value heading-display text-gold">
              <AnimatedCounter value={12} />+
            </div>
            <div className="mastery__stat-label text-game">CORE LIFE SKILLS</div>
            <p className="text-body text-sm mt-2">Mapped directly to real-world survival and success.</p>
          </motion.div>

          <motion.div 
            className="mastery__stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mastery__stat-value heading-display text-aqua">
              <AnimatedCounter value={500} />k
            </div>
            <div className="mastery__stat-label text-game">SIMULATIONS RUN</div>
            <p className="text-body text-sm mt-2">By users preparing for high-stakes moments.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
