import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, User, Mail, Lock, Building, Github, Facebook, Linkedin } from 'lucide-react';
import { RecallLogo } from '../../components/brand/RecallLogo';
import { AuthContainer } from '../../components/auth/AuthContainer';

const SocialIcons = () => (
  <div className="flex gap-3 my-5">
    <a href="#" className="w-10 h-10 border border-[#323B4E] bg-[#11151F] rounded-lg flex items-center justify-center text-[#9AA4B8] hover:bg-[#1A2030] hover:text-[#F7F8FC] transition-colors">
      <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
    </a>
    <a href="#" className="w-10 h-10 border border-[#323B4E] bg-[#11151F] rounded-lg flex items-center justify-center text-[#9AA4B8] hover:bg-[#1A2030] hover:text-[#1877F2] transition-colors">
      <Facebook className="w-5 h-5" />
    </a>
    <a href="#" className="w-10 h-10 border border-[#323B4E] bg-[#11151F] rounded-lg flex items-center justify-center text-[#9AA4B8] hover:bg-[#1A2030] hover:text-[#F7F8FC] transition-colors">
      <Github className="w-5 h-5" />
    </a>
    <a href="#" className="w-10 h-10 border border-[#323B4E] bg-[#11151F] rounded-lg flex items-center justify-center text-[#9AA4B8] hover:bg-[#1A2030] hover:text-[#0A66C2] transition-colors">
      <Linkedin className="w-5 h-5" />
    </a>
  </div>
);

const AuthForm = ({ type, role, onSubmit }: { type: 'signin' | 'signup', role: 'learner' | 'creator', onSubmit: (e: React.FormEvent) => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isCreator = role === 'creator';
  const btnColor = isCreator ? 'bg-[#8B72C9] hover:bg-[#7A61B8]' : 'bg-[#E97870] hover:bg-[#D8675F]';

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#25364A] mb-2">{type === 'signin' ? 'Sign In' : 'Create Account'}</h1>
      
      <SocialIcons />
      <span className="text-sm text-slate-500 mb-6">{type === 'signin' ? 'or use your email password' : 'or register with email'}</span>
      
      {type === 'signup' && (
        <div className="w-full relative mb-3">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Name" className="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#25364A]/20 transition-all" required />
        </div>
      )}
      
      {type === 'signup' && isCreator && (
        <div className="w-full relative mb-3">
          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Organization / Institution" className="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#25364A]/20 transition-all" />
        </div>
      )}

      <div className="w-full relative mb-3">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input type="email" placeholder="Email" className="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#25364A]/20 transition-all" required />
      </div>

      <div className="w-full relative mb-3">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#25364A]/20 transition-all" required />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {type === 'signin' && (
        <a href="#" className="text-sm font-medium text-slate-500 hover:text-[#25364A] transition-colors mb-6 mt-2 self-center">Forgot your password?</a>
      )}

      <button type="submit" className={`mt-6 w-full ${btnColor} text-white py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-md`}>
        {type === 'signin' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export const SignInPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login('learner');
    navigate('/app');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    login('learner');
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#07080C] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-50">
        <RecallLogo />
      </div>
      <AuthContainer 
        role="learner"
        initialActive={false}
        SignInForm={<AuthForm type="signin" role="learner" onSubmit={handleSignIn} />}
        SignUpForm={<AuthForm type="signup" role="learner" onSubmit={handleSignUp} />}
        leftPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-white/90 text-sm leading-relaxed mb-6">To keep connected with your learning journey, please login with your personal info.</p>
          </>
        }
        rightPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">Hello, Learner!</h1>
            <p className="text-white/90 text-sm leading-relaxed mb-6">Enter your personal details and start your journey of learning the skills life never taught you.</p>
          </>
        }
      />
    </div>
  );
};

export const SignUpPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login('learner');
    navigate('/app');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    login('learner');
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#07080C] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-50">
        <RecallLogo />
      </div>
      <AuthContainer 
        role="learner"
        initialActive={true}
        SignInForm={<AuthForm type="signin" role="learner" onSubmit={handleSignIn} />}
        SignUpForm={<AuthForm type="signup" role="learner" onSubmit={handleSignUp} />}
        leftPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-white/90 text-sm leading-relaxed mb-6">To keep connected with your learning journey, please login with your personal info.</p>
          </>
        }
        rightPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">Hello, Learner!</h1>
            <p className="text-white/90 text-sm leading-relaxed mb-6">Enter your personal details and start your journey of learning the skills life never taught you.</p>
          </>
        }
      />
    </div>
  );
};

export const CreatorSignInPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login('creator');
    navigate('/creator');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    login('creator');
    navigate('/creator');
  };

  return (
    <div className="min-h-screen bg-[#07080C] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-50">
        <RecallLogo color="#A78BFA" />
      </div>
      <AuthContainer 
        role="creator"
        initialActive={false}
        SignInForm={<AuthForm type="signin" role="creator" onSubmit={handleSignIn} />}
        SignUpForm={<AuthForm type="signup" role="creator" onSubmit={handleSignUp} />}
        leftPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">Welcome, Creator!</h1>
            <p className="text-white/90 text-sm leading-relaxed mb-6">Log in to manage your research, configure assessments, and build courses.</p>
          </>
        }
        rightPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">Become a Creator</h1>
            <p className="text-white/90 text-sm leading-relaxed mb-6">Apply to join our expert network and help shape the next generation of life skills.</p>
          </>
        }
      />
    </div>
  );
};

export const CreatorApplyPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login('creator');
    navigate('/creator');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    login('creator');
    navigate('/creator');
  };

  return (
    <div className="min-h-screen bg-[#07080C] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-50">
        <RecallLogo color="#A78BFA" />
      </div>
      <AuthContainer 
        role="creator"
        initialActive={true}
        SignInForm={<AuthForm type="signin" role="creator" onSubmit={handleSignIn} />}
        SignUpForm={<AuthForm type="signup" role="creator" onSubmit={handleSignUp} />}
        leftPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">Welcome, Creator!</h1>
            <p className="text-white/90 text-sm leading-relaxed mb-6">Log in to manage your research, configure assessments, and build courses.</p>
          </>
        }
        rightPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">Become a Creator</h1>
            <p className="text-white/90 text-sm leading-relaxed mb-6">Apply to join our expert network and help shape the next generation of life skills.</p>
          </>
        }
      />
    </div>
  );
};
