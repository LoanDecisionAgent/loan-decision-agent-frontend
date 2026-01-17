/**
 * Error handling utilities for graceful error management
 */

export interface ErrorInfo {
  code: string;
  message: string;
  userMessage: string;
  severity: 'error' | 'warning' | 'info';
}

export class AppError extends Error {
  public code: string;
  public userMessage: string;
  public severity: 'error' | 'warning' | 'info';

  constructor(code: string, message: string, userMessage?: string, severity: 'error' | 'warning' | 'info' = 'error') {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.userMessage = userMessage || message;
    this.severity = severity;
  }
}

/**
 * Maps error codes to user-friendly messages
 */
const ERROR_MESSAGES: Record<string, ErrorInfo> = {
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    message: 'Network request failed',
    userMessage: 'Unable to connect to the server. Please check your internet connection and try again.',
    severity: 'error',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Authentication required',
    userMessage: 'Your session has expired. Please log in again.',
    severity: 'warning',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'Access denied',
    userMessage: 'You do not have permission to perform this action.',
    severity: 'error',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Resource not found',
    userMessage: 'The requested resource could not be found.',
    severity: 'error',
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid input',
    userMessage: 'Please check your input and try again.',
    severity: 'warning',
  },
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    message: 'Server error',
    userMessage: 'An error occurred on the server. Please try again later.',
    severity: 'error',
  },
  TIMEOUT: {
    code: 'TIMEOUT',
    message: 'Request timeout',
    userMessage: 'The request took too long. Please try again.',
    severity: 'warning',
  },
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    userMessage: 'Something went wrong. Please try again or contact support if the problem persists.',
    severity: 'error',
  },
};

/**
 * Handles errors and returns user-friendly error information
 */
export function handleError(error: unknown): ErrorInfo {
  // Handle AppError instances
  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      userMessage: error.userMessage,
      severity: error.severity,
    };
  }

  // Handle Error instances
  if (error instanceof Error) {
    // Check if error code exists in our mapping
    const errorCode = (error as any).code || 'UNKNOWN_ERROR';
    const mappedError = ERROR_MESSAGES[errorCode];

    if (mappedError) {
      return mappedError;
    }

    // Return generic error with original message
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      userMessage: error.message || ERROR_MESSAGES.UNKNOWN_ERROR.userMessage,
      severity: 'error',
    };
  }

  // Handle string errors
  if (typeof error === 'string') {
    return {
      code: 'UNKNOWN_ERROR',
      message: error,
      userMessage: error,
      severity: 'error',
    };
  }

  // Fallback for unknown error types
  return ERROR_MESSAGES.UNKNOWN_ERROR;
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true };
}

/**
 * Sanitizes user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Formats error for display in UI
 */
export function formatErrorForDisplay(error: ErrorInfo): string {
  return error.userMessage;
}
