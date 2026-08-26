import { ApiClient, ApiResponse } from './apiClient';
import { XPEvent } from '../types';
import { MOCK_LEARNER_USER } from '../mock/mockData';

export interface ProgressAnalytics {
  totalXp: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  weeklyStudyHours: { day: string; hours: number; xp: number }[];
  subjectMasteryBreakdown: { subject: string; percentage: number; color: string }[];
  strengths: string[];
  improvementAreas: string[];
  recentXpEvents: XPEvent[];
}

export class ProgressApi {
  static async getProgressAnalytics(): Promise<ApiResponse<ProgressAnalytics>> {
    return ApiClient.get('/learner/progress', () => ({
      totalXp: MOCK_LEARNER_USER.totalXp,
      level: MOCK_LEARNER_USER.level,
      levelTitle: MOCK_LEARNER_USER.levelTitle,
      streakDays: MOCK_LEARNER_USER.streakDays,
      weeklyStudyHours: [
        { day: 'Mon', hours: 0.8, xp: 120 },
        { day: 'Tue', hours: 1.2, xp: 180 },
        { day: 'Wed', hours: 0.5, xp: 90 },
        { day: 'Thu', hours: 1.5, xp: 210 },
        { day: 'Fri', hours: 1.0, xp: 150 },
        { day: 'Sat', hours: 1.8, xp: 240 },
        { day: 'Sun', hours: 1.4, xp: 190 },
      ],
      subjectMasteryBreakdown: [
        { subject: 'Financial Literacy', percentage: 78, color: '#F59E0B' },
        { subject: 'Digital Safety', percentage: 85, color: '#06B6D4' },
        { subject: 'First Aid', percentage: 62, color: '#84CC16' },
        { subject: 'Communication Skills', percentage: 90, color: '#A855F7' },
      ],
      strengths: [
        'Adversarial Email Triaging & Spoof Detection (96% accuracy)',
        'Minto Pyramid Briefing & Strategic Pacing (92% accuracy)',
        'Zero-Based Budget Allocation Heuristics (88% accuracy)',
      ],
      improvementAreas: [
        'Pediatric CPR vs Adult Compressions Depth Calibration',
        'FIDO2 Passkey Cryptographic Origin Verification Nuances',
      ],
      recentXpEvents: [
        { id: 'xp_1', userId: 'usr_learner_aria', source: 'lesson_complete', amount: 60, description: 'Completed Zero-Based Allocation Engine', timestamp: '2 hours ago' },
        { id: 'xp_2', userId: 'usr_learner_aria', source: 'teach_back', amount: 150, description: 'Mastered Acoustic Pacing Teach-Back evaluation', timestamp: 'Yesterday' },
        { id: 'xp_3', userId: 'usr_learner_aria', source: 'streak_milestone', amount: 500, description: 'Unlocked 14-Day Fortress Streak Milestone', timestamp: '2 days ago' },
      ],
    }));
  }

  static async getLearnerProgress(): Promise<ApiResponse<ProgressAnalytics>> {
    return this.getProgressAnalytics();
  }
}
