import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import AnimatedText from '../components/visuals/CinematicAnimatedText';
import './HowItWorksScene.css';

const STEPS = [
  { num: '01', title: 'Learn the Concept', desc: 'Short, interactive lessons without the fluff.' },
  { num: '02', title: 'Play the Simulation', desc: 'Apply knowledge instantly in game-like scenarios.' },
  { num: '03', title: 'Test Your Recall', desc: 'Active retrieval micro-challenges cement the memory.' },
  { num: '04', title: 'Master the Skill', desc: 'Take it to the real world with confidence.' },
];

export default function HowItWorksScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"]
  });

  return (
    <section className="scene how-it-works" id="how-it-works" ref={containerRef}>
      <div className="scene__inner how-it-works__inner">
        
        <div className="how-it-works__header">
          <AnimatedText mode="fadeUp" tag="div" className="text-label text-lavender" delay={0.1}>
            ◈ THE METHOD
          </AnimatedText>
          <AnimatedText mode="wordSlide" tag="h2" className="heading-display how-it-works__title" delay={0.2}>
            How it works
          </AnimatedText>
        </div>

        <div className="how-it-works__timeline">
          {/* Path line background */}
          <div className="how-it-works__path-bg" />
          
          {/* Path line fill based on scroll */}
          <motion.div 
            className="how-it-works__path-fill"
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />

          <div className="how-it-works__steps">
            {STEPS.map((step, i) => (
              <motion.div 
                key={step.num}
                className="how-it-works__step"
                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="how-it-works__node" />
                <div className="how-it-works__card">
                  <span className="text-game text-lavender">{step.num}</span>
                  <h3 className="heading-section text-2xl text-cream mt-2 mb-1">{step.title}</h3>
                  <p className="text-body">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
