import { ApiClient, ApiResponse } from './apiClient';
import { TeachBackResponse, SpinWheelItem, SubjectCategory } from '../types';
import { MOCK_SPIN_WHEEL_ITEMS } from '../mock/mockData';

export class AssessmentApi {
  static async getSpinWheelItems(): Promise<ApiResponse<SpinWheelItem[]>> {
    return ApiClient.get('/assessment/spin-wheel', () => [...MOCK_SPIN_WHEEL_ITEMS]);
  }

  static async submitTeachBack(
    prompt: string,
    category: SubjectCategory,
    explanationText: string,
    hasAudio: boolean
  ): Promise<ApiResponse<TeachBackResponse>> {
    return ApiClient.post('/assessment/teach-back/evaluate', { prompt, category, explanationText, hasAudio }, () => {
      const textLen = explanationText.trim().length;
      const isDetailed = textLen > 80;

      return {
        id: `tb_${Date.now()}`,
        prompt,
        subjectCategory: category,
        userExplanationText: explanationText,
        hasAudioSubmission: hasAudio,
        evaluationState: 'completed',
        score: isDetailed ? 92 : 78,
        xpEarned: isDetailed ? 150 : 90,
        rubricScores: {
          conceptualAccuracy: isDetailed ? 24 : 20,
          clarityOfExpression: isDetailed ? 23 : 19,
          realWorldApplication: isDetailed ? 22 : 18,
          depthAndNuance: isDetailed ? 23 : 21,
        },
        strengthsObserved: [
          'Accurately captured the core causal mechanism without relying on superficial jargon.',
          'Provided a clear practical scenario illustrating why standard intuition fails.',
          'Demonstrated authentic understanding (Protégé Effect achieved).',
        ],
        misconceptionsDetected: isDetailed ? [] : ['Could further elaborate on the long-term mathematical compounding horizon.'],
        suggestedFollowUp: 'Advance to the next progressive module in the Skill Tree.',
      };
    });
  }

  static async startDiagnostic(subjectId: string): Promise<ApiResponse<{ diagnosticId: string; totalQuestions: number }>> {
    return ApiClient.post(`/assessment/diagnostic/${subjectId}/start`, {}, () => ({
      diagnosticId: `diag_${subjectId}_${Date.now()}`,
      totalQuestions: 6,
    }));
  }
}
