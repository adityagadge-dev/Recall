import React, { useEffect, useRef, useState } from 'react';
import { Coins, ShieldCheck, HeartPulse, MessageSquareShare } from 'lucide-react';

interface NodePoint {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glow: string;
  icon: React.ElementType;
  skills: string[];
}

export const KineticConstellation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<NodePoint | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // 4 Primary nodes
    const primaryNodes: NodePoint[] = [
      {
        id: 'fin',
        name: 'Financial Literacy',
        category: 'finance',
        x: width * 0.25,
        y: height * 0.35,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 36,
        color: '#F59E0B',
        glow: 'rgba(245, 158, 11, 0.4)',
        icon: Coins,
        skills: ['Zero-Based Allocation', 'Rule of 72', 'Predatory APR Defense'],
      },
      {
        id: 'sec',
        name: 'Digital Safety',
        category: 'digital_safety',
        x: width * 0.75,
        y: height * 0.3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 36,
        color: '#06B6D4',
        glow: 'rgba(6, 182, 212, 0.4)',
        icon: ShieldCheck,
        skills: ['Spear-Phishing Triage', 'Passkey Architecture', 'Metadata Scrubbing'],
      },
      {
        id: 'aid',
        name: 'First Aid & Trauma',
        category: 'first_aid',
        x: width * 0.35,
        y: height * 0.72,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 36,
        color: '#84CC16',
        glow: 'rgba(132, 204, 22, 0.4)',
        icon: HeartPulse,
        skills: ['DRSABCD Sequence', 'High-Quality CPR', 'Arterial Bleed Control'],
      },
      {
        id: 'com',
        name: 'Communication Skills',
        category: 'communication',
        x: width * 0.7,
        y: height * 0.75,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 36,
        color: '#C084FC',
        glow: 'rgba(192, 132, 252, 0.4)',
        icon: MessageSquareShare,
        skills: ['Mirror & Label', 'Minto Briefing', 'Boundary Architecture'],
      },
    ];

    // Sub-orbiting particles
    const subParticles: { x: number; y: number; vx: number; vy: number; parentIndex: number; color: string }[] = [];
    for (let i = 0; i < 28; i++) {
      const parentIndex = i % 4;
      const parent = primaryNodes[parentIndex];
      subParticles.push({
        x: parent.x + (Math.random() - 0.5) * 140,
        y: parent.y + (Math.random() - 0.5) * 140,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        parentIndex,
        color: parent.color,
      });
    }

    let pulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulse += 0.03;

      // Update primary nodes gently with boundary bounds
      primaryNodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 80 || node.x > width - 80) node.vx *= -1;
        if (node.y < 80 || node.y > height - 80) node.vy *= -1;

        // Subtle mouse repulsion
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          node.x -= (dx / dist) * 1.5;
          node.y -= (dy / dist) * 1.5;
        }
      });

      // Update sub particles tethered to parent
      subParticles.forEach((p) => {
        const parent = primaryNodes[p.parentIndex];
        p.x += p.vx;
        p.y += p.vy;

        // Tether pull toward parent
        const pdx = parent.x - p.x;
        const pdy = parent.y - p.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist > 120) {
          p.vx += pdx * 0.003;
          p.vy += pdy * 0.003;
        }

        // Draw sub particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connection to parent
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(parent.x, parent.y);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0, 0.2 - pdist / 600);
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw connecting lines between primary nodes
      for (let i = 0; i < primaryNodes.length; i++) {
        for (let j = i + 1; j < primaryNodes.length; j++) {
          const n1 = primaryNodes[i];
          const n2 = primaryNodes[j];
          const dist = Math.sqrt((n1.x - n2.x) ** 2 + (n1.y - n2.y) ** 2);

          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = '#334155';
          ctx.globalAlpha = 0.4;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;

          // Animated energy packet traversing the line
          const progress = (Math.sin(pulse + i + j) + 1) / 2;
          const px = n1.x + (n2.x - n1.x) * progress;
          const py = n1.y + (n2.y - n1.y) * progress;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#A3E635';
          ctx.shadowColor = '#A3E635';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw primary node halos & rings
      primaryNodes.forEach((node) => {
        const ringPulse = Math.sin(pulse * 2) * 6;

        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 10, node.x, node.y, node.radius + 20 + ringPulse);
        gradient.addColorStop(0, node.glow);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 20 + ringPulse, 0, Math.PI * 2);
        ctx.fill();

        // Node base
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#111622';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = node.color;
        ctx.stroke();

        // Inner orbital ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 8, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my };

      // Check hover
      let found: NodePoint | null = null;
      for (const n of primaryNodes) {
        const dist = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);
        if (dist <= n.radius + 10) {
          found = n;
          break;
        }
      }
      setActiveNode(found);
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      setActiveNode(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full min-h-[460px] overflow-hidden rounded-2xl border border-[#222a3a] bg-[#0c0f15]/80 backdrop-blur-sm">
      <canvas ref={canvasRef} className="h-full w-full cursor-pointer" />

      {/* Floating Node Info Tooltip on hover */}
      {activeNode && (
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs rounded-xl border border-slate-700 bg-[#121722]/95 p-4 shadow-2xl backdrop-blur-md transition-all">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: activeNode.color }} />
            <h4 className="text-sm font-bold text-white">{activeNode.name}</h4>
          </div>
          <p className="text-xs text-[#687286] mb-2">Core Neural Mastery Pathway</p>
          <div className="flex flex-wrap gap-1.5">
            {activeNode.skills.map((skill, i) => (
              <span key={i} className="rounded-md border border-slate-800 bg-[#19202e] px-2 py-0.5 text-[11px] text-[#687286] font-mono">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Legend in corner */}
      <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-slate-800 bg-[#10141d]/80 px-3 py-1 text-[11px] text-[#687286] backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-lime-400 animate-ping" />
        <span>Kinetic Skill Graph • Interactive</span>
      </div>
    </div>
  );
};
