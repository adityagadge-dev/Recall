import { ApiClient, ApiResponse } from './apiClient';
import { Topic, ContentItem } from '../types';
import { MOCK_CONTENT_ITEMS } from '../mock/mockData';

export const MOCK_TOPICS: Topic[] = [
  {
    id: 'top_budgeting',
    subjectId: 'sub_finance',
    title: 'Zero-Based Budgeting & Sinking Funds',
    description: 'Frameworks for automated cashflow allocation and liquidity insulation.',
    objectives: ['Establish $0 variance forward budget', 'Categorize fixed vs discretionary tiers', 'Eliminate lifestyle inflation drift'],
    researchSourceIds: ['res_001'],
    difficulty: 'Beginner',
    status: 'active',
    order: 1,
  },
  {
    id: 'top_compounding',
    subjectId: 'sub_finance',
    title: 'Exponential Compounding & Rule of 72',
    description: 'Time-weighted returns vs capital-weighted investments.',
    objectives: ['Calculate doubling time via Rule of 72', 'Identify fee drag on index assets', 'Understand DRIP reinvestment'],
    researchSourceIds: ['res_001'],
    difficulty: 'Intermediate',
    status: 'active',
    order: 2,
  },
  {
    id: 'top_phishing',
    subjectId: 'sub_digital_safety',
    title: 'Spear-Phishing & Lookalike Threat Vectors',
    description: 'Detection of adversarial social engineering and domain spoofing.',
    objectives: ['Audit full email headers', 'Detect punycode homograph URLs', 'Enforce out-of-band verification'],
    researchSourceIds: ['res_002'],
    difficulty: 'Beginner',
    status: 'active',
    order: 1,
  },
];

export class TopicApi {
  static async getTopics(subjectId?: string): Promise<ApiResponse<Topic[]>> {
    return ApiClient.get('/creator/topics', () => {
      if (subjectId) return MOCK_TOPICS.filter(t => t.subjectId === subjectId);
      return [...MOCK_TOPICS];
    });
  }

  static async saveTopic(data: Partial<Topic>): Promise<ApiResponse<Topic>> {
    return ApiClient.post('/creator/topics', data, () => ({
      id: data.id || `top_${Date.now()}`,
      subjectId: data.subjectId || 'sub_finance',
      title: data.title || 'New Topic',
      description: data.description || '',
      objectives: data.objectives || [],
      researchSourceIds: data.researchSourceIds || [],
      difficulty: data.difficulty || 'Beginner',
      status: 'active',
      order: data.order || 1,
    }));
  }
}

export class ContentApi {
  static async getContentItems(): Promise<ApiResponse<ContentItem[]>> {
    return ApiClient.get('/creator/content', () => [...MOCK_CONTENT_ITEMS]);
  }

  static async saveContentItem(data: Partial<ContentItem>): Promise<ApiResponse<ContentItem>> {
    return ApiClient.post('/creator/content', data, () => ({
      id: data.id || `cnt_${Date.now()}`,
      topicId: data.topicId || 'top_budgeting',
      subjectCategory: data.subjectCategory || 'finance',
      conceptName: data.conceptName || 'Untitled Concept',
      verifiedExplanation: data.verifiedExplanation || '',
      realWorldExample: data.realWorldExample || '',
      counterExamples: data.counterExamples || [],
      referenceIds: data.referenceIds || [],
      status: data.status || 'verified',
      lastEditedBy: 'Dr. Marcus Vance',
      updatedAt: new Date().toISOString().split('T')[0],
    }));
  }
}
