import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, ShieldCheck, HeartPulse, MessageSquareShare, ArrowRight, Target, Brain, Zap, Users, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';

export const SubjectsShowcasePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 space-y-24">
      {/* Header */}
      <div className="max-w-3xl space-y-6 text-center mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#F7F8FC] tracking-tight">
          Four skills everyone should know.
        </h1>
        <p className="text-lg text-[#9AA4B8] leading-relaxed max-w-2xl mx-auto">
          Recall turns essential real-world knowledge into practical, interactive learning. Build confidence for the moments that matter.
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
        {/* Abstract path behind cards (hidden on mobile) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#F7C928]/5 rounded-full blur-3xl -z-10"></div>
        
        {/* Financial Literacy */}
        <Link to="/app/subjects/financial-literacy" className="group relative flex flex-col bg-[#11151F] p-8 sm:p-10 rounded-3xl border border-[#323B4E] hover:border-[#F7C928]/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-in fade-in slide-in-from-bottom-8 delay-100 fill-mode-both">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110"></div>
          
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-600 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
            <Coins className="h-7 w-7" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#F7F8FC] mb-4">Financial Literacy</h2>
          <p className="text-[#9AA4B8] mb-8 flex-1 leading-relaxed">
            Build confidence with money, saving, budgeting and everyday financial decisions.
          </p>
          
          <div className="space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Example Skills</span>
            <ul className="space-y-2">
              {['Budgeting', 'Saving', 'Consumer Awareness', 'Fraud Awareness'].map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-[#9AA4B8]">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center text-sm font-bold text-[#F7F8FC] gap-2 pt-4 border-t border-[#1A2030] group-hover:text-amber-600 transition-colors">
            Explore Track <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Digital Safety */}
        <Link to="/app/subjects/digital-safety" className="group relative flex flex-col bg-[#11151F] p-8 sm:p-10 rounded-3xl border border-[#323B4E] hover:border-blue-400/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-in fade-in slide-in-from-bottom-8 delay-200 fill-mode-both">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110"></div>
          
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-600 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
            <ShieldCheck className="h-7 w-7" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#F7F8FC] mb-4">Digital Safety</h2>
          <p className="text-[#9AA4B8] mb-8 flex-1 leading-relaxed">
            Learn how to recognize threats and protect your digital life.
          </p>
          
          <div className="space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Example Skills</span>
            <ul className="space-y-2">
              {['Phishing', 'Privacy', 'Passwords', 'Scams'].map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-[#9AA4B8]">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center text-sm font-bold text-[#F7F8FC] gap-2 pt-4 border-t border-[#1A2030] group-hover:text-blue-600 transition-colors">
            Explore Track <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>

        {/* First Aid */}
        <Link to="/app/subjects/first-aid" className="group relative flex flex-col bg-[#11151F] p-8 sm:p-10 rounded-3xl border border-[#323B4E] hover:border-rose-300/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-in fade-in slide-in-from-bottom-8 delay-300 fill-mode-both">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110"></div>
          
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-600 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
            <HeartPulse className="h-7 w-7" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#F7F8FC] mb-4">First Aid</h2>
          <p className="text-[#9AA4B8] mb-8 flex-1 leading-relaxed">
            Build confidence for situations where knowing what to do matters.
          </p>
          
          <div className="space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Example Skills</span>
            <ul className="space-y-2">
              {['Emergency Response', 'Basic First Aid', 'Safety', 'First Response'].map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-[#9AA4B8]">
                  <div className="h-1.5 w-1.5 rounded-full bg-rose-400"></div>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center text-sm font-bold text-[#F7F8FC] gap-2 pt-4 border-t border-[#1A2030] group-hover:text-rose-500 transition-colors">
            Explore Track <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Communication Skills */}
        <Link to="/app/subjects/communication" className="group relative flex flex-col bg-[#11151F] p-8 sm:p-10 rounded-3xl border border-[#323B4E] hover:border-emerald-400/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-in fade-in slide-in-from-bottom-8 delay-400 fill-mode-both">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110"></div>
          
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
            <MessageSquareShare className="h-7 w-7" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#F7F8FC] mb-4">Communication Skills</h2>
          <p className="text-[#9AA4B8] mb-8 flex-1 leading-relaxed">
            Communicate clearly, listen better and handle difficult conversations.
          </p>
          
          <div className="space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Example Skills</span>
            <ul className="space-y-2">
              {['Listening', 'Confidence', 'Conflict Handling', 'Professional Communication'].map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-[#9AA4B8]">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center text-sm font-bold text-[#F7F8FC] gap-2 pt-4 border-t border-[#1A2030] group-hover:text-emerald-600 transition-colors">
            Explore Track <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export const HowItWorksPage: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const steps = [
    { num: '01', title: 'Diagnose', desc: 'Recall starts by understanding what you already know.', icon: Target },
    { num: '02', title: 'Learn', desc: 'Bite-sized, practical lessons adapt to your level.', icon: Brain },
    { num: '03', title: 'Practice', desc: 'Apply concepts in interactive real-world scenarios.', icon: Zap },
    { num: '04', title: 'Teach Back', desc: 'Explain it in your own words to prove true mastery.', icon: Users },
    { num: '05', title: 'Progress', desc: 'Turn new knowledge into lasting habits and capability.', icon: TrendingUp },
  ];

  return (
    <div className="bg-[#11151F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 space-y-24">
        {/* Header */}
        <div className="max-w-3xl space-y-6 text-center mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F7F8FC] tracking-tight">
            How Recall turns learning into action.
          </h1>
          <p className="text-lg text-[#9AA4B8] leading-relaxed max-w-2xl mx-auto">
            Recall first understands where you are, adapts your learning, provides practice, checks understanding, and turns progress into a habit.
          </p>
        </div>

        {/* Timeline Journey */}
        <div className="relative py-12">
          {/* Horizontal Line (Desktop) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-8 right-8 h-1 bg-[#1A2030] rounded-full z-0 overflow-hidden">
            <div className="h-full bg-[#F7C928] w-full origin-left animate-in fade-in zoom-in-x-0 duration-1000 delay-300"></div>
          </div>
          
          {/* Vertical Line (Mobile) */}
          <div className="lg:hidden absolute top-8 bottom-8 left-[3.25rem] w-1 bg-[#1A2030] rounded-full z-0 overflow-hidden">
            <div className="w-full h-full bg-[#F7C928] origin-top animate-in fade-in zoom-in-y-0 duration-1000 delay-300"></div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isHovered = hoveredStep === idx;
              return (
                <div 
                  key={step.num}
                  className="flex flex-row lg:flex-col items-center lg:items-center gap-6 lg:gap-6 lg:w-48 group animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                  style={{ animationDelay: `${idx * 150 + 300}ms` }}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-300 bg-[#11151F] shadow-sm group-hover:-translate-y-2 group-hover:shadow-md ${isHovered ? 'border-[#F7C928] text-[#F7C928]' : 'border-[#323B4E] text-[#687286]'}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="lg:text-center flex-1">
                    <span className="text-xs font-bold text-[#687286] mb-1 block">STEP {step.num}</span>
                    <h3 className="text-xl font-bold text-[#F7F8FC] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#9AA4B8] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-12 border-t border-[#1A2030]">
          
          {/* Teach-Back Highlight */}
          <div className="rounded-3xl bg-[#11151F] border border-emerald-500/30 p-10 flex flex-col justify-center items-start group hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#F7F8FC] mb-4">Don't just answer it.<br/>Explain it.</h3>
            <p className="text-[#9AA4B8] leading-relaxed mb-6">
              Multiple choice tests are easy to guess. Recall uses the Teach Back method—asking you to explain concepts in your own words to prove you truly understand them.
            </p>
            <div className="mt-auto bg-[#11151F]/60 p-4 rounded-xl border border-emerald-200/50 w-full text-sm font-medium text-emerald-400">
              "So phishing is when someone pretends to be a trusted source to steal your data..."
            </div>
          </div>

          {/* Spin & Teach Preview */}
          <div className="rounded-3xl bg-[#11151F] border border-[#F7C928]/30 p-10 flex flex-col justify-center items-center text-center group hover:-translate-y-1 transition-transform duration-300 overflow-hidden relative">
            <div className="absolute top-10 right-10 w-64 h-64 border-[30px] border-white/40 rounded-full animate-spin opacity-50 transition-all duration-700 group-hover:scale-110" style={{ animationDuration: '30s' }}></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center mb-6 group-hover:rotate-180 transition-transform duration-700">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#F7F8FC] mb-4">Learn it. Spin it. Explain it.</h3>
              <p className="text-[#9AA4B8] leading-relaxed mb-8 max-w-sm">
                Keep your skills sharp with random daily challenges based on past topics.
              </p>
              
              <button className="bg-[#11151F] rounded-full px-6 py-3 font-bold text-[#F7F8FC] border border-[#323B4E] shadow-sm flex items-center gap-2 group-hover:border-[#F7C928] transition-colors">
                <span>Spin the Wheel</span>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
