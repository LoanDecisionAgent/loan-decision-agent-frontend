
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
