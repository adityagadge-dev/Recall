import { motion } from 'motion/react';
import { HorizontalCarousel } from '../visuals/HorizontalCarousel';

const subjects = [
  { id: 'finance', title: 'Financial Literacy', description: 'Build your money instincts. Master budgeting, saving, and smart credit decisions.', skills: ['Budgeting', 'Saving', 'Banking', 'Credit'], image: '/financial literacy.jpeg', color: '#FFD166', route: '/subjects/financial-literacy' },
  { id: 'digital-safety', title: 'Digital Safety', description: 'Navigate the web with absolute confidence and protect your identity.', skills: ['Privacy', 'Passwords', 'Phishing', 'Scams'], image: '/Digital Safety.jpeg', color: '#54D6C2', route: '/subjects/digital-safety' },
  { id: 'first-aid', title: 'First Aid', description: 'Be ready for the unexpected. Learn critical response protocols.', skills: ['CPR', 'Emergency', 'Recovery', 'Triage'], image: '/first aid.jpeg', color: '#FF6B61', route: '/subjects/first-aid' },
  { id: 'communication', title: 'Communication Skills', description: 'Connect, de-escalate, and lead in high-stakes conversations.', skills: ['Listening', 'Empathy', 'Clarity', 'Conflict'], image: '/communication.jpeg', color: '#A78BFA', route: '/subjects/communication' },
];

export const SubjectCarousel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      viewport={{ once: true }}
      className="worlds__carousel-wrapper"
    >
      <HorizontalCarousel cards={subjects} />
    </motion.div>
  );
};