
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
  age: number;
  income: number;
  loanamount: number;
  interestrate: number;
  loanterm: number;
  dtiratio: number;
  employmenttype: string;
  maritalstatus: string;
  loanpurpose: string;
  hasdependents: number;
}

export interface ScoreResponse {
  default_probability: number;
  risk_band: string;
  model_decision: string;
  top_factors: string[];
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
  id: string;
  applicationId: string;
  rating: number;
  comment: string;
  submittedAt: string;
  submittedBy: string;
}

export interface BatchJob {
  id: string;
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
