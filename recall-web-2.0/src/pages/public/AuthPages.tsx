import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useSignIn, useSignUp } from '@clerk/clerk-react';

const SocialIcons = () => (
  <div className="flex justify-center gap-4 mb-6">
    <button
      type="button"
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#687286] hover:border-white/30 hover:text-white transition-all bg-[#11151F]/5"
    >
      G
    </button>

    <button
      type="button"
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#687286] hover:border-white/30 hover:text-white transition-all bg-[#11151F]/5"
    >
      in
    </button>
  </div>
);

const AuthContainer: React.FC<{
  role: 'learner' | 'creator';
  initialActive: boolean;
  SignInForm: React.ReactNode;
  SignUpForm: React.ReactNode;
  leftPanelContent: React.ReactNode;
  rightPanelContent: React.ReactNode;
}> = ({
  role,
  initialActive,
  SignInForm,
  SignUpForm,
  leftPanelContent,
  rightPanelContent,
}) => {
  const [isRightPanelActive, setIsRightPanelActive] =
    useState(initialActive);

  const accentColor =
    role === 'creator' ? 'bg-[#A78BFA]' : 'bg-[#FF6B61]';

  return (
    <div
      className="relative w-full max-w-4xl min-h-[600px] bg-[#11131A] rounded-3xl shadow-2xl overflow-hidden flex border border-white/10"
      style={{ transform: 'translateZ(0)' }}
    >
      <div
        className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out flex items-center justify-center px-12 ${
          isRightPanelActive
            ? 'translate-x-full opacity-100 z-50'
            : 'opacity-0 z-10 pointer-events-none'
        }`}
      >
        {SignUpForm}
      </div>

      <div
        className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out flex items-center justify-center px-12 z-20 ${
          isRightPanelActive
            ? 'translate-x-full opacity-0 pointer-events-none'
            : ''
        }`}
      >
        {SignInForm}
      </div>

      <div
        className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 ${
          isRightPanelActive ? '-translate-x-full' : ''
        }`}
      >
        <div
          className={`absolute top-0 -left-full w-[200%] h-full transition-transform duration-700 ease-in-out ${accentColor} text-white ${
            isRightPanelActive ? 'translate-x-1/2' : 'translate-x-0'
          }`}
        >
          <div
            className={`absolute top-0 left-0 flex flex-col items-center justify-center w-1/2 h-full px-12 text-center transition-transform duration-700 ease-in-out ${
              isRightPanelActive
                ? 'translate-x-0'
                : '-translate-x-[20%]'
            }`}
          >
            {leftPanelContent}

            <button
              type="button"
              onClick={() => setIsRightPanelActive(false)}
              className="mt-8 px-12 py-3 rounded-full border-2 border-white/30 font-bold uppercase tracking-wider text-sm hover:bg-[#11151F] hover:text-black transition-colors"
            >
              Sign In
            </button>
          </div>

          <div
            className={`absolute top-0 right-0 flex flex-col items-center justify-center w-1/2 h-full px-12 text-center transition-transform duration-700 ease-in-out ${
              isRightPanelActive
                ? 'translate-x-[20%]'
                : 'translate-x-0'
            }`}
          >
            {rightPanelContent}

            <button
              type="button"
              onClick={() => setIsRightPanelActive(true)}
              className="mt-8 px-12 py-3 rounded-full border-2 border-white/30 font-bold uppercase tracking-wider text-sm hover:bg-[#11151F] hover:text-black transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthForm: React.FC<{
  type: 'signin' | 'signup';
  role: 'learner' | 'creator';
  onSubmit: (
    e: React.FormEvent,
    data: {
      email: string;
      password: string;
      name: string;
    }
  ) => void;
}> = ({ type, role, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const isCreator = role === 'creator';

  const btnColor = isCreator
    ? 'bg-[#A78BFA] hover:bg-[#8B5CF6] text-[#11131A]'
    : 'bg-[#FF6B61] hover:bg-[#FF5247] text-white';

  return (
    <form
      className="w-full flex flex-col items-center"
      onSubmit={(e) =>
        onSubmit(e, {
          email,
          password,
          name,
        })
      }
    >
      <h1 className="text-3xl font-bold text-white mb-6">
        {type === 'signin' ? 'Sign In' : 'Create Account'}
      </h1>

      <SocialIcons />

      <span className="text-sm text-[#687286] mb-6">
        {type === 'signin'
          ? 'or use your email password'
          : 'or register with email'}
      </span>

      {type === 'signup' && (
        <div className="w-full relative mb-4">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#687286]" />

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#1A1D24] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-[#9AA4B8]"
            required
          />
        </div>
      )}

      <div className="w-full relative mb-4">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#687286]" />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#1A1D24] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-[#9AA4B8]"
          required
        />
      </div>

      <div className="w-full relative mb-4">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#687286]" />

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#1A1D24] border border-white/5 rounded-xl py-3 pl-12 pr-12 text-sm text-white outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-[#9AA4B8]"
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#687286] hover:text-white transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {type === 'signin' && (
        <a
          href="#"
          className="text-sm font-medium text-[#687286] hover:text-white transition-colors mb-6 mt-2 self-center"
        >
          Forgot your password?
        </a>
      )}

      <button
        type="submit"
        className={`mt-4 w-full ${btnColor} py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg`}
      >
        {type === 'signin' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

/* =========================================================
   LEARNER CLERK
   ========================================================= */

const ClerkLearnerSignIn: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    isLoaded,
    signIn,
    setActive,
  } = useSignIn();

  const {
    isLoaded: isSignUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();

  const [pendingVerification, setPendingVerification] =
    useState(false);

  const [verificationCode, setVerificationCode] =
    useState('');

  const handleSignIn = async (
    e: React.FormEvent,
    data: {
      email: string;
      password: string;
      name: string;
    }
  ) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({
          session: result.createdSessionId,
        });

        login('learner');
        navigate('/app');
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);

      alert(
        err?.errors?.[0]?.longMessage ||
          'Sign in failed. Please check your email and password.'
      );
    }
  };

  const handleSignUp = async (
    e: React.FormEvent,
    data: {
      email: string;
      password: string;
      name: string;
    }
  ) => {
    e.preventDefault();

    if (!isSignUpLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setPendingVerification(true);
    } catch (err: any) {
      console.error('Sign up failed:', err);

      alert(
        err?.errors?.[0]?.longMessage ||
          'Sign up failed. Please try again.'
      );
    }
  };

  const handleVerification = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!isSignUpLoaded) return;

    try {
      const result =
        await signUp.attemptEmailAddressVerification({
          code: verificationCode,
        });

      if (result.status === 'complete') {
        await setSignUpActive({
          session: result.createdSessionId,
        });

        login('learner');
        navigate('/setup');
      } else {
        alert(
          'Verification is not complete yet. Please check the code and try again.'
        );
      }
    } catch (err: any) {
      console.error('Verification failed:', err);

      alert(
        err?.errors?.[0]?.longMessage ||
          'Invalid verification code. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#07080C] flex items-center justify-center py-12 px-4 relative overflow-hidden">

      {pendingVerification ? (
        <div className="w-full max-w-md bg-[#11131A] rounded-3xl border border-white/10 p-10 text-center">

          <h1 className="text-3xl font-bold text-white mb-4">
            Verify Your Email
          </h1>

          <p className="text-[#687286] text-sm mb-8">
            We sent a verification code to your email.
            Enter it below to continue.
          </p>

          <form onSubmit={handleVerification}>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(e.target.value)
              }
              className="w-full bg-[#1A1D24] border border-white/5 rounded-xl py-4 px-4 text-center text-white text-lg tracking-[0.3em] outline-none focus:ring-2 focus:ring-[#FF6B61]/50 placeholder:text-[#687286] placeholder:tracking-normal"
              required
            />

            <button
              type="submit"
              className="mt-6 w-full bg-[#FF6B61] hover:bg-[#FF5247] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all"
            >
              Verify Email
            </button>

          </form>
        </div>
      ) : (
        <AuthContainer
          role="learner"
          initialActive={false}

          SignInForm={
            <AuthForm
              type="signin"
              role="learner"
              onSubmit={handleSignIn}
            />
          }

          SignUpForm={
            <AuthForm
              type="signup"
              role="learner"
              onSubmit={handleSignUp}
            />
          }

          leftPanelContent={
            <>
              <h1 className="text-4xl font-bold mb-4">
                Welcome Back!
              </h1>

              <p className="text-white/90 text-sm leading-relaxed mb-8">
                Login with your personal info.
              </p>
            </>
          }

          rightPanelContent={
            <>
              <h1 className="text-4xl font-bold mb-4">
                Hello, Learner!
              </h1>

              <p className="text-white/90 text-sm leading-relaxed mb-8">
                Start your journey today.
              </p>
            </>
          }
        />
      )}

    </div>
  );
};

/* =========================================================
   LEARNER MOCK
   ========================================================= */

const MockLearnerSignIn: React.FC = () => {
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
    navigate('/setup');
  };

  return (
    <div className="min-h-screen bg-[#07080C] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <AuthContainer
        role="learner"
        initialActive={false}

        SignInForm={
          <AuthForm
            type="signin"
            role="learner"
            onSubmit={handleSignIn}
          />
        }

        SignUpForm={
          <AuthForm
            type="signup"
            role="learner"
            onSubmit={handleSignUp}
          />
        }

        leftPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">
              Welcome Back!
            </h1>

            <p className="text-white/90 text-sm leading-relaxed mb-8">
              Login with your personal info.
            </p>
          </>
        }

        rightPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">
              Hello, Learner!
            </h1>

            <p className="text-white/90 text-sm leading-relaxed mb-8">
              Start your journey today.
            </p>
          </>
        }
      />
    </div>
  );
};

/* =========================================================
   CREATOR CLERK
   ========================================================= */

const ClerkCreatorSignIn: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    isLoaded,
    signIn,
    setActive,
  } = useSignIn();

  const {
    isLoaded: isSignUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();

  const handleSignIn = async (
    e: React.FormEvent,
    data: {
      email: string;
      password: string;
      name: string;
    }
  ) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({
          session: result.createdSessionId,
        });

        login('creator');
        navigate('/creator');
      }
    } catch (err: any) {
      console.error('Creator sign in failed:', err);

      alert(
        err?.errors?.[0]?.longMessage ||
          'Sign in failed. Please check your email and password.'
      );
    }
  };

  const handleSignUp = async (
    e: React.FormEvent,
    data: {
      email: string;
      password: string;
      name: string;
    }
  ) => {
    e.preventDefault();

    if (!isSignUpLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name,
      });

      if (result.status === 'complete') {
        await setSignUpActive({
          session: result.createdSessionId,
        });

        login('creator');
        navigate('/creator');
      } else {
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });

        alert(
          'Please complete the email verification required by Clerk.'
        );
      }
    } catch (err: any) {
      console.error('Creator sign up failed:', err);

      alert(
        err?.errors?.[0]?.longMessage ||
          'Sign up failed. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#07080C] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <AuthContainer
        role="creator"
        initialActive={false}

        SignInForm={
          <AuthForm
            type="signin"
            role="creator"
            onSubmit={handleSignIn}
          />
        }

        SignUpForm={
          <AuthForm
            type="signup"
            role="creator"
            onSubmit={handleSignUp}
          />
        }

        leftPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">
              Welcome, Creator!
            </h1>

            <p className="text-white/90 text-sm leading-relaxed mb-8">
              Log in to manage your research.
            </p>
          </>
        }

        rightPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">
              Become a Creator
            </h1>

            <p className="text-white/90 text-sm leading-relaxed mb-8">
              Apply to join our expert network.
            </p>
          </>
        }
      />
    </div>
  );
};

/* =========================================================
   CREATOR MOCK
   ========================================================= */

const MockCreatorSignIn: React.FC = () => {
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
      <AuthContainer
        role="creator"
        initialActive={false}

        SignInForm={
          <AuthForm
            type="signin"
            role="creator"
            onSubmit={handleSignIn}
          />
        }

        SignUpForm={
          <AuthForm
            type="signup"
            role="creator"
            onSubmit={handleSignUp}
          />
        }

        leftPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">
              Welcome, Creator!
            </h1>

            <p className="text-white/90 text-sm leading-relaxed mb-8">
              Log in to manage your research.
            </p>
          </>
        }

        rightPanelContent={
          <>
            <h1 className="text-4xl font-bold mb-4">
              Become a Creator
            </h1>

            <p className="text-white/90 text-sm leading-relaxed mb-8">
              Apply to join our expert network.
            </p>
          </>
        }
      />
    </div>
  );
};

/* =========================================================
   EXPORTED PAGES
   ========================================================= */

export const SignInPage: React.FC = () => {
  const clerkPubKey =
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return clerkPubKey ? (
    <ClerkLearnerSignIn />
  ) : (
    <MockLearnerSignIn />
  );
};

export const SignUpPage: React.FC = () => {
  return <SignInPage />;
};

export const CreatorSignInPage: React.FC = () => {
  const clerkPubKey =
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return clerkPubKey ? (
    <ClerkCreatorSignIn />
  ) : (
    <MockCreatorSignIn />
  );
};

export const CreatorApplyPage: React.FC = () => {
  return <CreatorSignInPage />;
};