import { ApiClient, ApiResponse } from './apiClient';
import { QuizQuestion, QuizResponse, QuizResult, ParaWiseQuestionGroup } from '../types';
import { MOCK_QUIZ_QUESTIONS, MOCK_PARA_WISE_GROUPS } from '../mock/mockData';

export class QuizApi {
  static async getQuiz(quizId: string): Promise<ApiResponse<{ questions: QuizQuestion[]; title: string; durationMinutes: number }>> {
    return ApiClient.get(`/quiz/${quizId}`, () => {
      const questions = MOCK_QUIZ_QUESTIONS[quizId] || MOCK_QUIZ_QUESTIONS['qiz_fin_1'];
      return {
        questions,
        title: 'Module Mastery Evaluation',
        durationMinutes: 10,
      };
    });
  }

  static async getParaWiseQuiz(groupId: string): Promise<ApiResponse<ParaWiseQuestionGroup>> {
    return ApiClient.get(`/quiz/para-wise/${groupId}`, () => {
      return MOCK_PARA_WISE_GROUPS.find(g => g.id === groupId) || MOCK_PARA_WISE_GROUPS[0];
    });
  }

  static async submitQuiz(courseId: string, quizId: string, responses: QuizResponse[]): Promise<ApiResponse<QuizResult>> {
    return ApiClient.post(`/quiz/${quizId}/submit`, { courseId, responses }, () => {
      const questions = MOCK_QUIZ_QUESTIONS[quizId] || MOCK_QUIZ_QUESTIONS['qiz_fin_1'];
      let totalScore = 0;
      let maxScore = 0;

      const questionResults = questions.map((q, idx) => {
        const userResp = responses.find(r => r.questionId === q.id) || responses[idx];
        const correctOpt = q.options?.find(o => o.isCorrect);
        const isCorrect = userResp?.selectedOptionId ? userResp.selectedOptionId === correctOpt?.id : true;
        
        maxScore += q.xpValue;
        if (isCorrect) totalScore += q.xpValue;

        return {
          questionId: q.id,
          prompt: q.prompt,
          isCorrect,
          userAnswer: q.options?.find(o => o.id === userResp?.selectedOptionId)?.text || 'Assigned answer',
          correctAnswer: correctOpt?.text || 'Correct standard',
          explanation: q.explanation,
        };
      });

      const percentage = Math.round((totalScore / (maxScore || 1)) * 100);
      const passed = percentage >= 70;

      return {
        quizId,
        courseId,
        userId: 'usr_learner_aria',
        totalScore,
        maxScore,
        percentage,
        passed,
        xpEarned: totalScore + (passed ? 50 : 0),
        strengths: ['High conceptual accuracy on core definitions', 'Fast decision response under time limit'],
        improvementAreas: percentage < 100 ? ['Review subtle distractor clauses in compound interest calculations'] : [],
        recommendedAction: passed ? 'Proceed to Spin & Teach challenge' : 'Review lesson takeaways and retry quiz',
        feedbackSummary: passed
          ? 'Outstanding mastery demonstrated! Your grasp of proactive cashflow mechanics is solid.'
          : 'Good effort. Review key concepts and try again to unlock your mastery badge.',
        questionResults,
      };
    });
  }
}
