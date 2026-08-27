import { motion } from 'motion/react';
import AnimatedText from '../components/visuals/CinematicAnimatedText';
import { HorizontalCarousel } from '../components/visuals/HorizontalCarousel';
import './SubjectWorldScene.css';
import { SubjectCarousel } from '../components/landing/SubjectCarousel';

const subjects = [
  { id: 'finance', title: 'Financial Literacy', description: 'Build your money instincts. Master budgeting, saving, and smart credit decisions.', skills: ['Budgeting', 'Saving', 'Banking', 'Credit'], image: '/financial literacy.jpeg', color: '#FFD166', route: '/subjects/financial-literacy' },
  { id: 'digital-safety', title: 'Digital Safety', description: 'Navigate the web with absolute confidence and protect your identity.', skills: ['Privacy', 'Passwords', 'Phishing', 'Scams'], image: '/Digital Safety.jpeg', color: '#54D6C2', route: '/subjects/digital-safety' },
  { id: 'first-aid', title: 'First Aid', description: 'Be ready for the unexpected. Learn critical response protocols.', skills: ['CPR', 'Emergency', 'Recovery', 'Triage'], image: '/first aid.jpeg', color: '#FF6B61', route: '/subjects/first-aid' },
  { id: 'communication', title: 'Communication Skills', description: 'Connect, de-escalate, and lead in high-stakes conversations.', skills: ['Listening', 'Empathy', 'Clarity', 'Conflict'], image: '/communication.jpeg', color: '#A78BFA', route: '/subjects/communication' },
];

export default function SubjectWorldScene() {
  return (
    <section className="scene worlds" id="subjects">
      <div className="worlds__bg"></div>
      <div className="scene__inner worlds__inner">
        
        <div className="worlds__header">
          <AnimatedText mode="fadeUp" tag="div" className="text-label text-gold" delay={0.1}>
            ◈ THE WORLDS
          </AnimatedText>
          
          <AnimatedText mode="wordSlide" tag="h2" className="heading-display worlds__title" delay={0.2}>
            Choose Your Path
          </AnimatedText>
          
          <AnimatedText mode="fadeUp" tag="p" className="text-body worlds__subtitle" delay={0.3}>
            Each subject is an immersive simulation designed to build reflexive, real-world skills.
          </AnimatedText>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="worlds__carousel-wrapper"
        >
          <SubjectCarousel/>
        </motion.div>

      </div>
    </section>
  );
}

