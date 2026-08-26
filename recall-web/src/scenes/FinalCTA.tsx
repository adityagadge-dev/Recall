import { motion } from 'motion/react';
import AnimatedText from '../components/visuals/CinematicAnimatedText';
import './FinalCTA.css';

export default function FinalCTA() {
  return (
    <section className="scene cta" id="cta">
      {/* Background Glows */}
      <div className="cta__glow-bottom" />
      <div className="cta__glow-center" />
      
      {/* Ghost Text */}
      <div className="cta__ghost-text">RECALL</div>

      <div className="scene__inner cta__inner">
        <AnimatedText mode="blurSharp" tag="h2" className="heading-display cta__title" delay={0.2}>
          Your life is <br className="hidden sm:block" />
          the real game.
        </AnimatedText>
        
        <AnimatedText mode="fadeUp" tag="p" className="text-body cta__subtitle" delay={0.4}>
          Stop leaving critical life skills to chance. Start building real-world abilities today.
        </AnimatedText>

        <motion.div 
          className="cta__actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="btn btn--primary cta__btn-start">
            Start Learning
            <span className="btn__arrow">→</span>
          </button>
          <button className="btn btn--ghost">
            Explore the Worlds
          </button>
        </motion.div>

        <motion.div 
          className="cta__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-label text-coral">RECALL</span>
          <span className="text-muted">&middot;</span>
          <span className="text-game text-muted-dim">Learn what life never taught you</span>
        </motion.div>
      </div>
    </section>
  );
}
