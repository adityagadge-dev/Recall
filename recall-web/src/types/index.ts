export type UserRole = 'learner' | 'creator' | 'admin' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  role: UserRole;
  createdAt: string;
  lastActive: string;
  status: 'active' | 'suspended' | 'pending';
}

export interface LearnerProfile extends User {
  role: 'learner';
  level: number;
  levelTitle: string; // e.g., 'Explorer', 'Practitioner', 'Proficient'
  currentXp: number;
  nextLevelXp: number;
  totalXp: number;
  streakDays: number;
  streakFreezeAvailable: number;
  streakHistory: { date: string; completed: boolean; xp: number }[];
  completedLessonsCount: number;
  completedQuizzesCount: number;
  completedTeachBacksCount: number;
  masteryScores: Record<string, number>; // subjectId -> percentage 0-100
  badges: string[]; // badgeIds
  achievements: string[]; // achievementIds
}

export interface CreatorProfile extends User {
  role: 'creator';
  title: string;
  institution: string;
  verifiedStatus: 'verified' | 'pending' | 'unverified';
  bio: string;
  coursesCreatedCount: number;
  totalStudentsReached: number;
  averageRating: number;
  researchUploadsCount: number;
  specialization: string[];
}

export interface AdminProfile extends User {
  role: 'admin';
  department: string;
  permissions: string[];
}

export type SubjectCategory = 'finance' | 'digital_safety' | 'first_aid' | 'communication';

export interface Subject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: SubjectCategory;
  accentColor: string; // Tailwind color class or hex
  accentGlow: string;
  iconName: string;
  estimatedHours: number;
  totalModules: number;
  totalLessons: number;
  totalXp: number;
  status: 'published' | 'draft' | 'archived';
  keyCompetencies: string[];
  recommendedPrerequisites?: string[];
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  objectives: string[];
  researchSourceIds: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'active' | 'archived';
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  xpReward: number;
  order: number;
  content: {
    introduction: string;
    keyConcept: string;
    realWorldScenario: string;
    actionableTakeaways: string[];
    commonPitfalls: string[];
    interactiveExample: {
      title: string;
      context: string;
      breakdown: { label: string; value: string; note: string }[];
    };
  };
  supportingResources: { title: string; url: string; type: 'research' | 'video' | 'guide' }[];
  teachBackPrompt: string;
  quickCheckQuestionId?: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quizId?: string;
  isUnlockedDefault?: boolean;
}

export interface Course {
  id: string;
  subjectId: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  totalXp: number;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  status: 'published' | 'draft' | 'in_review' | 'archived';
  version: string;
  updatedAt: string;
  modules: Module[];
  diagnosticId?: string;
  finalAssessmentId?: string;
  enrolledStudentsCount: number;
  completionRate: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  subjectId: string;
  enrolledAt: string;
  lastAccessedAt: string;
  completedLessonIds: string[];
  currentModuleId: string;
  currentLessonId: string;
  progressPercentage: number;
  isCompleted: boolean;
  score: number;
  notes: Record<string, string>; // lessonId -> note text
  bookmarks: string[]; // lessonIds
}

export interface XPEvent {
  id: string;
  userId: string;
  source: 'lesson_complete' | 'quiz_perfect' | 'teach_back' | 'daily_challenge' | 'streak_milestone' | 'diagnostic_complete' | 'spin_teach';
  amount: number;
  description: string;
  timestamp: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: SubjectCategory | 'general' | 'streak';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockedAt?: string;
  criteria: string;
  xpBonus: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  currentProgress: number;
  maxProgress: number;
  isCompleted: boolean;
  completedAt?: string;
  rewardXp: number;
  badgeRewardId?: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  subjectCategory: SubjectCategory;
  xpReward: number;
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
  expiresAt: string;
  type: 'lesson' | 'teach_back' | 'quiz' | 'streak';
}

export interface LeaderboardEntry {
  rank: number;
  previousRank: number;
  userId: string;
  userName: string;
  avatarUrl: string;
  level: number;
  totalXp: number;
  streakDays: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}

// ---------------- Research & Content Bank ----------------
export interface ResearchSource {
  id: string;
  title: string;
  authors: string;
  institutionOrPublisher: string;
  publicationYear: number;
  sourceUrl: string;
  category: SubjectCategory;
  tags: string[];
  summary: string;
  keyFindings: string[];
  verificationStatus: 'verified' | 'pending' | 'flagged';
  verifiedBy?: string;
  dateAdded: string;
  usedInCourseIds: string[];
}

export interface ContentItem {
  id: string;
  topicId: string;
  subjectCategory: SubjectCategory;
  conceptName: string;
  verifiedExplanation: string;
  realWorldExample: string;
  counterExamples: string[];
  referenceIds: string[];
  status: 'verified' | 'draft' | 'needs_update';
  lastEditedBy: string;
  updatedAt: string;
}

