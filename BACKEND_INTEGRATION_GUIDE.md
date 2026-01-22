# Backend Integration Guide - Complete API Specifications

**Generated:** January 2025  
**Frontend Framework:** Next.js 14 (React 18, TypeScript)  
**API Base URL:** Configurable via `NEXT_PUBLIC_API_BASE_URL` (default: `http://backend:3001`)

---

## 📋 Table of Contents

1. [API Endpoints Overview](#api-endpoints-overview)
2. [Data Types & Interfaces](#data-types--interfaces)
3. [Authentication & Authorization](#authentication--authorization)
4. [Request/Response Formats](#requestresponse-formats)
5. [Error Handling](#error-handling)
6. [Security Requirements](#security-requirements)
7. [Environment Configuration](#environment-configuration)

---

## 🔌 API Endpoints Overview

### Base Configuration
- **Content-Type:** `application/json` (except file uploads)
- **Request Timeout:** 30 seconds (60 seconds for file uploads)
- **Headers:** `X-Requested-With: XMLHttpRequest` (CSRF protection)
- **Authentication:** Bearer token in `Authorization` header (where required)

---

## 📊 API Endpoints Detailed Specifications

### 1. Loan Scoring API

#### `POST /api/score`
Submit a loan application for AI-powered risk assessment.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <api-key> (optional)
```

**Request Body:**
```json
{
  "age": 35,
  "income": 5500,
  "loanamount": 12000,
  "interestrate": 0.08,
  "loanterm": 36,
  "dtiratio": 0.18,
  "employmenttype": "Salaried",
  "maritalstatus": "Single",
  "loanpurpose": "Education",
  "hasdependents": 0
}
```

**Field Specifications:**

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `age` | number | Yes | 18-100 | Applicant's age |
| `income` | number | Yes | > 0 | Monthly income |
| `loanamount` | number | Yes | > 0 | Loan amount requested |
| `interestrate` | number | Yes | 0.0-1.0 | Interest rate (e.g., 0.08 = 8%) |
| `loanterm` | number | Yes | 1-360 | Loan term in months |
| `dtiratio` | number | Yes | 0.0-1.0 | Debt-to-income ratio (e.g., 0.18 = 18%) |
| `employmenttype` | string | Yes | Enum | Values: "Salaried", "Self-Employed", "Unemployed", "Retired" |
| `maritalstatus` | string | Yes | Enum | Values: "Single", "Married", "Divorced", "Widowed" |
| `loanpurpose` | string | Yes | Enum | Values: "Education", "Home", "Business", "Personal", "Medical", "Vehicle" |
| `hasdependents` | number | Yes | 0 or 1 | 0 = No, 1 = Yes |

**Success Response (200 OK):**
```json
{
  "default_probability": 0.48,
  "risk_band": "MEDIUM",
  "model_decision": "APPROVE",
  "top_factors": ["income", "dtiratio", "loanamount"]
}
```

**Response Field Specifications:**

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `default_probability` | number | 0.0-1.0 | Probability of default (0.0 to 1.0) |
| `risk_band` | string | Enum | Values: "LOW", "MEDIUM", "HIGH" |
| `model_decision` | string | Enum | Values: "APPROVE", "REJECT" |
| `top_factors` | string[] | Array | Top factors influencing decision (e.g., ["income", "dtiratio"]) |

---

### 2. Batch Processing API

#### `POST /api/batch/upload`
Upload a CSV/Excel file for batch processing.

**Request Headers:**
```
Content-Type: multipart/form-data
Authorization: Bearer <api-key> (required)
```

**Request Body:**
- FormData with field name: `file`
- File types: CSV, Excel (.xlsx, .xls)
- Max file size: Should be configured on backend

**Success Response (200 OK):**
```json
{
  "jobId": "job-12345-abcde"
}
```

**Response Field:**
| Field | Type | Description |
|-------|------|-------------|
| `jobId` | string | Unique identifier for the batch job |

---

#### `GET /api/batch/jobs`
Get list of batch processing jobs.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | number | No | 50 | Maximum number of jobs to return |
| `offset` | number | No | 0 | Number of jobs to skip |

**Success Response (200 OK):**
```json
[
  {
    "id": "job-12345-abcde",
    "filename": "applications.csv",
    "status": "Processing",
    "totalRecords": 1000,
    "processedRecords": 450,
    "successfulRecords": 420,
    "failedRecords": 30,
    "createdAt": "2025-01-15T10:30:00Z",
    "completedAt": null,
    "errorMessage": null
  }
]
```

**Job Status Values:**
- `"Processing"` - Job is currently being processed
- `"Completed"` - Job finished successfully
- `"Failed"` - Job failed with errors
- `"Queued"` - Job is waiting to be processed

---

#### `GET /api/batch/jobs/:jobId`
Get details of a specific batch job.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `jobId` | string | Unique job identifier |

**Success Response (200 OK):**
```json
{
  "id": "job-12345-abcde",
  "filename": "applications.csv",
  "status": "Completed",
  "totalRecords": 1000,
  "processedRecords": 1000,
  "successfulRecords": 950,
  "failedRecords": 50,
  "createdAt": "2025-01-15T10:30:00Z",
  "completedAt": "2025-01-15T11:45:00Z",
  "errorMessage": null
}
```

---

### 3. Vendor Management API (Admin Only)

#### `GET /api/vendors`
Get list of all vendors.

**Authorization:** Admin role required

**Success Response (200 OK):**
```json
[
  {
    "id": "vendor-123",
    "name": "Acme Corp",
    "status": "Active",
    "tokensIssued": 5000,
    "lastActivity": "2025-01-15T09:00:00Z",
    "logoInitials": "AC"
  }
]
```

**Vendor Status Values:**
- `"Active"` - Vendor is active
- `"Warning"` - Vendor has warnings
- `"Pending"` - Vendor is pending approval
- `"Suspended"` - Vendor is suspended

---

#### `POST /api/vendors`
Create a new vendor.

**Authorization:** Admin role required

**Request Body:**
```json
{
  "name": "New Vendor Inc",
  "status": "Pending",
  "tokensIssued": 0,
  "lastActivity": "2025-01-15T10:00:00Z",
  "logoInitials": "NV"
}
```

**Success Response (200 OK):**
```json
{
  "id": "vendor-456",
  "name": "New Vendor Inc",
  "status": "Pending",
  "tokensIssued": 0,
  "lastActivity": "2025-01-15T10:00:00Z",
  "logoInitials": "NV"
}
```

---

#### `PUT /api/vendors/:id`
Update an existing vendor.

**Authorization:** Admin role required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Vendor ID |

**Request Body:** (All fields optional)
```json
{
  "name": "Updated Vendor Name",
  "status": "Active",
  "tokensIssued": 1000
}
```

**Success Response (200 OK):**
```json
{
  "id": "vendor-123",
  "name": "Updated Vendor Name",
  "status": "Active",
  "tokensIssued": 1000,
  "lastActivity": "2025-01-15T09:00:00Z",
  "logoInitials": "UV"
}
```

---

#### `DELETE /api/vendors/:id`
Delete a vendor.

**Authorization:** Admin role required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Vendor ID |

**Success Response:** `204 No Content`

---

### 4. Request Logs API

#### `GET /api/logs/requests`
Get request logs with filtering and pagination.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Maximum number of logs (default: 50) |
| `offset` | number | No | Number of logs to skip (default: 0) |
| `vendorId` | string | No | Filter by vendor ID |

**Success Response (200 OK):**
```json
{
  "logs": [
    {
      "id": "log-123",
      "timestamp": "2025-01-15T10:30:00Z",
      "endpoint": "/api/score",
      "method": "POST",
      "status": 200,
      "responseTime": 245,
      "vendorId": "vendor-123",
      "vendorName": "Acme Corp"
    }
  ],
  "total": 1500
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `logs` | array | Array of request log objects |
| `total` | number | Total number of logs matching filters |

**Log Object Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique log identifier |
| `timestamp` | string | ISO 8601 timestamp |
| `endpoint` | string | API endpoint path |
| `method` | string | HTTP method (GET, POST, etc.) |
| `status` | number | HTTP status code |
| `responseTime` | number | Response time in milliseconds |
| `vendorId` | string | Optional vendor ID |
| `vendorName` | string | Optional vendor name |

---

### 5. Audit Logs API (Admin Only)

#### `GET /api/audit/logs`
Get system audit logs.

**Authorization:** Admin role required

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Maximum number of logs (default: 50) |
| `offset` | number | No | Number of logs to skip (default: 0) |
| `actor` | string | No | Filter by actor/user ID |

**Success Response (200 OK):**
```json
{
  "logs": [
    {
      "id": "audit-123",
      "appId": "app-456",
      "actor": "user-789",
      "timestamp": "2025-01-15T10:30:00Z",
      "payload": {
        "action": "vendor_created",
        "vendorId": "vendor-123",
        "details": "Created new vendor Acme Corp"
      }
    }
  ],
  "total": 500
}
```

**Audit Log Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique audit log identifier |
| `appId` | string | Application/context ID |
| `actor` | string | User/entity that performed the action |
| `timestamp` | string | ISO 8601 timestamp |
| `payload` | object | Action details (flexible structure) |

---

### 6. API Keys Management API (Admin Only)

#### `GET /api/keys`
Get list of all API keys.

**Authorization:** Admin role required

**Success Response (200 OK):**
```json
[
  {
    "id": "key-123",
    "name": "Production API Key",
    "key": "sk_live_abc123...xyz789",
    "createdAt": "2025-01-10T08:00:00Z",
    "lastUsed": "2025-01-15T10:30:00Z",
    "status": "active",
    "permissions": ["score", "batch", "logs"]
  }
]
```

**API Key Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique key identifier |
| `name` | string | Human-readable key name |
| `key` | string | API key (may be masked in responses) |
| `createdAt` | string | ISO 8601 creation timestamp |
| `lastUsed` | string | ISO 8601 last usage timestamp (nullable) |
| `status` | string | Values: "active", "revoked" |
| `permissions` | string[] | Array of permission strings |

---

#### `POST /api/keys`
Create a new API key.

**Authorization:** Admin role required

**Request Body:**
```json
{
  "name": "New API Key",
  "permissions": ["score", "batch"]
}
```

**Success Response (200 OK):**
```json
{
  "id": "key-456",
  "name": "New API Key",
  "key": "sk_live_newkey123...",
  "createdAt": "2025-01-15T10:00:00Z",
  "lastUsed": null,
  "status": "active",
  "permissions": ["score", "batch"]
}
```

---

#### `POST /api/keys/:id/revoke`
Revoke an API key (soft delete).

**Authorization:** Admin role required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | API key ID |

**Success Response:** `204 No Content`

---

#### `DELETE /api/keys/:id`
Permanently delete an API key.

**Authorization:** Admin role required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | API key ID |

**Success Response:** `204 No Content`

---

### 7. Feedback API

#### `GET /api/feedback`
Get feedback submissions.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Maximum number of feedback items (default: 50) |
| `offset` | number | No | Number of items to skip (default: 0) |

**Success Response (200 OK):**
```json
{
  "feedback": [
    {
      "id": "feedback-123",
      "applicationId": "app-456",
      "rating": 5,
      "comment": "Great service, accurate predictions!",
      "submittedAt": "2025-01-15T10:30:00Z",
      "submittedBy": "user-789"
    }
  ],
  "total": 250
}
```

**Feedback Fields:**
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | string | - | Unique feedback identifier |
| `applicationId` | string | - | Related application/loan ID |
| `rating` | number | 1-5 | Rating (1 = worst, 5 = best) |
| `comment` | string | - | Feedback comment text |
| `submittedAt` | string | ISO 8601 | Submission timestamp |
| `submittedBy` | string | - | User ID who submitted feedback |

---

#### `POST /api/feedback`
Submit new feedback.

**Request Body:**
```json
{
  "applicationId": "app-456",
  "rating": 5,
  "comment": "Great service, accurate predictions!"
}
```

**Success Response (200 OK):**
```json
{
  "id": "feedback-123",
  "applicationId": "app-456",
  "rating": 5,
  "comment": "Great service, accurate predictions!",
  "submittedAt": "2025-01-15T10:30:00Z",
  "submittedBy": "user-789"
}
```

---

## 📊 Data Types & Interfaces

### TypeScript Enums

```typescript
enum UserRole {
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR'
}

enum JobStatus {
  PROCESSING = 'Processing',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  QUEUED = 'Queued'
}
```

### Core Interfaces

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatar: string;
}

interface ScoreRequest {
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

interface ScoreResponse {
  default_probability: number;
  risk_band: string;
  model_decision: string;
  top_factors: string[];
}

interface BatchJob {
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

interface Vendor {
  id: string;
  name: string;
  status: 'Active' | 'Warning' | 'Pending' | 'Suspended';
  tokensIssued: number;
  lastActivity: string;
  logoInitials: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  status: 'active' | 'revoked';
  permissions: string[];
}

interface Feedback {
  id: string;
  applicationId: string;
  rating: number;
  comment: string;
  submittedAt: string;
  submittedBy: string;
}

interface RequestLog {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  status: number;
  responseTime: number;
  vendorId?: string;
  vendorName?: string;
}

interface AuditLog {
  id: string;
  appId: string;
  actor: string;
  timestamp: string;
  payload: any;
}

interface ApiError {
  code: string;
  message: string;
}
```

---

## 🔐 Authentication & Authorization

### Current Frontend Implementation

The frontend currently uses **mock authentication** for development. The backend should implement:

### Required Authentication Endpoints

#### `POST /api/auth/login`
User login endpoint.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "VENDOR",
    "organization": "Acme Corp",
    "avatar": "https://..."
  }
}
```

#### `POST /api/auth/signup`
User registration endpoint.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "organization": "Acme Corp",
  "role": "VENDOR"
}
```

**Success Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "VENDOR",
    "organization": "Acme Corp",
    "avatar": "https://..."
  }
}
```

#### `GET /api/auth/me`
Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "id": "user-123",
  "name": "John Doe",
  "email": "user@example.com",
  "role": "VENDOR",
  "organization": "Acme Corp",
  "avatar": "https://..."
}
```

#### `POST /api/auth/logout`
Logout endpoint (optional, token invalidation).

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `204 No Content`

### Token Format

- **Type:** JWT (JSON Web Token) recommended
- **Header:** `Authorization: Bearer <token>`
- **Storage:** Frontend stores in localStorage/sessionStorage
- **Expiration:** Should be configurable (recommended: 24 hours)
- **Refresh:** Optional refresh token mechanism

### Authorization Rules

| Endpoint | Admin Required | Vendor Required | Public |
|----------|---------------|-----------------|--------|
| `POST /api/score` | No | No | Yes (with optional API key) |
| `POST /api/batch/upload` | No | Yes | No |
| `GET /api/batch/jobs` | No | Yes | No |
| `GET /api/vendors` | Yes | No | No |
| `POST /api/vendors` | Yes | No | No |
| `PUT /api/vendors/:id` | Yes | No | No |
| `DELETE /api/vendors/:id` | Yes | No | No |
| `GET /api/logs/requests` | No | Yes (own logs) | No |
| `GET /api/audit/logs` | Yes | No | No |
| `GET /api/keys` | Yes | No | No |
| `POST /api/keys` | Yes | No | No |
| `GET /api/feedback` | No | Yes | No |
| `POST /api/feedback` | No | Yes | No |

---

## ⚠️ Error Handling

### Error Response Format

All error responses should follow this structure:

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

### HTTP Status Code Mappings

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `VALIDATION_ERROR` | Invalid request data |
| 401 | `UNAUTHORIZED` | Authentication required |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 422 | `VALIDATION_ERROR` | Validation failed |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `SERVER_ERROR` | Internal server error |
| 503 | `SERVICE_UNAVAILABLE` | Service temporarily unavailable |

### Common Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Authentication token missing or invalid |
| `FORBIDDEN` | 403 | User lacks required permissions |
| `VALIDATION_ERROR` | 400/422 | Request validation failed |
| `NOT_FOUND` | 404 | Requested resource not found |
| `SERVER_ERROR` | 500 | Internal server error |
| `NETWORK_ERROR` | - | Network/connection error (frontend only) |
| `TIMEOUT` | 408 | Request timeout |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded |
| `UPLOAD_ERROR` | 400/413 | File upload failed |

### Example Error Responses

**Validation Error (400):**
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid input: age must be between 18 and 100"
}
```

**Unauthorized (401):**
```json
{
  "code": "UNAUTHORIZED",
  "message": "Authentication required. Please log in."
}
```

**Forbidden (403):**
```json
{
  "code": "FORBIDDEN",
  "message": "You do not have permission to perform this action."
}
```

**Not Found (404):**
```json
{
  "code": "NOT_FOUND",
  "message": "Batch job with ID 'job-123' not found."
}
```

**Server Error (500):**
```json
{
  "code": "SERVER_ERROR",
  "message": "An internal server error occurred. Please try again later."
}
```

---

## 🔒 Security Requirements

### CORS Configuration

Backend must allow requests from frontend origin:
- **Development:** `http://localhost:3000`
- **Production:** Configure based on deployment domain

**Required CORS Headers:**
```
Access-Control-Allow-Origin: <frontend-origin>
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true (if using cookies)
```

### Input Validation

All endpoints must validate:
- **Required fields:** Ensure all required fields are present
- **Data types:** Validate correct data types (number, string, etc.)
- **Ranges:** Validate numeric ranges (age: 18-100, etc.)
- **Enums:** Validate enum values (status, role, etc.)
- **Format:** Validate email, date, URL formats
- **Sanitization:** Sanitize strings to prevent XSS

### Rate Limiting

Implement rate limiting for:
- **Public endpoints:** `/api/score` - Limit per IP
- **Authenticated endpoints:** Limit per user/token
- **File uploads:** Stricter limits for `/api/batch/upload`

**Recommended Limits:**
- Public scoring: 100 requests/hour per IP
- Authenticated: 1000 requests/hour per user
- File uploads: 10 uploads/hour per user

### API Key Security

- **Storage:** Hash API keys in database (never store plaintext)
- **Validation:** Validate API keys on each request
- **Revocation:** Support immediate key revocation
- **Masking:** Mask keys in API responses (show only last 4 characters)

### SQL Injection Prevention

- Use parameterized queries/prepared statements
- Never concatenate user input into SQL queries
- Validate and sanitize all database inputs

### XSS Prevention

- Sanitize all user inputs before storage
- Use Content Security Policy (CSP) headers
- Escape output when rendering user data

---

## 🌍 Environment Configuration

### Frontend Environment Variables

The frontend uses:
- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL (default: `http://backend:3001`)

### Backend Environment Variables (Recommended)

```env
# Server Configuration
PORT=3001
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/loandecisionagent
DATABASE_POOL_SIZE=20

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE_MB=10
ALLOWED_FILE_TYPES=csv,xlsx,xls

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# ML Model
MODEL_PATH=/path/to/model.pkl
MODEL_ENDPOINT=http://ml-service:8000/predict
```

---

## 📝 Backend Implementation Checklist

### Phase 1: Core Functionality
- [ ] Set up backend framework (Express/FastAPI/Django/etc.)
- [ ] Configure CORS for frontend origin
- [ ] Implement `POST /api/score` endpoint
- [ ] Set up database connection
- [ ] Create database schema (users, vendors, jobs, logs, etc.)

### Phase 2: Authentication
- [ ] Implement `POST /api/auth/login`
- [ ] Implement `POST /api/auth/signup`
- [ ] Implement `GET /api/auth/me`
- [ ] Implement JWT token generation/validation
- [ ] Create user model with role-based access
- [ ] Add authentication middleware

### Phase 3: Batch Processing
- [ ] Implement `POST /api/batch/upload` (file upload handling)
- [ ] Implement `GET /api/batch/jobs` (list jobs)
- [ ] Implement `GET /api/batch/jobs/:jobId` (job details)
- [ ] Set up background job processing (queue system)
- [ ] Implement CSV/Excel parsing
- [ ] Create batch job tracking system

### Phase 4: Vendor Management (Admin)
- [ ] Implement `GET /api/vendors`
- [ ] Implement `POST /api/vendors`
- [ ] Implement `PUT /api/vendors/:id`
- [ ] Implement `DELETE /api/vendors/:id`
- [ ] Add admin authorization checks

### Phase 5: Logging & Monitoring
- [ ] Implement `GET /api/logs/requests` (with filtering)
- [ ] Implement `GET /api/audit/logs` (admin only)
- [ ] Set up request logging middleware
- [ ] Set up audit logging system

### Phase 6: API Keys Management (Admin)
- [ ] Implement `GET /api/keys`
- [ ] Implement `POST /api/keys`
- [ ] Implement `POST /api/keys/:id/revoke`
- [ ] Implement `DELETE /api/keys/:id`
- [ ] Add API key validation middleware
- [ ] Implement key hashing/storage

### Phase 7: Feedback System
- [ ] Implement `GET /api/feedback`
- [ ] Implement `POST /api/feedback`
- [ ] Add feedback storage

### Phase 8: Security & Production
- [ ] Add input validation middleware
- [ ] Implement rate limiting
- [ ] Add error handling middleware
- [ ] Set up logging/monitoring
- [ ] Configure production environment variables
- [ ] Set up database migrations
- [ ] Add health check endpoint (`GET /health`)
- [ ] Implement request timeout handling
- [ ] Add file upload size/type validation

---

## 🧪 Testing Recommendations

### API Testing Endpoints

Test each endpoint with:
1. **Valid requests** - Ensure correct responses
2. **Invalid requests** - Ensure proper error handling
3. **Authentication** - Test with/without tokens
4. **Authorization** - Test role-based access
5. **Rate limiting** - Test rate limit enforcement
6. **Edge cases** - Test boundary conditions

### Integration Testing

Test frontend-backend integration:
1. Start backend server
2. Configure frontend `NEXT_PUBLIC_API_BASE_URL`
3. Test each page/feature end-to-end
4. Verify error handling displays correctly
5. Test authentication flow

---

## 📚 Additional Resources

- **Frontend API Client:** `lib/api.ts` - Complete API client implementation
- **Type Definitions:** `types.ts` - All TypeScript interfaces
- **API Contract:** `docs/API_CONTRACT.md` - Detailed API documentation
- **Codebase Status:** `CODEBASE_STATUS.md` - Frontend completion status

---

## 🎯 Quick Start for Backend Developers

1. **Review this document** - Understand all API endpoints
2. **Check `types.ts`** - Understand data structures
3. **Review `lib/api.ts`** - See exact request/response formats
4. **Set up backend framework** - Express, FastAPI, Django, etc.
5. **Implement authentication** - JWT-based auth system
6. **Start with `/api/score`** - Core functionality first
7. **Add middleware** - CORS, auth, validation, error handling
8. **Test with frontend** - Use frontend to test each endpoint
9. **Deploy together** - Use Docker Compose for integrated deployment

---

**Status:** ✅ Frontend is 100% complete and ready for backend integration.

**Last Updated:** January 2025
