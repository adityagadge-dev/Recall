import { motion } from 'motion/react';
import AnimatedText from '../components/visuals/CinematicAnimatedText';
import Hangman from './RecallChallengeScene/Hangman';
import './RecallChallengeScene.css';

export default function RecallChallengeScene() {
  return (
    <section className="scene challenge" id="challenge">
      <div className="challenge__grid"></div>
      <div className="scene__inner challenge__inner">
        
        {/* Left: Terminal/Game */}
        <motion.div 
          className="challenge__game"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Hangman />
        </motion.div>

        {/* Right: Content */}
        <div className="challenge__content">
          <AnimatedText mode="fadeUp" tag="div" className="text-label text-aqua" delay={0.1}>
            ◈ ACTIVE RECALL
          </AnimatedText>
          
          <AnimatedText mode="wordSlide" tag="h2" className="heading-display challenge__title" delay={0.2}>
            Don't just read. <br />
            <span className="text-aqua">Prove it.</span>
          </AnimatedText>
          
          <AnimatedText mode="fadeUp" tag="p" className="text-body challenge__subtitle" delay={0.4}>
            Passive reading creates an illusion of competence. Our system forces you to retrieve information through micro-challenges, cementing it into long-term memory.
          </AnimatedText>

          <motion.div 
            className="challenge__features"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="challenge__feature">
              <span className="text-game text-aqua">01</span>
              <span className="text-body">Spaced repetition algorithms</span>
            </div>
            <div className="challenge__feature">
              <span className="text-game text-aqua">02</span>
              <span className="text-body">Scenario-based testing</span>
            </div>
            <div className="challenge__feature">
              <span className="text-game text-aqua">03</span>
              <span className="text-body">Instant failure recovery</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
