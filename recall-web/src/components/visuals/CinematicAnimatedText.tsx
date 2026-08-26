import { motion, type Variants } from 'motion/react';
import { type ReactNode, type CSSProperties } from 'react';

type AnimationMode = 'charReveal' | 'wordSlide' | 'blurSharp' | 'fadeUp';

interface AnimatedTextProps {
  children: ReactNode;
  mode?: AnimationMode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  staggerChildren?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: 0,
    },
  }),
};

const wordSlideVariants: Variants = {
  hidden: { y: 40, opacity: 0, filter: 'blur(6px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const charRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

const blurSharpVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', scale: 0.96 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AnimatedText({
  children,
  mode = 'fadeUp',
  delay = 0,
  className = '',
  style,
  tag = 'div',
  staggerChildren = 0.08,
  once = true,
}: AnimatedTextProps) {
  const Tag = motion[tag] as typeof motion.div;

  if (mode === 'wordSlide' && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <Tag
        className={className}
        style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-50px' }}
        custom={staggerChildren}
        transition={{ delay }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordSlideVariants}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  if (mode === 'charReveal' && typeof children === 'string') {
    const chars = children.split('');
    return (
      <Tag
        className={className}
        style={style}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-50px' }}
        custom={staggerChildren * 0.3}
        transition={{ delay }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={charRevealVariants}
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
          >
            {char}
          </motion.span>
        ))}
      </Tag>
    );
  }

  if (mode === 'blurSharp') {
    return (
      <Tag
        className={className}
        style={style}
        variants={blurSharpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-50px' }}
        transition={{ delay }}
      >
        {children}
      </Tag>
    );
  }

  // Default: fadeUp
  return (
    <Tag
      className={className}
      style={style}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
