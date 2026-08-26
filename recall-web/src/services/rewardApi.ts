import { ApiClient, ApiResponse } from './apiClient';
import { Badge, Achievement, LeaderboardEntry } from '../types';
import { MOCK_BADGES, MOCK_ACHIEVEMENTS, MOCK_LEADERBOARD } from '../mock/mockData';

export class RewardApi {
  static async getBadges(): Promise<ApiResponse<Badge[]>> {
    return ApiClient.get('/rewards/badges', () => [...MOCK_BADGES]);
  }

  static async getAchievements(): Promise<ApiResponse<Achievement[]>> {
    return ApiClient.get('/rewards/achievements', () => [...MOCK_ACHIEVEMENTS]);
  }

  static async getLeaderboard(timeframe: 'weekly' | 'monthly' | 'all_time' = 'weekly'): Promise<ApiResponse<LeaderboardEntry[]>> {
    return ApiClient.get(`/rewards/leaderboard?timeframe=${timeframe}`, () => {
      if (timeframe === 'monthly') {
        return [
          { rank: 1, previousRank: 2, userId: 'usr_top_2', userName: 'Mei-Ling Zhou', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', level: 6, totalXp: 18450, streakDays: 24, badgesCount: 14 },
          { rank: 2, previousRank: 1, userId: 'usr_top_1', userName: 'Kaelen Voss', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', level: 7, totalXp: 17920, streakDays: 38, badgesCount: 16 },
          { rank: 3, previousRank: 4, userId: 'usr_learner_aria', userName: 'Aria Chen (You)', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', level: 4, totalXp: 15400, streakDays: 14, badgesCount: 8, isCurrentUser: true },
          { rank: 4, previousRank: 3, userId: 'usr_top_3', userName: 'Devon Ramirez', avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80', level: 5, totalXp: 14890, streakDays: 19, badgesCount: 10 },
        ];
      }
      return [...MOCK_LEADERBOARD];
    });
  }

  static async claimAchievementReward(achievementId: string): Promise<ApiResponse<{ xpBonus: number; claimed: boolean }>> {
    return ApiClient.post(`/rewards/achievements/${achievementId}/claim`, {}, () => ({
      xpBonus: 400,
      claimed: true,
    }));
  }
}
