import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  layer: number; // 0=far, 1=mid, 2=near
  color: string;
  life: number;
  maxLife: number;
}

interface PixelAtmosphereProps {
  particleCount?: number;
  accentColor?: string;
  speed?: number;
  className?: string;
  mouseReactive?: boolean;
}

const LAYER_SPEEDS = [0.15, 0.35, 0.6];

export default function PixelAtmosphere({
  particleCount = 60,
  accentColor = '#FF7467',
  speed = 1,
  className = '',
  mouseReactive = true,
}: PixelAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const actualCount = isMobile ? Math.floor(particleCount * 0.4) : particleCount;

  const createParticle = useCallback(
    (canvas: HTMLCanvasElement, randomY = true): Particle => {
      const layer = Math.floor(Math.random() * 3);
      const baseColors = ['#F5EFE240', '#98A0B330', accentColor + '25'];
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.3 * speed * LAYER_SPEEDS[layer],
        vy: -Math.random() * 0.4 * speed * LAYER_SPEEDS[layer] - 0.05,
        size: (Math.random() * 2 + 0.5) * (layer === 2 ? 1.5 : layer === 1 ? 1 : 0.6),
        opacity: Math.random() * 0.6 + 0.1,
        layer,
        color: baseColors[Math.floor(Math.random() * baseColors.length)],
        life: 0,
        maxLife: Math.random() * 600 + 200,
      };
    },
    [accentColor, speed]
  );

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: actualCount }, () =>
      createParticle(canvas)
    );

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    if (mouseReactive) {
      window.addEventListener('mousemove', handleMouse, { passive: true });
    }

    // IntersectionObserver to pause off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((p, i) => {
        p.life++;

        // Mouse attraction (subtle)
        if (mouseReactive && mouseRef.current.x > 0) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200 * 0.015 * LAYER_SPEEDS[p.layer];
            p.vx += dx * force * 0.01;
            p.vy += dy * force * 0.01;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Damping
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Lifecycle opacity
        const lifeRatio = p.life / p.maxLife;
        let currentOpacity = p.opacity;
        if (lifeRatio < 0.1) currentOpacity *= lifeRatio / 0.1;
        else if (lifeRatio > 0.8) currentOpacity *= (1 - lifeRatio) / 0.2;

        // Reset particle
        if (p.life > p.maxLife || p.y < -20 || p.x < -20 || p.x > rect.width + 20) {
          particlesRef.current[i] = createParticle(canvas, false);
          particlesRef.current[i].y = rect.height + 10;
          return;
        }

        // Draw pixel particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;

        if (p.size < 1.5) {
          // Tiny pixel
          ctx.fillRect(Math.floor(p.x), Math.floor(p.y), Math.ceil(p.size), Math.ceil(p.size));
        } else {
          // Slightly larger — soft circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      observer.disconnect();
    };
  }, [prefersReduced, actualCount, createParticle, mouseReactive]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
