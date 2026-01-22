import { ScoreRequest, ScoreResponse, ApiError } from '../types';
import { AppError, handleError } from './error-handler';

// Get API base URL from environment variable
// For Next.js, we use NEXT_PUBLIC_API_BASE_URL (not VITE_API_BASE_URL)
// This allows the frontend to be configured without hardcoded URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:3001';

// Security: Validate API base URL to prevent SSRF attacks
function validateApiUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    // Prevent localhost/internal network access in production (optional)
    if (process.env.NODE_ENV === 'production') {
      const hostname = parsed.hostname;
      if (['localhost', '127.0.0.1', '0.0.0.0'].includes(hostname) || hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.')) {
        console.warn('Warning: API URL points to internal network in production');
      }
    }
    return true;
  } catch {
    return false;
  }
}

if (!validateApiUrl(API_BASE_URL)) {
  console.error('Invalid API_BASE_URL configuration');
}

export class ApiClientError extends Error {
  public code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'ApiClientError';
  }
}

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Security: Sanitize endpoint to prevent path traversal
  const sanitizedEndpoint = endpoint.replace(/\.\./g, '').replace(/\/\//g, '/');

  // Ensure endpoint starts with / if API_BASE_URL doesn't end with /
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const endpointPath = sanitizedEndpoint.startsWith('/') ? sanitizedEndpoint : `/${sanitizedEndpoint}`;
  const url = `${baseUrl}${endpointPath}`;

  // Security: Set timeout to prevent hanging requests
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      // Security: Add CSRF protection headers if needed
      'X-Requested-With': 'XMLHttpRequest',
      ...(typeof window !== 'undefined' && localStorage.getItem('token') ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {}),
      ...options.headers,
    },
    signal: controller.signal,
    ...options,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData: ApiError;
      try {
        errorData = await response.json();
      } catch {
        errorData = { code: 'UNKNOWN_ERROR', message: `HTTP ${response.status}: ${response.statusText}` };
      }

      // Map HTTP status codes to error codes
      let errorCode = errorData.code || 'UNKNOWN_ERROR';
      if (response.status === 401) errorCode = 'UNAUTHORIZED';
      else if (response.status === 403) errorCode = 'FORBIDDEN';
      else if (response.status === 404) errorCode = 'NOT_FOUND';
      else if (response.status === 400 || response.status === 422) errorCode = 'VALIDATION_ERROR';
      else if (response.status >= 500) errorCode = 'SERVER_ERROR';

      // Handle NestJS validation errors which return { message: string[] }
      let errorMessage = errorData.message;
      if (Array.isArray(errorMessage)) {
        errorMessage = (errorMessage as string[]).join(', ');
      }

      throw new ApiClientError(errorCode, (errorMessage as string) || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Check for 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    const data: T = await response.json().catch(() => ({}) as T);
    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiClientError) {
      throw error;
    }

    // Handle abort (timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiClientError('TIMEOUT', 'Request timeout. Please try again.');
    }

    // Network or other errors
    const handledError = handleError(error);
    throw new ApiClientError(handledError.code, handledError.userMessage);
  }
}

