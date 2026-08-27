import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Target, Shield, HeartPulse, MessageSquare, CheckCircle2 } from 'lucide-react';
import { RecallLogo } from '../../components/brand/RecallLogo';

const GOALS = [
  { id: 'finance', title: 'Financial Literacy', icon: Target, description: 'Master personal finance and wealth building' },
  { id: 'safety', title: 'Digital Safety', icon: Shield, description: 'Protect your digital identity and privacy' },
  { id: 'health', title: 'Emergency First Aid', icon: HeartPulse, description: 'Learn life-saving emergency protocols' },
  { id: 'comm', title: 'Communication', icon: MessageSquare, description: 'Enhance professional and personal communication' },
];

const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'Beginner', desc: 'Starting fresh' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
  { id: 'advanced', label: 'Advanced', desc: 'Looking to master' },
];

export const UserSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    setIsSubmitting(true);
    // Simulate API call to save user profile preferences
    setTimeout(() => {
      // Redirect to the dashboard
      navigate('/app');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#07080C] text-[#F7F8FC] flex flex-col font-sans selection:bg-[#FF6B61]/30">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <RecallLogo color="#F7F8FC" />
        <div className="text-sm font-medium text-[#687286]">
          Step {step} of 2
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-0">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full max-h-[600px] bg-[#FF6B61]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-xl relative z-10">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Welcome to Recall.</h1>
                <p className="text-[#9AA4B8] text-lg">Let's set up your profile to personalize your learning journey.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-[#9AA4B8] uppercase tracking-wider">What should we call you?</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name or nickname"
                    className="w-full rounded-2xl border border-[#323B4E] bg-[#11151F] px-5 py-4 text-[#F7F8FC] placeholder-[#687286] focus:border-[#FF6B61] focus:ring-1 focus:ring-[#FF6B61] focus:outline-none transition-all text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#9AA4B8] uppercase tracking-wider">Prior Experience Level</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {EXPERIENCE_LEVELS.map(level => (
                      <button
                        key={level.id}
                        onClick={() => setExperience(level.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                          experience === level.id
                            ? 'border-[#FF6B61] bg-[#FF6B61]/10 text-[#FF6B61]'
                            : 'border-[#323B4E] bg-[#11151F] text-[#9AA4B8] hover:border-[#FF6B61]/50 hover:bg-[#1A2030]'
                        }`}
                      >
                        <span className="font-bold mb-1">{level.label}</span>
                        <span className="text-[10px] uppercase tracking-wider opacity-70">{level.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!name.trim() || !experience}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B61] py-4 text-sm font-bold text-white hover:bg-[#FF4D5A] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,107,97,0.2)] hover:shadow-[0_0_30px_rgba(255,107,97,0.4)]"
              >
                <span>Continue</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">What do you want to learn?</h1>
                <p className="text-[#9AA4B8] text-lg">Select the core skills you want to master first. We'll tailor your daily retrieval targets.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GOALS.map(goal => {
                  const isSelected = selectedGoals.includes(goal.id);
                  const Icon = goal.icon;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`relative flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-[#FF6B61] bg-[#FF6B61]/10'
                          : 'border-[#323B4E] bg-[#11151F] hover:border-[#FF6B61]/50 hover:bg-[#1A2030]'
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-4 ${
                        isSelected ? 'bg-[#FF6B61] text-white' : 'bg-[#1A2030] text-[#9AA4B8]'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className={`font-bold text-lg mb-1 ${isSelected ? 'text-[#F7F8FC]' : 'text-[#F7F8FC]'}`}>
                        {goal.title}
                      </h3>
                      <p className="text-xs text-[#687286] leading-relaxed">
                        {goal.description}
                      </p>
                      
                      {isSelected && (
                        <div className="absolute top-4 right-4 text-[#FF6B61]">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 rounded-2xl border border-[#323B4E] bg-[#11151F] text-[#9AA4B8] font-bold hover:bg-[#1A2030] hover:text-[#F7F8FC] transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={selectedGoals.length === 0 || isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B61] py-4 text-sm font-bold text-white hover:bg-[#FF4D5A] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,107,97,0.2)]"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <span>Complete Setup</span>
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};
