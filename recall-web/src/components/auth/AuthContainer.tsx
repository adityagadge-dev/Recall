import React, { useState, useEffect } from 'react';

interface AuthContainerProps {
  role: 'learner' | 'creator';
  initialActive?: boolean;
  SignInForm: React.ReactNode;
  SignUpForm: React.ReactNode;
  leftPanelContent: React.ReactNode;
  rightPanelContent: React.ReactNode;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  role,
  initialActive = false,
  SignInForm,
  SignUpForm,
  leftPanelContent,
  rightPanelContent
}) => {
  const [isActive, setIsActive] = useState(initialActive);

  useEffect(() => {
    setIsActive(initialActive);
  }, [initialActive]);

  return (
    <div className={`auth-container-wrapper relative flex items-center justify-center min-h-[600px] w-full max-w-[850px] mx-auto bg-white rounded-[30px] shadow-2xl overflow-hidden ${isActive ? 'active' : ''}`}>
      
      {/* Sign Up */}
      <div className="form-container sign-up absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col justify-center items-center px-10 transition-all duration-600 ease-in-out opacity-0 z-10">
        {SignUpForm}
      </div>

      {/* Sign In */}
      <div className="form-container sign-in absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col justify-center items-center px-10 transition-all duration-600 ease-in-out z-20">
        {SignInForm}
      </div>

      {/* Toggle Container */}
      <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out rounded-l-[100px] z-50">
        <div className={`toggle absolute top-0 left-[-100%] w-[200%] h-full transition-all duration-600 ease-in-out ${role === 'learner' ? 'bg-gradient-to-r from-[#C9514E] to-[#E97870]' : 'bg-gradient-to-r from-[#60479C] to-[#8B72C9]'} text-white`}>
          
          <div className="toggle-panel toggle-left absolute w-1/2 h-full flex flex-col items-center justify-center px-10 text-center top-0 left-0 transition-all duration-600 ease-in-out">
            {leftPanelContent}
            <button 
              className="mt-6 px-10 py-3 bg-transparent border-2 border-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setIsActive(false)}
            >
              Sign In
            </button>
          </div>

          <div className="toggle-panel toggle-right absolute w-1/2 h-full flex flex-col items-center justify-center px-10 text-center top-0 right-0 transition-all duration-600 ease-in-out">
            {rightPanelContent}
            <button 
              className="mt-6 px-10 py-3 bg-transparent border-2 border-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setIsActive(true)}
            >
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
