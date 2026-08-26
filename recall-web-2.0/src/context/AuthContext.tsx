import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_LEARNER_USER, MOCK_CREATOR_USER, MOCK_ADMIN_USER } from '../mock/mockData';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, role: UserRole) => Promise<void>;
  login: (role: UserRole) => void;
  signOut: () => Promise<void>;
  switchDevRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ClerkAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerkAuth();

  const [devRole, setDevRole] = useState<UserRole>('learner');
  
  const role: UserRole = clerkUser 
    ? ((clerkUser.publicMetadata.role as UserRole) || 'learner') 
    : devRole;
    
  let user: User | null = null;
  if (clerkUser) {
    user = {
      id: clerkUser.id,
      name: clerkUser.fullName || 'User',
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      role: role,
      avatarUrl: clerkUser.imageUrl,
      createdAt: clerkUser.createdAt ? new Date(clerkUser.createdAt).toISOString() : new Date().toISOString(),
      lastActive: new Date().toISOString(),
      status: 'active'
    } as any;
  } else {
    if (devRole === 'learner') user = MOCK_LEARNER_USER;
    else if (devRole === 'creator') user = MOCK_CREATOR_USER;
    else if (devRole === 'admin') user = MOCK_ADMIN_USER;
  }

  const switchDevRole = (newRole: UserRole) => setDevRole(newRole);
  const login = (selectedRole: UserRole) => setDevRole(selectedRole);
  const signIn = async (email: string, selectedRole: UserRole) => setDevRole(selectedRole);
  const signOut = async () => {
    if (clerkUser) await clerkSignOut();
    setDevRole('guest');
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated: !!clerkUser || devRole !== 'guest', isLoading: !isLoaded, signIn, login, signOut, switchDevRole }}>
      {children}
    </AuthContext.Provider>
  );
};

const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devRole, setDevRole] = useState<UserRole>('learner');
  
  let user: User | null = null;
  if (devRole === 'learner') user = MOCK_LEARNER_USER;
  else if (devRole === 'creator') user = MOCK_CREATOR_USER;
  else if (devRole === 'admin') user = MOCK_ADMIN_USER;

  const switchDevRole = (newRole: UserRole) => setDevRole(newRole);
  const login = (selectedRole: UserRole) => setDevRole(selectedRole);
  const signIn = async (email: string, selectedRole: UserRole) => setDevRole(selectedRole);
  const signOut = async () => setDevRole('guest');

  return (
    <AuthContext.Provider value={{ user, role: devRole, isAuthenticated: devRole !== 'guest', isLoading: false, signIn, login, signOut, switchDevRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  if (clerkPubKey) {
    return <ClerkAuthProvider>{children}</ClerkAuthProvider>;
  }
  return <MockAuthProvider>{children}</MockAuthProvider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
