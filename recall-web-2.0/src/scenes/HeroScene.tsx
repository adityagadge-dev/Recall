import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import AnimatedText from '../components/visuals/CinematicAnimatedText';
import PixelAtmosphere from '../components/visuals/PixelAtmosphere';
import BudgetQuest from './HeroScene/BudgetQuest';
import './HeroScene.css';

export default function HeroScene() {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/sign-in', {
      state: { initialActive: true, role: 'learner' },
    });
  };

  const handleExploreWorlds = () => {
    const el = document.querySelector('#subjects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#subjects');
    }
  };

  return (
    <section className="scene hero" id="hero">
      <PixelAtmosphere
        particleCount={50}
        accentColor="#FF7467"
        speed={0.6}
      />

      {/* Ambient background elements */}
      <div className="hero__ambient">
        <div className="hero__arc hero__arc--1" />
        <div className="hero__arc hero__arc--2" />
        <div className="hero__arc hero__arc--3" />
      </div>

      <div className="scene__inner hero__inner">
        {/* Left: Content */}
        <div className="hero__content">
          <AnimatedText
            mode="fadeUp"
            tag="div"
            className="text-label hero__eyebrow"
            delay={0.1}
          >
            ◈ LEVEL UP REAL-LIFE SKILLS
          </AnimatedText>

          <div className="hero__headline heading-display">
            <AnimatedText mode="wordSlide" tag="h1" className="hero__h1" delay={0.2}>
              Learn the skills
            </AnimatedText>
            <AnimatedText mode="wordSlide" tag="div" className="hero__h1" delay={0.4}>
              <span className="hero__accent">life  </span> never
            </AnimatedText>
            <AnimatedText mode="wordSlide" tag="div" className="hero__h1" delay={0.55}>
              taught you.
            </AnimatedText>
          </div>

          <AnimatedText
            mode="fadeUp"
            tag="p"
            className="text-body hero__subtitle"
            delay={0.7}
          >
            Master financial literacy, digital safety, first aid, and
            communication — the skills that actually matter.
          </AnimatedText>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <button
              className="btn btn--primary"
              id="hero-cta-start"
              onClick={handleStartJourney}
            >
              Start Your Journey
              <span className="btn__arrow">→</span>
            </button>
            <button
              className="btn btn--ghost"
              id="hero-cta-explore"
              onClick={handleExploreWorlds}
            >
              Explore Worlds
            </button>
          </motion.div>
        </div>

        {/* Right: Budget Quest Game */}
        <motion.div
          className="hero__game"
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <BudgetQuest />
        </motion.div>
      </div>
    </section>
  );
}