import { ScoreRequest, ScoreResponse, ApiError } from '../types';

// Get API base URL from environment variable
// For Next.js, we use NEXT_PUBLIC_API_BASE_URL (not VITE_API_BASE_URL)
// This allows the frontend to be configured without hardcoded URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:3001';

export class ApiClientError extends Error {
  public code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'ApiClientError';
  }
}

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Ensure endpoint starts with / if API_BASE_URL doesn't end with /
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const endpointPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${endpointPath}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiError;
      try {
        errorData = await response.json();
      } catch {
        errorData = { code: 'UNKNOWN_ERROR', message: `HTTP ${response.status}: ${response.statusText}` };
      }
      throw new ApiClientError(errorData.code || 'HTTP_ERROR', errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    // Network or other errors
    throw new ApiClientError('NETWORK_ERROR', error instanceof Error ? error.message : 'Unknown network error');
  }
}

export async function scoreLoan(request: ScoreRequest): Promise<ScoreResponse> {
  return apiCall<ScoreResponse>('/api/score', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}