
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
  applicant_id: string;
  requested_amount: number;
  requested_term_months: number;
  income: number;
  monthly_expenses: number;
  existing_debt: number;
  credit_score: number;
  employment_status: 'EMPLOYED' | 'SELF_EMPLOYED' | 'UNEMPLOYED';
  employment_duration_months: number;
  age: number;
}

export interface ScoreResponse {
  decision: 'APPROVE' | 'REJECT';
  probability: number;
  risk_band: 'LOW' | 'MEDIUM' | 'HIGH';
  application_id: string;
}

export interface ApiError {
  code: string;
  message: string;
}

export interface RequestLog {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  status: number;
  responseTime: number;
  vendorId?: string;
  vendorName?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  status: 'active' | 'revoked';
  permissions: string[];
}

export interface Feedback {
  id?: string; // Optional in cheat sheet response payload isn't fully defined but keeping id
  applicationId: string;
  outcomeType: 'REPAID' | 'DEFAULTED' | 'ONGOING' | 'CANCELLED';
  outcomeDate: string;
  amountRecovered?: number;
  notes?: string;
  // keeping submittedAt/By just in case, but making optional or removing if strict
  submittedAt?: string;
  submittedBy?: string;
}

export interface FeedbackRequest {
  applicationId: string;
  outcomeType: 'REPAID' | 'DEFAULTED' | 'ONGOING' | 'CANCELLED';
  outcomeDate: string;
  amountRecovered?: number;
  notes?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole; // 'VENDOR' or 'ADMIN'
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface BatchJob {
  id: string;
  jobId?: string;
  filename?: string;
  status: JobStatus;
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  failedRecords: number;
  createdAt: string;
  completedAt?: string;
  errorMessage?: string;
}
