
export enum UserRole {
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR'
}

export enum JobStatus {
  PROCESSING = 'Processing',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  QUEUED = 'Queued'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatar: string;
}

export interface Job {
  id: string;
  status: JobStatus;
  createdAt: string;
  recordsCount: number;
}

export interface Vendor {
  id: string;
  name: string;
  status: 'Active' | 'Warning' | 'Pending' | 'Suspended';
  tokensIssued: number;
  lastActivity: string;
  logoInitials: string;
}

export interface AuditLog {
  id: string;
  appId: string;
  actor: string;
  timestamp: string;
  payload: any;
}

export interface ScoreRequest {
  income: number;
  requested_amount: number;
  term_months: number;
  interest_rate: number;
}

export interface Reason {
  feature: string;
  impact: number;
}

export interface Affordability {
  monthly_payment: number;
  max_loan_amount: number;
}

export interface Scorecard {
  trust_score: number;
  default_probability: number;
  affordability: Affordability;
  anomaly_flag: boolean;
  decision: string;
  reasons: Reason[];
}

export interface Audit {
  model_version: string;
  timestamp: string;
}

export interface ScoreResponse {
  app_id: string;
  scorecard: Scorecard;
  audit: Audit;
}

export interface ApiError {
  code: string;
  message: string;
}
