import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function buildNoiseTile() {
  let rects = "";
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (rand() > 0.72) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="#ffffff" opacity="${(rand() * 0.5 + 0.15).toFixed(2)}"/>`;
      }
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">${rects}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const NOISE_TILE = buildNoiseTile();

export function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-[-20%] z-[100] mix-blend-overlay opacity-[0.04]"
      style={{
        backgroundImage: `url('${NOISE_TILE}')`,
        backgroundSize: "8px 8px",
        imageRendering: "pixelated",
        animation: "grain-shift 1.2s steps(4) infinite"
      }}
      aria-hidden="true"
    />
  );
}

export function AmbientGlows() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full mix-blend-screen opacity-20 filter blur-[100px]"
        style={{ background: "var(--accent-coral)" }}
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -30, 0],
          opacity: [0.2, 0.25, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-[0.15] filter blur-[120px]"
        style={{ background: "var(--accent-aqua)" }}
        animate={{
          scale: [1, 1.05, 1],
          y: [0, 40, 0],
          x: [0, -20, 0],
          opacity: [0.15, 0.2, 0.15]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // Check if device is touch or prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none)").matches) {
      return;
    }
    
    let raf: number | null = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (el) el.style.transform = `translate(${x}px, ${y}px)`;
        raf = null;
      });
    };
    
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  
  return (
    <div 
      ref={ref}
      className="fixed top-0 left-0 w-[500px] h-[500px] -ml-[250px] -mt-[250px] rounded-full pointer-events-none z-[60] mix-blend-screen hidden md:block"
      style={{
        background: "radial-gradient(circle, rgba(255,107,97,0.12) 0%, rgba(255,107,97,0.04) 35%, transparent 70%)"
      }}
      aria-hidden="true"
    />
  );
}

export function AmbientParticles() {
  const [particles, setParticles] = useState<any[]>([]);
  
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const colors = ['var(--accent-coral)', 'var(--accent-aqua)', 'var(--accent-gold)'];
    
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
    }));
    
    setParticles(newParticles);
  }, []);
  
  if (particles.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`
          }}
          animate={{
            y: ["0vh", "-100vh"],
            x: ["0px", `${Math.random() * 50 - 25}px`],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

export function PixelAtmosphere({ isGlobal = false }: { isGlobal?: boolean }) {
  const [pixels, setPixels] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const colors = ['#FF6F61', '#F4C95D', '#A8DADC', '#F5E9D7'];
    const isMobile = window.innerWidth < 768;
    const pixelCount = isMobile ? (isGlobal ? 30 : 15) : (isGlobal ? 80 : 35);
    
    const newPixels = Array.from({ length: pixelCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() > 0.8 ? 4 : 2, // Mix of 2px and 4px squares
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -15,
      opacityOffset: Math.random() * 0.3 + 0.05,
      parallaxFactor: Math.random() * 30 - 15,
    }));
    
    setPixels(newPixels);

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isGlobal]);

  return (
    <div 
      ref={ref} 
      className={`${isGlobal ? 'fixed inset-0 z-0' : 'absolute inset-0 rounded-3xl -z-10'} overflow-hidden pointer-events-none`} 
      aria-hidden="true"
    >
      {!isGlobal && <div className="absolute inset-0 bg-gradient-to-tr from-[#11151F]/40 to-[#07080C]/40 mix-blend-overlay" />}
      {pixels.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: ["-10px", "10px"],
            opacity: [p.opacityOffset, p.opacityOffset + 0.3, p.opacityOffset],
            x: mousePos.x * p.parallaxFactor,
            yOffset: mousePos.y * p.parallaxFactor,
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: p.delay },
            opacity: { duration: p.duration * 0.7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: p.delay },
            x: { type: "spring", stiffness: 40, damping: 25 },
            yOffset: { type: "spring", stiffness: 40, damping: 25 }
          }}
        />
      ))}
    </div>
  );
}

export function CinematicWaves() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0.8]);
  
  const [shouldAnimate, setShouldAnimate] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldAnimate(false);
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden mix-blend-screen opacity-40">
      <motion.svg 
        viewBox="0 0 1440 800" 
        preserveAspectRatio="none" 
        className="absolute w-full h-[150vh] -top-[25vh] left-0"
        style={{ y: y1, opacity }}
      >
        <motion.path
          d="M0 400 Q 360 200, 720 400 T 1440 400 L 1440 800 L 0 800 Z"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          animate={shouldAnimate ? {
            d: [
              "M0 400 Q 360 200, 720 400 T 1440 400",
              "M0 400 Q 360 300, 720 400 T 1440 400",
              "M0 400 Q 360 200, 720 400 T 1440 400"
            ]
          } : {}}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B61" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF6B61" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#54D6C2" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      <motion.svg 
        viewBox="0 0 1440 800" 
        preserveAspectRatio="none" 
        className="absolute w-full h-[150vh] -top-[15vh] left-0"
        style={{ y: y2, opacity }}
      >
        <motion.path
          d="M0 500 Q 360 700, 720 500 T 1440 500 L 1440 800 L 0 800 Z"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          animate={shouldAnimate ? {
            d: [
              "M0 500 Q 360 700, 720 500 T 1440 500",
              "M0 500 Q 360 600, 720 500 T 1440 500",
              "M0 500 Q 360 700, 720 500 T 1440 500"
            ]
          } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#54D6C2" stopOpacity="0" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF6B61" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
