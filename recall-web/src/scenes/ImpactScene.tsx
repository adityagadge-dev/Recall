import { motion } from 'motion/react';
import AnimatedText from '../components/visuals/CinematicAnimatedText';
import './ImpactScene.css';

const STATS = [
  { label: 'MONEY', value: '76%', desc: 'of adults lack basic financial literacy', source: 'S&P Global FinLit', color: 'gold' },
  { label: 'SECURITY', value: '1 in 3', desc: 'internet users has been a victim of cybercrime', source: 'Norton Report', color: 'aqua' },
  { label: 'EMERGENCY', value: '2%', desc: 'of the population is trained in first aid', source: 'Red Cross', color: 'coral' },
  { label: 'COMMUNICATION', value: '#1', desc: 'skill gap reported by employers globally', source: 'LinkedIn Data', color: 'lavender' },
];

export default function ImpactScene() {
  return (
    <section className="scene impact" id="impact">
      <div className="scene__inner impact__inner">
        
        <div className="impact__header">
          <AnimatedText mode="blurSharp" tag="h2" className="heading-display impact__title" delay={0.1}>
            Skills that stay with you.
          </AnimatedText>
          <AnimatedText mode="fadeUp" tag="p" className="text-body impact__subtitle" delay={0.3}>
            The impact of replacing passive consumption with active, verified learning.
          </AnimatedText>
        </div>

        <div className="impact__grid">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              className="impact__card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <span className={`text-label text-${stat.color}`}>{stat.label}</span>
              <span className={`heading-display impact__value text-${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-body text-sm impact__desc">{stat.desc}</span>
              <span className="text-game text-muted-dim impact__source">{stat.source}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="impact__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-body">
            These aren't abstract numbers. They represent real people navigating life without the skills they needed most.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
