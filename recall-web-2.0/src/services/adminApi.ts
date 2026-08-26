import { ApiClient, ApiResponse } from './apiClient';
import { User, AuditLog, SystemHealthStatus, PlatformSettings, Subject, Course } from '../types';
import {
  MOCK_LEARNER_USER,
  MOCK_CREATOR_USER,
  MOCK_ADMIN_USER,
  MOCK_AUDIT_LOGS,
  MOCK_SYSTEM_HEALTH,
  MOCK_PLATFORM_SETTINGS,
  MOCK_SUBJECTS,
  MOCK_COURSES,
} from '../mock/mockData';

export interface AdminPlatformOverview {
  totalLearners: number;
  totalCreators: number;
  totalCourses: number;
  totalPublishedCourses: number;
  activeUsersToday: number;
  learningSessionsToday: number;
  totalXpDistributed: number;
  averageCourseCompletionRate: number;
  totalAssessmentsEvaluated: number;
  totalTeachBacksCompleted: number;
}

export class AdminApi {
  static async getPlatformOverview(): Promise<ApiResponse<AdminPlatformOverview>> {
    return ApiClient.get('/admin/overview', () => ({
      totalLearners: 28450,
      totalCreators: 42,
      totalCourses: 18,
      totalPublishedCourses: 14,
      activeUsersToday: 3840,
      learningSessionsToday: 8920,
      totalXpDistributed: 1485000,
      averageCourseCompletionRate: 84.8,
      totalAssessmentsEvaluated: 19420,
      totalTeachBacksCompleted: 7850,
    }));
  }

  static async getUsers(): Promise<ApiResponse<User[]>> {
    return ApiClient.get('/admin/users', () => [
      { ...MOCK_LEARNER_USER },
      {
        id: 'usr_2',
        email: 'kaelen.voss@recall.edu',
        name: 'Kaelen Voss',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        role: 'learner',
        createdAt: '2025-11-04',
        lastActive: '12m ago',
        status: 'active',
      },
      {
        id: 'usr_3',
        email: 'mei.zhou@recall.edu',
        name: 'Mei-Ling Zhou',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
        role: 'learner',
        createdAt: '2025-12-10',
        lastActive: '1 hour ago',
        status: 'active',
      },
      {
        id: 'usr_4',
        email: 'tariq.fassi@example.com',
        name: 'Tariq Al-Fassi',
        avatarUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=80',
        role: 'learner',
        createdAt: '2026-01-15',
        lastActive: '3 days ago',
        status: 'suspended',
      },
    ]);
  }

  static async getCreators(): Promise<ApiResponse<User[]>> {
    return ApiClient.get('/admin/creators', () => [
      { ...MOCK_CREATOR_USER },
      {
        id: 'usr_creator_sarah',
        email: 's.jenkins@trauma-resuscitation.org',
        name: 'Dr. Sarah Jenkins, MD',
        avatarUrl: 'https://images.unsplash.com/photo-1594824813581-c7d678125442?w=100&auto=format&fit=crop&q=80',
        role: 'creator',
        createdAt: '2025-08-20',
        lastActive: '4 hours ago',
        status: 'active',
      },
    ]);
  }

  static async getAuditLogs(): Promise<ApiResponse<AuditLog[]>> {
    return ApiClient.get('/admin/audit', () => [...MOCK_AUDIT_LOGS]);
  }

  static async getSystemHealth(): Promise<ApiResponse<SystemHealthStatus[]>> {
    return ApiClient.get('/admin/system-health', () => [...MOCK_SYSTEM_HEALTH]);
  }

  static async getSystemStats(): Promise<ApiResponse<AdminPlatformOverview>> {
    return this.getPlatformOverview();
  }

  static async getPendingCreatorApprovals(): Promise<ApiResponse<any[]>> {
    return ApiClient.get('/admin/creator-approvals', () => [
      {
        id: 'creator_app_01',
        name: 'Dr. Sarah Jenkins, MD',
        credentials: 'Board Certified Emergency Physician',
        domain: 'First Aid & Trauma Response',
        institution: 'Johns Hopkins Medicine',
        submittedAt: '2026-08-20',
      },
      {
        id: 'creator_app_02',
        name: 'Alexandre Dubois, CFA',
        credentials: 'Chartered Financial Analyst, Quantitative Wealth',
        domain: 'Financial Literacy',
        institution: 'HEC Paris / Sorbonne',
        submittedAt: '2026-08-21',
      },
    ]);
  }

  static async getPlatformSettings(): Promise<ApiResponse<PlatformSettings>> {
    return ApiClient.get('/admin/settings', () => ({ ...MOCK_PLATFORM_SETTINGS }));
  }

  static async updatePlatformSettings(settings: Partial<PlatformSettings>): Promise<ApiResponse<PlatformSettings>> {
    return ApiClient.put('/admin/settings', settings, () => ({
      ...MOCK_PLATFORM_SETTINGS,
      ...settings,
    }));
  }

  static async toggleUserStatus(userId: string, status: 'active' | 'suspended'): Promise<ApiResponse<{ userId: string; status: string }>> {
    return ApiClient.post(`/admin/users/${userId}/toggle-status`, { status }, () => ({
      userId,
      status,
    }));
  }
}
