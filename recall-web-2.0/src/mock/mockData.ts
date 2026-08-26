import {
  Subject,
  Course,
  ResearchSource,
  ContentItem,
  QuizQuestion,
  ParaWiseQuestionGroup,
  Badge,
  Achievement,
  DailyChallenge,
  LeaderboardEntry,
  AuditLog,
  SystemHealthStatus,
  PlatformSettings,
  SpinWheelItem,
  LearnerProfile,
  CreatorProfile,
  AdminProfile,
  QuestionSuggestion,
} from '../types';

export const MOCK_LEARNER_USER: LearnerProfile = {
  id: 'usr_learner_aria',
  email: 'aria.chen@recall.edu',
  name: 'Aria Chen',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'learner',
  status: 'active',
  createdAt: '2025-10-12T08:00:00Z',
  lastActive: 'Just now',
  level: 4,
  levelTitle: 'Skilled Practitioner',
  currentXp: 1850,
  nextLevelXp: 2500,
  totalXp: 4850,
  streakDays: 14,
  streakFreezeAvailable: 2,
  streakHistory: [
    { date: '2026-08-16', completed: true, xp: 120 },
    { date: '2026-08-17', completed: true, xp: 180 },
    { date: '2026-08-18', completed: true, xp: 90 },
    { date: '2026-08-19', completed: true, xp: 210 },
    { date: '2026-08-20', completed: true, xp: 150 },
    { date: '2026-08-21', completed: true, xp: 240 },
    { date: '2026-08-22', completed: true, xp: 190 },
  ],
  completedLessonsCount: 18,
  completedQuizzesCount: 12,
  completedTeachBacksCount: 7,
  masteryScores: {
    'sub_finance': 78,
    'sub_digital_safety': 85,
    'sub_first_aid': 62,
    'sub_communication': 90,
  },
  badges: ['bdg_first_responder', 'bdg_phish_hunter', 'bdg_compound_interest', 'bdg_streak_14'],
  achievements: ['ach_first_teach_back', 'ach_perfect_quiz', 'ach_streak_week', 'ach_safety_first'],
};

export const MOCK_CREATOR_USER: CreatorProfile = {
  id: 'usr_creator_marcus',
  email: 'm.vance@recall.edu',
  name: 'Dr. Marcus Vance',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  role: 'creator',
  status: 'active',
  createdAt: '2025-06-15T09:30:00Z',
  lastActive: '5 mins ago',
  title: 'Lead Curriculum Fellow & Behavioral Economist',
  institution: 'Recall Institute of Applied Life Skills',
  verifiedStatus: 'verified',
  bio: 'Specialist in behavioral heuristics, practical financial modeling, and emergency cognition training.',
  coursesCreatedCount: 6,
  totalStudentsReached: 14280,
  averageRating: 4.92,
  researchUploadsCount: 34,
  specialization: ['Personal Finance Architecture', 'Emergency Triage Cognition', 'Digital Threat Modeling'],
};

export const MOCK_ADMIN_USER: AdminProfile = {
  id: 'usr_admin_elena',
  email: 'elena.rostova@recall.edu',
  name: 'Elena Rostova',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  role: 'admin',
  status: 'active',
  createdAt: '2025-01-10T12:00:00Z',
  lastActive: 'Active now',
  department: 'Platform Governance & AI Integration',
  permissions: ['ALL_PERMISSIONS', 'MANAGE_MAKERS', 'AUDIT_LOGS', 'GAMIFICATION_OVERRIDE', 'SYSTEM_HEALTH'],
};

export const MOCK_SUBJECTS: Subject[] = [];
export const MOCK_COURSES: Course[] = [];
export const MOCK_QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {};
export const MOCK_QUIZZES = [];
export const MOCK_PARA_WISE_GROUPS: ParaWiseQuestionGroup[] = [];
export const MOCK_RESEARCH_SOURCES: ResearchSource[] = [];
export const MOCK_CONTENT_ITEMS: ContentItem[] = [];
export const MOCK_QUESTION_SUGGESTIONS: QuestionSuggestion[] = [];
export const MOCK_BADGES: Badge[] = [];
export const MOCK_ACHIEVEMENTS: Achievement[] = [];
export const MOCK_DAILY_CHALLENGES: DailyChallenge[] = [];
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [];
export const MOCK_SPIN_WHEEL_ITEMS: SpinWheelItem[] = [];
export const MOCK_AUDIT_LOGS: AuditLog[] = [];
export const MOCK_SYSTEM_HEALTH: SystemHealthStatus[] = [];
export const MOCK_PLATFORM_SETTINGS: PlatformSettings = {
  maintenanceMode: false,
  registrationEnabled: true,
  maxUsers: 10000,
  features: {
    gamification: true,
    social: false,
    aiTutor: true
  }
};
export const MOCK_SPIN_ITEMS: SpinWheelItem[] = [];
