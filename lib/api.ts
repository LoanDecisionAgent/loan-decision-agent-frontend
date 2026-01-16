import { ScoreRequest, ScoreResponse, ApiError } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export class ApiClientError extends Error {
  public code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'ApiClientError';
  }
}

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
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
      throw new ApiClientError(errorData.code, errorData.message);
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
  return apiCall<ScoreResponse>('/score', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// For loading states, the caller can use React state or hooks like useState for loading.
// Example: const [loading, setLoading] = useState(false);
// Then: setLoading(true); scoreLoan(request).then(setLoading(false)).catch(handleError);