export async function scoreLoan(request: ScoreRequest): Promise<ScoreResponse> {
  // Defensive input sanitization
  const age = Number(request.age);
  const income = Number(request.income);
  const loanAmount = Number(request.requested_amount);
  const loanTerm = Number(request.requested_term_months);
  const expenses = Number(request.monthly_expenses);
  const existingDebt = Number(request.existing_debt);

  // Calculate DTI safely
  let dtiRatio = 0.0;
  if (income > 0 && !isNaN(income) && !isNaN(expenses) && !isNaN(existingDebt)) {
    dtiRatio = (expenses + existingDebt) / income;
  }

  // Map employment status to backend expected values
  let apiEmploymentType = 'unemployed';
  const status = (request.employment_status || '').toUpperCase();
  if (status === 'EMPLOYED') {
    apiEmploymentType = 'salaried';
  } else if (status === 'SELF_EMPLOYED') {
    apiEmploymentType = 'self_employed';
  }

  // Construct strictly typed payload matching backend schema
  const payload = {
    age: isNaN(age) ? 0 : age,
    income: isNaN(income) ? 0 : income,
    loanamount: isNaN(loanAmount) ? 0 : loanAmount,
    interestrate: 8,
    loanterm: isNaN(loanTerm) ? 0 : loanTerm,
    dtiratio: Number(dtiRatio.toFixed(4)), // Limit precision for cleaner JSON
    employmenttype: apiEmploymentType,
    maritalstatus: "single",
    loanpurpose: "personal",
    hasdependents: 0,
  };

  // Send mapped payload
  const rawResponse = await apiCall<any>('/api/score', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // Map Backend Response to UI Model
  return {
    decision: rawResponse.model_decision,
    probability: rawResponse.default_probability,
    risk_band: rawResponse.risk_band,
    application_id: rawResponse.application_id || request.applicant_id || 'unknown',
  };
}

// Auth API
export async function register(data: import('../types').RegisterRequest): Promise<import('../types').AuthResponse> {
  return apiCall<import('../types').AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function login(data: import('../types').LoginRequest): Promise<import('../types').AuthResponse> {
  return apiCall<import('../types').AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMe(): Promise<import('../types').User> {
  return apiCall<import('../types').User>('/auth/me');
}

// Batch Upload API
export async function uploadBatchFile(file: File): Promise<{ jobId: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:3001';
  const url = `${API_BASE_URL}/api/batch/upload`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for file uploads

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiClientError('UPLOAD_ERROR', `Upload failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof ApiClientError) throw error;
    throw new ApiClientError('NETWORK_ERROR', 'Failed to upload file');
  }
}

export async function getBatchJobs(): Promise<import('../types').BatchJob[]> {
  return apiCall<import('../types').BatchJob[]>('/api/batch/jobs');
}

export async function getBatchJobDetails(jobId: string): Promise<import('../types').BatchJob> {
  return apiCall<import('../types').BatchJob>(`/api/batch/jobs/${jobId}`);
}

export async function downloadBatchResults(jobId: string): Promise<void> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:3001';
  const url = `${API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL}/api/batch/jobs/${jobId}/download`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `batch_results_${jobId}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
}

// Request Logs API
export async function getRequestLogs(params?: { limit?: number; offset?: number; vendorId?: string }): Promise<{ logs: import('../types').RequestLog[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.offset) queryParams.append('offset', params.offset.toString());
  if (params?.vendorId) queryParams.append('vendorId', params.vendorId);

  const query = queryParams.toString();
  return apiCall<{ logs: import('../types').RequestLog[]; total: number }>(`/api/logs/requests${query ? `?${query}` : ''}`);
}

// Vendors API
export async function getVendors(): Promise<import('../types').Vendor[]> {
  return apiCall<import('../types').Vendor[]>('/api/vendors');
}

export async function createVendor(vendor: Partial<import('../types').Vendor>): Promise<import('../types').Vendor> {
  return apiCall<import('../types').Vendor>('/api/vendors', {
    method: 'POST',
    body: JSON.stringify(vendor),
  });
}

export async function updateVendor(id: string, vendor: Partial<import('../types').Vendor>): Promise<import('../types').Vendor> {
  return apiCall<import('../types').Vendor>(`/api/vendors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(vendor),
  });
}

export async function deleteVendor(id: string): Promise<void> {
  return apiCall<void>(`/api/vendors/${id}`, {
    method: 'DELETE',
  });
}

// Audit Logs API
export async function getAuditLogs(params?: { limit?: number; offset?: number; actor?: string }): Promise<{ logs: import('../types').AuditLog[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.offset) queryParams.append('offset', params.offset.toString());
  if (params?.actor) queryParams.append('actor', params.actor);

  const query = queryParams.toString();
  return apiCall<{ logs: import('../types').AuditLog[]; total: number }>(`/api/audit/logs${query ? `?${query}` : ''}`);
}

// API Keys API
export async function getApiKeys(): Promise<import('../types').ApiKey[]> {
  return apiCall<import('../types').ApiKey[]>('/api/keys');
}

export async function createApiKey(name: string, permissions: string[]): Promise<import('../types').ApiKey> {
  return apiCall<import('../types').ApiKey>('/api/keys', {
    method: 'POST',
    body: JSON.stringify({ name, permissions }),
  });
}

export async function revokeApiKey(id: string): Promise<void> {
  return apiCall<void>(`/api/keys/${id}/revoke`, {
    method: 'POST',
  });
}

export async function deleteApiKey(id: string): Promise<void> {
  return apiCall<void>(`/api/keys/${id}`, {
    method: 'DELETE',
  });
}

// Dashboard Stats API
export async function getDashboardStats(): Promise<{ totalRequests: number; approved: number; rejected: number; avgLatencyMs: number }> {
  return apiCall<{ totalRequests: number; approved: number; rejected: number; avgLatencyMs: number }>('/api/stats');
}

export async function updateProfile(data: { name?: string; password?: string }): Promise<import('../types').User> {
  return apiCall<import('../types').User>('/auth/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Feedback API
export async function getFeedback(params?: { limit?: number; offset?: number }): Promise<{ feedback: import('../types').Feedback[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.offset) queryParams.append('offset', params.offset.toString());

  const query = queryParams.toString();
  return apiCall<{ feedback: import('../types').Feedback[]; total: number }>(`/api/feedback${query ? `?${query}` : ''}`);
}

export async function submitFeedback(data: any): Promise<import('../types').Feedback> {
  // Ensure payload matches backend expectation
  const payload = {
    applicationId: data.applicationId,
    outcomeType: data.outcome || data.outcomeType, // Handle both cases
    comment: data.comment
  };

  return apiCall<import('../types').Feedback>('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}