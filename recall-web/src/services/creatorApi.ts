import { ApiClient, ApiResponse } from './apiClient';
import { Course, ResearchSource, QuestionSuggestion, DiagnosticConfig, AssessmentConfig } from '../types';
import { MOCK_COURSES, MOCK_RESEARCH_SOURCES, MOCK_QUESTION_SUGGESTIONS } from '../mock/mockData';

export interface CreatorDashboardAnalytics {
  totalCoursesCount: number;
  draftsCount: number;
  publishedCount: number;
  totalResearchItems: number;
  learnersReached: number;
  averageCompletionRate: number;
  topPerformingCourses: { title: string; learners: number; rating: number }[];
  dropOffFunnel: { step: string; completionPercentage: number }[];
}

export class CreatorApi {
  static async getDashboardAnalytics(): Promise<ApiResponse<CreatorDashboardAnalytics>> {
    return ApiClient.get('/creator/analytics/overview', () => ({
      totalCoursesCount: 6,
      draftsCount: 2,
      publishedCount: 4,
      totalResearchItems: MOCK_RESEARCH_SOURCES.length,
      learnersReached: 14280,
      averageCompletionRate: 86.4,
      topPerformingCourses: [
        { title: 'Personal Financial Defense & Wealth Architecture', learners: 3840, rating: 4.94 },
        { title: 'Practical Cyber Threat Defense & Privacy', learners: 4210, rating: 4.91 },
        { title: 'Emergency Scene Triage & CPR Execution', learners: 2980, rating: 4.88 },
        { title: 'High-Stakes Interpersonal Communication', learners: 3260, rating: 4.95 },
      ],
      dropOffFunnel: [
        { step: 'Diagnostic / Enrolled', completionPercentage: 100 },
        { step: 'Module 1 Lessons', completionPercentage: 94 },
        { step: 'Mid-Course Quiz', completionPercentage: 88 },
        { step: 'Teach-Back Challenge', completionPercentage: 82 },
        { step: 'Final Certification', completionPercentage: 76 },
      ],
    }));
  }

  static async getCreatorDashboard(): Promise<ApiResponse<CreatorDashboardAnalytics>> {
    return this.getDashboardAnalytics();
  }

  static async getResearchSources(): Promise<ApiResponse<ResearchSource[]>> {
    return ApiClient.get('/creator/research', () => [...MOCK_RESEARCH_SOURCES]);
  }

  static async getResearchPapers(): Promise<ApiResponse<any[]>> {
    return ApiClient.get('/creator/research-papers', () => [
      {
        id: 'res_001',
        creatorId: 'usr_creator_marcus',
        title: 'Cognitive Biases in Compound Interest Perception & Zero-Based Allocation',
        abstract: 'Empirical study on temporal discounting and consumer vulnerabilities in revolving credit structures.',
        subjectCategory: 'finance',
        tags: ['Behavioral Economics', 'Compounding', 'Debt'],
        citationsCount: 48,
        publishedDate: '2025-11-14',
        status: 'approved',
        verificationStatus: 'verified',
        keyFindings: ['Exponential growth bias leads 68% of consumers to underestimate debt accumulation.'],
      },
      {
        id: 'res_002',
        creatorId: 'usr_creator_marcus',
        title: 'High-Pressure Resuscitation Cognition: Reducing Hesitation Latency',
        abstract: 'Clinical trial evaluating muscle-memory drills and simplified CPR algorithms on civilian bystanders.',
        subjectCategory: 'first_aid',
        tags: ['Emergency Medicine', 'Resuscitation', 'Triage'],
        citationsCount: 62,
        publishedDate: '2025-08-22',
        status: 'approved',
        verificationStatus: 'verified',
        keyFindings: ['Metronome pacing reduces compression depth variance by 41% during bystander CPR.'],
      },
    ]);
  }

  static async uploadResearchSource(data: Partial<ResearchSource>): Promise<ApiResponse<ResearchSource>> {
    return ApiClient.post('/creator/research', data, () => ({
      id: `res_${Date.now()}`,
      title: data.title || 'Untitled Research',
      authors: data.authors || 'Unknown Author',
      institutionOrPublisher: data.institutionOrPublisher || 'Independent Review',
      publicationYear: data.publicationYear || 2026,
      sourceUrl: data.sourceUrl || 'https://doi.org/recall/custom',
      category: data.category || 'finance',
      tags: data.tags || ['Verified'],
      summary: data.summary || 'Summary pending peer review.',
      keyFindings: data.keyFindings || ['Verified empirical observation.'],
      verificationStatus: 'pending',
      dateAdded: new Date().toISOString().split('T')[0],
      usedInCourseIds: [],
    }));
  }

  static async getQuestionSuggestions(): Promise<ApiResponse<QuestionSuggestion[]>> {
    return ApiClient.get('/creator/questions/suggestions', () => [...MOCK_QUESTION_SUGGESTIONS]);
  }

  static async resolveQuestionSuggestion(id: string, action: 'accepted' | 'rejected'): Promise<ApiResponse<{ id: string; status: string }>> {
    return ApiClient.post(`/creator/questions/suggestions/${id}/resolve`, { action }, () => ({
      id,
      status: action,
    }));
  }

  static async saveCourse(courseData: Partial<Course>): Promise<ApiResponse<Course>> {
    return ApiClient.post('/creator/courses', courseData, () => ({
      ...MOCK_COURSES[0],
      ...courseData,
      id: courseData.id || `crs_${Date.now()}`,
      updatedAt: new Date().toISOString(),
    }));
  }
}
