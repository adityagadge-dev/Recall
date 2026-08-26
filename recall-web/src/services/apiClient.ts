/**
 * Base API client for RECALL.
 * Configured to seamlessly toggle between mock responses and the real Flask REST API.
 * Future Flask endpoints: /api/v1/*
 */

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

const envObj = (import.meta as any)?.env || {};
const USE_MOCK = envObj.VITE_USE_MOCK_API !== 'false'; // Default to true in dev
const API_BASE = envObj.VITE_API_BASE_URL || '/api/v1';

export class ApiClient {
  private static async delay(ms: number = 250): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async get<T>(endpoint: string, mockDataGenerator: () => T): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      await this.delay();
      return {
        data: mockDataGenerator(),
        success: true,
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return {
        data,
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.warn(`[API Client] Real backend fallback to mock for ${endpoint}:`, error);
      return {
        data: mockDataGenerator(),
        success: true,
        timestamp: new Date().toISOString(),
      };
    }
  }

  static async post<T, B = unknown>(endpoint: string, body: B, mockDataGenerator: (body: B) => T): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      await this.delay(350);
      return {
        data: mockDataGenerator(body),
        success: true,
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return {
        data,
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.warn(`[API Client] Real backend fallback to mock for POST ${endpoint}:`, error);
      return {
        data: mockDataGenerator(body),
        success: true,
        timestamp: new Date().toISOString(),
      };
    }
  }

  static async put<T, B = unknown>(endpoint: string, body: B, mockDataGenerator: (body: B) => T): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      await this.delay(300);
      return {
        data: mockDataGenerator(body),
        success: true,
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return {
        data,
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: mockDataGenerator(body),
        success: true,
        timestamp: new Date().toISOString(),
      };
    }
  }

  static async delete<T>(endpoint: string, mockDataGenerator: () => T): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      await this.delay(200);
      return {
        data: mockDataGenerator(),
        success: true,
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
      const data = await res.json();
      return { data, success: true, timestamp: new Date().toISOString() };
    } catch {
      return { data: mockDataGenerator(), success: true, timestamp: new Date().toISOString() };
    }
  }
}
