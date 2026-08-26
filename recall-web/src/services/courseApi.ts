import { ApiClient, ApiResponse } from './apiClient';
import { Subject, Course, Lesson, Module, Enrollment } from '../types';
import { MOCK_SUBJECTS, MOCK_COURSES } from '../mock/mockData';

export class CourseApi {
  static async getSubjects(): Promise<ApiResponse<Subject[]>> {
    return ApiClient.get<Subject[]>('/subjects', () => [...MOCK_SUBJECTS]);
  }

  static async getSubjectBySlug(slug: string): Promise<ApiResponse<Subject | null>> {
    return ApiClient.get<Subject | null>(`/subjects/${slug}`, () => {
      return MOCK_SUBJECTS.find(s => s.slug === slug) || null;
    });
  }

  static async getCourses(subjectId?: string): Promise<ApiResponse<Course[]>> {
    return ApiClient.get<Course[]>('/courses', () => {
      if (subjectId) {
        return MOCK_COURSES.filter(c => c.subjectId === subjectId);
      }
      return [...MOCK_COURSES];
    });
  }

  static async getCoursesBySubject(subjectId: string): Promise<ApiResponse<Course[]>> {
    return this.getCourses(subjectId);
  }

  static async getCourseById(courseId: string): Promise<ApiResponse<Course | null>> {
    return ApiClient.get<Course | null>(`/courses/${courseId}`, () => {
      return MOCK_COURSES.find(c => c.id === courseId || c.slug === courseId) || MOCK_COURSES[0];
    });
  }

  static async getLesson(courseId: string, lessonId: string): Promise<ApiResponse<{ lesson: Lesson; module: Module; course: Course } | null>> {
    return ApiClient.get(`/courses/${courseId}/lessons/${lessonId}`, () => {
      const course = MOCK_COURSES.find(c => c.id === courseId || c.slug === courseId) || MOCK_COURSES[0];
      for (const mod of course.modules) {
        const lesson = mod.lessons.find(l => l.id === lessonId);
        if (lesson) {
          return { lesson, module: mod, course };
        }
      }
      // fallback to first lesson
      return {
        lesson: course.modules[0].lessons[0],
        module: course.modules[0],
        course,
      };
    });
  }

  static async completeLesson(courseId: string, lessonId: string, notes?: string): Promise<ApiResponse<{ xpEarned: number; newTotalXp: number; nextLessonId?: string }>> {
    return ApiClient.post(`/courses/${courseId}/lessons/${lessonId}/complete`, { notes }, () => {
      return {
        xpEarned: 60,
        newTotalXp: 4910,
        nextLessonId: 'les_fin_102',
      };
    });
  }

  static async saveLessonNote(courseId: string, lessonId: string, note: string): Promise<ApiResponse<{ saved: boolean }>> {
    return ApiClient.post(`/courses/${courseId}/lessons/${lessonId}/notes`, { note }, () => ({ saved: true }));
  }

  static async toggleBookmark(courseId: string, lessonId: string): Promise<ApiResponse<{ isBookmarked: boolean }>> {
    return ApiClient.post(`/courses/${courseId}/lessons/${lessonId}/bookmark`, {}, () => ({ isBookmarked: true }));
  }
}
