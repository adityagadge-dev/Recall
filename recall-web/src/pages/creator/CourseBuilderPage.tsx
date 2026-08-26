import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  PlusCircle,
  FileText,
  Trash2,
  Save,
  CheckCircle2,
  Send,
  Layers,
  Zap,
  BookOpen,
  Sliders,
  AlertCircle,
} from 'lucide-react';

export const CourseBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('Advanced Compound Interest & Asset Defense');
  const [subject, setSubject] = useState('finance');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [description, setDescription] = useState('An applied masterclass in wealth preservation, predatory rate immunity, and retirement allocation.');
  const [modules, setModules] = useState([
    { id: 'mod_1', title: 'Module 1: The Mathematics of Compounding', lessons: ['Rule of 72 in Action', 'Real vs Nominal Yields'] },
    { id: 'mod_2', title: 'Module 2: High-Interest Debt Disarmament', lessons: ['Avalanche vs Snowball Protocol', 'APR Restructuring'] },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleAddModule = () => {
    const newMod = {
      id: `mod_${Date.now()}`,
      title: `Module ${modules.length + 1}: Practical Application`,
      lessons: ['New Core Lesson'],
    };
    setModules([...modules, newMod]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/creator');
    }, 1500);
  };

  return (
    <div id="course-builder-page" className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#BE123C]">
            <span>CURRICULUM_ARCHITECT_STUDIO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Course Builder</h1>
          <p className="text-xs text-slate-600 mt-1">
            Structure your course modules, lesson progression, and gamified XP values.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#BE123C] px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition shadow-lg shadow-[#BE123C]/20"
        >
          <Send className="h-4 w-4" />
          <span>Submit for Admin Review</span>
        </button>
      </div>

      {submitted && (
        <div className="rounded-2xl border border-rose-50 bg-lime-950/20 p-4 text-xs text-rose-500 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#BE123C]" />
          <span>Course submitted to Admin Governance queue for verification! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Metadata */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-[#4C0519]">Course Overview</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Course Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-[#4C0519] placeholder-slate-500 focus:border-[#BE123C] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Subject Pillar</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-[#4C0519] focus:border-[#BE123C] focus:outline-none"
              >
                <option value="finance">Financial Literacy</option>
                <option value="digital_safety">Digital Safety</option>
                <option value="first_aid">First Aid & Trauma</option>
                <option value="communication">Communication Skills</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-[#4C0519] focus:border-[#BE123C] focus:outline-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700 focus:border-[#BE123C] focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Modules Builder */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#4C0519]">Curriculum Modules & Lessons</h3>
            <button
              type="button"
              onClick={handleAddModule}
              className="flex items-center gap-1.5 rounded-xl border border-orange-500/40 bg-cyan-950/20 px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-orange-500/30 transition"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Module</span>
            </button>
          </div>

          <div className="space-y-4">
            {modules.map((mod, i) => (
              <div key={mod.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#BE123C] uppercase">Module {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => setModules(modules.filter(m => m.id !== mod.id))}
                    className="text-slate-600 hover:text-red-400 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={mod.title}
                  onChange={(e) => {
                    const updated = [...modules];
                    updated[i].title = e.target.value;
                    setModules(updated);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-[#4C0519] focus:border-[#BE123C] focus:outline-none"
                />

                <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Lessons in this module:</span>
                  {mod.lessons.map((les, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-slate-600" />
                      <input
                        type="text"
                        value={les}
                        onChange={(e) => {
                          const updated = [...modules];
                          updated[i].lessons[j] = e.target.value;
                          setModules(updated);
                        }}
                        className="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-600 focus:border-[#BE123C] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export const LessonEditorPage: React.FC = () => {
  const [lessonTitle, setLessonTitle] = useState('The Math of Compound Growth');
  const [intro, setIntro] = useState('Compound interest is the addition of interest to the principal sum of a loan or deposit.');
  const [mechanism, setMechanism] = useState('Future Value = Present Value * (1 + r/n)^(nt)');
  const [scenario, setScenario] = useState('You have $10,000 to invest at age 22 vs age 32 with a 7% real historical market return.');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div id="lesson-editor-page" className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#BE123C]">
            <span>LESSON_CONTENT_AUTHORING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Lesson Editor</h1>
          <p className="text-xs text-slate-600 mt-1">
            Author structured micro-lessons with actionable real-world simulations.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#BE123C] px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition shadow-lg shadow-[#BE123C]/20"
        >
          <Save className="h-4 w-4" />
          <span>{saved ? 'Saved!' : 'Save Lesson'}</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Lesson Title</label>
          <input
            type="text"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-[#4C0519] focus:border-[#BE123C] focus:outline-none"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">1. Conceptual Primer (Introduction)</label>
          <textarea
            rows={3}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 focus:border-[#BE123C] focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-[#BE123C] block">2. Core Mechanism & Formula</label>
          <textarea
            rows={2}
            value={mechanism}
            onChange={(e) => setMechanism(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-mono text-rose-500 focus:border-[#BE123C] focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-[#BE123C] block">3. Real-World Field Scenario</label>
          <textarea
            rows={3}
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 focus:border-[#BE123C] focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};

export const DiagnosticBuilderPage: React.FC = () => {
  return (
    <div id="diagnostic-builder-page" className="space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#BE123C]">
          <span>DIAGNOSTIC_CALIBRATION_ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Diagnostic & Rubric Builder</h1>
        <p className="text-xs text-slate-600 mt-1">
          Configure adaptive diagnostic tests and Feynman teach-back scoring criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-[#BE123C]">
            <Sliders className="h-5 w-5" />
          </div>
          <h4 className="text-base font-bold text-[#4C0519]">Rubric Calibration</h4>
          <p className="text-xs text-slate-600">Define expected mental models, causality checks, and misconception flags for AI grading.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-[#BE123C]">
            <Zap className="h-5 w-5" />
          </div>
          <h4 className="text-base font-bold text-[#4C0519]">Adaptive Difficulty Curve</h4>
          <p className="text-xs text-slate-600">Calibrate item response theory (IRT) weights for diagnostic baselines.</p>
        </div>
      </div>
    </div>
  );
};