// ---------------- Assessment, Quizzes & Teach-Back ----------------
export type QuestionType = 'mcq' | 'true_false' | 'scenario' | 'para_wise' | 'short_answer' | 'teach_back';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  competency: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prompt: string;
  scenarioContext?: string;
  passageText?: string; // Para-wise reading passage
  options?: QuestionOption[]; // For MCQ, True/False, Scenario
  expectedKeywords?: string[]; // For short answer / teach-back
  explanation: string;
  hint?: string;
  xpValue: number;
  timeLimitSeconds?: number;
}

export interface ParaWiseQuestionGroup {
  id: string;
  passageTitle: string;
  passageBody: string;
  sourceAttribution: string;
  questions: QuizQuestion[];
}

export interface QuizResponse {
  questionId: string;
  selectedOptionId?: string;
  textAnswer?: string;
  audioRecorded?: boolean;
  timeSpentSeconds: number;
  isCorrect?: boolean;
  scoreAwarded?: number;
}

export interface QuizResult {
  quizId: string;
  courseId: string;
  userId: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  xpEarned: number;
  strengths: string[];
  improvementAreas: string[];
  recommendedAction: string;
  feedbackSummary: string;
  questionResults: {
    questionId: string;
    prompt: string;
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface TeachBackResponse {
  id: string;
  prompt: string;
  subjectCategory: SubjectCategory;
  userExplanationText: string;
  hasAudioSubmission: boolean;
  evaluationState: 'evaluating' | 'completed' | 'failed';
  score: number; // 0-100
  xpEarned: number;
  rubricScores: {
    conceptualAccuracy: number; // 0-25
    clarityOfExpression: number; // 0-25
    realWorldApplication: number; // 0-25
    depthAndNuance: number; // 0-25
  };
  strengthsObserved: string[];
  misconceptionsDetected: string[];
  suggestedFollowUp: string;
}

export type TeachBackAssessmentResult = TeachBackResponse;

export interface ResearchPaper {
  id: string;
  creatorId: string;
  title: string;
  abstract: string;
  subjectCategory: string;
  tags: string[];
  citationsCount: number;
  publishedDate: string;
  status: 'approved' | 'in_review' | 'draft';
  verificationStatus: 'verified' | 'pending' | 'unverified';
  keyFindings: string[];
  fileUrl?: string;
  doi?: string;
  methodology?: string;
}

export interface SpinWheelItem {
  id: string;
  subjectCategory: SubjectCategory;
  conceptTitle: string;
  shortPrompt: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Master' | 'beginner' | 'intermediate' | 'advanced';
  color: string;
  xpBonus?: number;
}

// ---------------- Creator Diagnostic & Assessment Config ----------------
export interface DiagnosticConfig {
  id: string;
  subjectId: string;
  title: string;
  targetCompetencies: string[];
  totalQuestions: number;
  difficultyDistribution: { easy: number; medium: number; hard: number };
  passingThreshold: number;
  status: 'active' | 'draft';
}

export interface AssessmentConfig {
  id: string;
  courseId: string;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  passingPercentage: number;
  questionTypeWeights: {
    mcq: number;
    scenario: number;
    para_wise: number;
    teach_back: number;
  };
  includeTeachBack: boolean;
  includeParaWise: boolean;
  instantFeedback: boolean;
  randomizeOrder: boolean;
}

export interface QuestionSuggestion {
  id: string;
  topicId: string;
  topicTitle: string;
  suggestedPrompt: string;
  questionType: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  competency: string;
  rationale: string;
  verifiedSourceCitation: string;
  status: 'pending' | 'accepted' | 'rejected';
}

// ---------------- Admin & System Models ----------------
export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail: string;
  actorRole: UserRole;
  action: string;
  resourceType: 'Course' | 'User' | 'Research' | 'Topic' | 'Assessment' | 'Gamification' | 'System';
  resourceId: string;
  details: string;
  status: 'success' | 'warning' | 'error';
}

export interface SystemHealthStatus {
  serviceName: 'Flask REST API' | 'MongoDB Cluster' | 'Clerk Auth' | 'Google ADK Service' | 'ML Engine Worker';
  status: 'healthy' | 'degraded' | 'maintenance' | 'offline';
  latencyMs: number;
  uptimePercentage: number;
  lastChecked: string;
  endpointUrl: string;
  version: string;
}

export interface PlatformSettings {
  maintenanceMode: boolean;
  allowNewRegistrations: boolean;
  defaultXpMultiplier: number;
  streakGracePeriodHours: number;
  dailyChallengeCount: number;
  enableTeachBackVoice: boolean;
  enableSpinAndTeach: boolean;
  enableAdkAssessmentIntegration: boolean;
  enableLearningAgentPersonalization: boolean;
}

// ---------------- Google ADK Future Integration Interfaces ----------------
export interface LearningAgentResponse {
  status: 'success' | 'adapting' | 'error';
  personalizedSummary?: string;
  adaptedDifficulty?: 'easier' | 'standard' | 'advanced';
  dynamicExamples?: { title: string; scenario: string; context: string }[];
  nextRecommendedLessonId?: string;
  confidenceScore: number;
}

export interface DiagnosticResponse {
  estimatedBaselineLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  competencyBreakdown: Record<string, number>;
  recommendedCourseIds: string[];
}
