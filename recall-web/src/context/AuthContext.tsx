import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, LearnerProfile, CreatorProfile, AdminProfile } from '../types';
import { AuthApi } from '../services/authApi';
import { MOCK_LEARNER_USER, MOCK_CREATOR_USER, MOCK_ADMIN_USER } from '../mock/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  switchDevRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to learner for immediate interactive demo preview
  const [role, setRole] = useState<UserRole>('learner');
  const [user, setUser] = useState<User | null>(MOCK_LEARNER_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const switchDevRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'learner') setUser(MOCK_LEARNER_USER);
    else if (newRole === 'creator') setUser(MOCK_CREATOR_USER);
    else if (newRole === 'admin') setUser(MOCK_ADMIN_USER);
    else setUser(null);
  };

  const signIn = async (email: string, selectedRole: UserRole) => {
    setIsLoading(true);
    try {
      const res = await AuthApi.signIn(email, selectedRole);
      setRole(selectedRole);
      setUser(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await AuthApi.signOut();
      setUser(null);
      setRole('guest');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user && role !== 'guest',
        isLoading,
        signIn,
        signOut,
        switchDevRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
