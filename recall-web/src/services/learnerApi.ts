import { ApiClient, ApiResponse } from './apiClient';
import { LearnerProfile, DailyChallenge, LeaderboardEntry, Course } from '../types';
import { MOCK_LEARNER_USER, MOCK_DAILY_CHALLENGES, MOCK_LEADERBOARD, MOCK_COURSES } from '../mock/mockData';

export class LearnerApi {
  static async getDashboardData(): Promise<ApiResponse<{
    profile: LearnerProfile;
    dailyChallenges: DailyChallenge[];
    continueLearning: Course[];
    leaderboardPreview: LeaderboardEntry[];
  }>> {
    return ApiClient.get('/learner/dashboard', () => ({
      profile: { ...MOCK_LEARNER_USER },
      dailyChallenges: [...MOCK_DAILY_CHALLENGES],
      continueLearning: [MOCK_COURSES[0], MOCK_COURSES[1]],
      leaderboardPreview: MOCK_LEADERBOARD.slice(0, 5),
    }));
  }

  static async completeDailyChallenge(challengeId: string): Promise<ApiResponse<{ xpReward: number; isCompleted: boolean }>> {
    return ApiClient.post(`/learner/challenges/${challengeId}/complete`, {}, () => ({
      xpReward: 75,
      isCompleted: true,
    }));
  }
}
