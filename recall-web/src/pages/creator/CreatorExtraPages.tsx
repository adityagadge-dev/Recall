import React, { useEffect, useState } from 'react';
import { TopicApi } from '../../services/topicApi';
import { Topic } from '../../types';
import {
  FileText,
  HelpCircle,
  Sliders,
  BarChart3,
  User,
  PlusCircle,
  CheckCircle2,
  Zap,
  TrendingUp,
  Sparkles,
  Bot,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const TopicManagementPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    TopicApi.getTopics().then((res) => setTopics(res.data));
  }, []);

  return (
    <div id="topic-management-page" className="space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#BE123C]">
          <span>TAXONOMY_NODE_CONTROLLER</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Topic Management</h1>
        <p className="text-xs text-slate-600 mt-1">
          Define core skill nodes, difficulty weights, and knowledge prerequisites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((t) => (
          <div key={t.id} className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded bg-orange-500/10 px-2 py-0.5 text-[10px] font-mono text-rose-500 font-bold uppercase">
                {t.subjectCategory}
              </span>
              <span className="text-xs text-slate-600 font-mono">{t.difficultyTier} Tier</span>
            </div>
            <h3 className="text-base font-bold text-[#4C0519]">{t.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
            <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs text-slate-600 font-mono">
              <span>{t.estimatedMinutes} Mins</span>
              <span className="text-[#BE123C] font-bold">+{t.xpValue} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const QuestionBankPage: React.FC = () => {
  return (
    <div id="question-bank-page" className="space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#BE123C]">
          <span>AI_ASSISTED_QUESTION_BANK</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Question Bank & AI Generator</h1>
        <p className="text-xs text-slate-600 mt-1">
          Author and curate diagnostic questions grounded in peer-reviewed research.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="flex items-center gap-2 text-[#BE123C] font-bold text-xs uppercase">
          <Bot className="h-4 w-4" />
          <span>Google ADK Question Synthesizer</span>
        </div>
        <p className="text-xs text-slate-600">
          Generate realistic high-pressure scenarios with automated distractor justification.
        </p>
        <button className="flex items-center gap-2 rounded-xl bg-[#BE123C] px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 transition">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Synthesize 5 Scenario Questions</span>
        </button>
      </div>
    </div>
  );
};

export const AssessmentConfigPage: React.FC = () => {
  return (
    <div id="assessment-config-page" className="space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#BE123C]">
          <span>ASSESSMENT_RUBRICS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Assessment Engine Configuration</h1>
        <p className="text-xs text-slate-600 mt-1">
          Calibrate teach-back rubric thresholds, misconception detectors, and mastery curves.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4">
        <h4 className="text-base font-bold text-[#4C0519]">Feynman Teach-Back Evaluation Settings</h4>
        <div className="space-y-3 text-xs text-slate-600">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span>Minimum Conceptual Completeness</span>
            <span className="font-mono text-[#BE123C] font-bold">75%</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span>Misconception Tolerance Penalty</span>
            <span className="font-mono text-[#BE123C] font-bold">-15 XP</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span>Real-World Example Bonus</span>
            <span className="font-mono text-[#BE123C] font-bold">+25 XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreatorAnalyticsPage: React.FC = () => {
  const data = [
    { month: 'Jan', learners: 420 },
    { month: 'Feb', learners: 680 },
    { month: 'Mar', learners: 1150 },
    { month: 'Apr', learners: 1480 },
  ];

  return (
    <div id="creator-analytics-page" className="space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#BE123C]">
          <span>CURRICULUM_IMPACT_TELEMETRY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Creator Analytics & Impact</h1>
        <p className="text-xs text-slate-600 mt-1">
          Measure student completion velocity, misconception hotspots, and rubric effectiveness.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="text-base font-bold text-[#4C0519]">Learner Growth Across Authored Tracks</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c2434" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#101522', borderColor: '#263145', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="learners" stroke="#06b6d4" strokeWidth={3} fill="#06b6d4" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const CreatorProfilePage: React.FC = () => {
  return (
    <div id="creator-profile-page" className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-6">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
            alt="Dr. Marcus Vance"
            className="h-20 w-20 rounded-full border-2 border-[#BE123C] object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#4C0519]">Dr. Marcus Vance, MD</h1>
              <span className="rounded bg-orange-500/20 px-2 py-0.5 text-xs font-bold text-rose-500 border border-orange-500/30">
                Verified Fellow
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">marcus@recall.institute • Joined February 2026</p>
            <p className="text-xs text-slate-600 mt-2">
              Emergency Medicine Specialist & Clinical Curriculum Lead for First Aid & Trauma Response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
