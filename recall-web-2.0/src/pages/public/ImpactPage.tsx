import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Zap,
  TrendingUp,
  ShieldAlert,
  HeartHandshake,
  DollarSign,
  ArrowRight,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const impacts = [
    {
      title: 'Financial Confidence',
      desc: 'Helping learners make better everyday financial decisions.',
      icon: DollarSign,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      hoverBorder: 'hover:border-amber-300',
    },
    {
      title: 'Digital Safety',
      desc: 'Helping people recognize digital threats and protect their identity.',
      icon: ShieldAlert,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      hoverBorder: 'hover:border-blue-300',
    },
    {
      title: 'Emergency Readiness',
      desc: 'Building confidence to respond when practical knowledge matters.',
      icon: HeartHandshake,
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-500',
      hoverBorder: 'hover:border-rose-300',
    },
    {
      title: 'Communication & Confidence',
      desc: 'Helping learners communicate clearly and handle real-world situations.',
      icon: TrendingUp,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      hoverBorder: 'hover:border-emerald-300',
    },
  ];

  const journeySteps = ['Learn', 'Understand', 'Practice', 'Apply', 'Build Confidence'];

  return (
    <div className="bg-[#FFFBF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 space-y-24">
        
        {/* Header */}
        <div className="max-w-3xl space-y-6 text-center mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F7F8FC] tracking-tight">
            Skills that make a difference beyond the classroom.
          </h1>
          <p className="text-lg text-[#9AA4B8] leading-relaxed max-w-2xl mx-auto">
            The absence of formal adult life-skills education creates real-world challenges. Recall is designed to close that gap by building measurable, practical capability.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, idx) => {
            const Icon = impact.icon;
            return (
              <div 
                key={idx}
                className={`group relative flex flex-col ${impact.bgColor} border ${impact.borderColor} ${impact.hoverBorder} p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-lg animate-in fade-in slide-in-from-bottom-8 fill-mode-both`}
                style={{ animationDelay: `${idx * 150 + 100}ms` }}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${impact.iconBg} ${impact.iconColor} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-[#F7F8FC] mb-3">{impact.title}</h4>
                <p className="text-sm text-[#9AA4B8] leading-relaxed flex-1">{impact.desc}</p>
                
                <div className={`mt-6 flex justify-end opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${impact.iconColor}`}>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Visualization Journey */}
        <div className="pt-16 pb-8 border-t border-[#323B4E]/60 max-w-4xl mx-auto">
           <div className="text-center mb-12 animate-in fade-in duration-700">
             <h3 className="text-xl font-bold text-[#F7F8FC]">The Path to Real-World Mastery</h3>
           </div>
           
           <div className="relative flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-1/2 z-0 overflow-hidden">
                 <div className="h-full bg-[#F7C928] w-full origin-left animate-in fade-in zoom-in-x-0 duration-1000 delay-500"></div>
              </div>
              
              {journeySteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="relative z-10 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                  style={{ animationDelay: `${idx * 150 + 600}ms` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#11151F] border-2 border-[#F7C928] text-[#F7F8FC] shadow-sm font-bold text-sm">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-semibold text-[#9AA4B8]">{step}</span>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};
