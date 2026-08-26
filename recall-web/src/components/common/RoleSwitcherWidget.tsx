import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';
import { Shield, Sparkles, GraduationCap, Compass, Check, ChevronUp, ChevronDown, Lock } from 'lucide-react';

export const RoleSwitcherWidget: React.FC = () => {
  const { role, switchDevRole, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const roles: { role: UserRole; title: string; route: string; icon: React.ElementType; color: string; desc: string }[] = [
    {
      role: 'learner',
      title: 'Student / Learner',
      route: '/app',
      icon: GraduationCap,
      color: 'text-lime-400 border-lime-500/30 bg-lime-950/30',
      desc: 'Discover, learn, quiz, teach-back, earn XP & streaks',
    },
    {
      role: 'creator',
      title: 'Creator',
      route: '/creator',
      icon: Sparkles,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
      desc: 'Research, course builder, diagnostic & assessment config',
    },
    {
      role: 'admin',
      title: 'Admin Governance',
      route: '/admin',
      icon: Shield,
      color: 'text-teal-400 border-teal-600/30 bg-amber-950/30',
      desc: 'Platform telemetry, course approval, audit & gamification',
    },
    {
      role: 'guest',
      title: 'Public Explorer',
      route: '/',
      icon: Compass,
      color: 'text-purple-400 border-purple-500/30 bg-purple-950/30',
      desc: 'Landing page, public subjects showcase, how it works',
    },
  ];

  const handleSelectRole = (newRole: UserRole, targetRoute: string) => {
    switchDevRole(newRole);
    navigate(targetRoute);
    setIsOpen(false);
  };

  return (
    <div id="role-switcher-widget" className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-3 w-80 rounded-xl border border-[#262f3f] bg-[#0f131a]/95 p-4 shadow-2xl backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between border-b border-[#202735] pb-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dev Role Simulator</span>
              <p className="text-[11px] text-slate-500">Clerk / Role-Aware Integration Layer</p>
            </div>
            <span className="rounded-md border border-lime-500/30 bg-lime-500/10 px-2 py-0.5 text-[10px] font-medium text-lime-300">
              Mock Mode
            </span>
          </div>

          <div className="space-y-2">
            {roles.map((r) => {
              const Icon = r.icon;
              const isCurrent = role === r.role;
              return (
                <button
                  key={r.role}
                  id={`switch-role-${r.role}`}
                  onClick={() => handleSelectRole(r.role, r.route)}
                  className={`group flex w-full items-start gap-3 rounded-lg border p-2.5 text-left transition-all ${
                    isCurrent
                      ? `${r.color} shadow-sm ring-1 ring-white/10`
                      : 'border-[#1e2533] bg-[#141822]/60 hover:border-slate-700 hover:bg-[#1a202c]'
                  }`}
                >
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${r.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-lime-300">
                        {r.title}
                      </span>
                      {isCurrent && <Check className="h-3.5 w-3.5 text-lime-400" />}
                    </div>
                    <p className="line-clamp-1 text-[10px] text-slate-400">{r.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 border-t border-[#202735] pt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>User: <strong className="text-slate-200">{user?.name || 'Guest'}</strong></span>
            <span className="text-slate-500">Clerk ready</span>
          </div>
        </div>
      )}

      <button
        id="role-switcher-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-lime-500/40 bg-[#12161f] px-3.5 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md transition hover:border-lime-400 hover:bg-[#181e2b] hover:shadow-lime-500/10"
      >
        <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
        <span>Role: <strong className="text-lime-300 capitalize">{role}</strong></span>
        {isOpen ? <ChevronDown className="h-3.5 w-3.5 text-slate-400" /> : <ChevronUp className="h-3.5 w-3.5 text-slate-400" />}
      </button>
    </div>
  );
};
