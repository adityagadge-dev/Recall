import { ApiClient, ApiResponse } from './apiClient';
import { User, LearnerProfile, CreatorProfile, AdminProfile, UserRole } from '../types';
import { MOCK_LEARNER_USER, MOCK_CREATOR_USER, MOCK_ADMIN_USER } from '../mock/mockData';

export class AuthApi {
  static async getCurrentUser(role: UserRole = 'learner'): Promise<ApiResponse<User>> {
    return ApiClient.get<User>('/auth/me', () => {
      if (role === 'creator') return { ...MOCK_CREATOR_USER };
      if (role === 'admin') return { ...MOCK_ADMIN_USER };
      return { ...MOCK_LEARNER_USER };
    });
  }

  static async getLearnerProfile(): Promise<ApiResponse<LearnerProfile>> {
    return ApiClient.get<LearnerProfile>('/auth/profile/learner', () => ({ ...MOCK_LEARNER_USER }));
  }

  static async getCreatorProfile(): Promise<ApiResponse<CreatorProfile>> {
    return ApiClient.get<CreatorProfile>('/auth/profile/creator', () => ({ ...MOCK_CREATOR_USER }));
  }

  static async getAdminProfile(): Promise<ApiResponse<AdminProfile>> {
    return ApiClient.get<AdminProfile>('/auth/profile/admin', () => ({ ...MOCK_ADMIN_USER }));
  }

  static async signIn(email: string, role: UserRole): Promise<ApiResponse<User>> {
    return ApiClient.post<User>('/auth/sign-in', { email, role }, () => {
      if (role === 'creator') return { ...MOCK_CREATOR_USER, email };
      if (role === 'admin') return { ...MOCK_ADMIN_USER, email };
      return { ...MOCK_LEARNER_USER, email };
    });
  }

  static async signOut(): Promise<ApiResponse<{ success: boolean }>> {
    return ApiClient.post<{ success: boolean }>('/auth/sign-out', {}, () => ({ success: true }));
  }
}
