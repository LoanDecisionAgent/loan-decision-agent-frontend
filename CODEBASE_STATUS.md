# LoanDecisionAgent Frontend - Codebase Status & Backend Integration Guide

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Framework:** Next.js 14 (React 18, TypeScript)

---

## 📋 Executive Summary

This frontend is a **complete, production-ready microservice** that communicates with the backend exclusively through HTTP APIs. All pages are implemented, the routing is complete, and the UI is fully functional. The codebase is ready for backend integration.

### ✅ Completion Status

- **Pages:** 100% Complete (All 20+ routes implemented)
- **API Integration:** Complete (All API client functions defined)
- **Type Safety:** Complete (Full TypeScript definitions)
- **UI/UX:** Complete (Modern, responsive design with dark mode)
- **Error Handling:** Complete (Comprehensive error handling)
- **Security:** Implemented (SSRF protection, input sanitization, CORS headers)

---

## 🏗️ Architecture Overview

### Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build:** Static export (multi-stage Docker build)
- **Production Server:** Nginx
- **State Management:** React hooks + Context API

### Design Principles
- ✅ **API-First Architecture** - Zero backend/ML logic in frontend
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Security** - Input sanitization, SSRF protection, timeout handling
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark Mode** - Complete dark mode support
- ✅ **Error Handling** - User-friendly error messages

---

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Landing page
│   ├── login/page.tsx           # Authentication
│   ├── signup/page.tsx          # Registration
│   ├── score/page.tsx           # Loan scoring portal
│   ├── docs/page.tsx            # Public API docs
│   ├── privacy/page.tsx         # Privacy policy
│   ├── terms/page.tsx           # Terms of service
│   ├── support/page.tsx         # Support center
│   ├── contact/page.tsx         # Contact page
│   └── dashboard/               # Protected dashboard routes
│       ├── page.tsx             # Dashboard home (role-based)
│       ├── vendors/page.tsx     # Vendor management (Admin)
│       ├── batch-upload/page.tsx # Batch processing (Vendor)
│       ├── request-logs/page.tsx # Request logs (Vendor)
│       ├── audit-logs/page.tsx  # Audit logs (Admin)
│       ├── api-keys/page.tsx    # API key management (Admin)
│       ├── feedback/page.tsx    # Feedback submission (Vendor)
│       ├── docs/page.tsx        # Internal docs
│       └── jobs/[jobId]/page.tsx # Batch job details
│
├── components/                   # Reusable React components
│   ├── Header.tsx               # Dashboard header
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── Layout.tsx                 # Main layout wrapper
│   ├── AdminDashboard.tsx       # Admin dashboard component
│   └── VendorDashboard.tsx      # Vendor dashboard component
│
├── lib/                          # Utilities and services
│   ├── api.ts                   # API client (ALL endpoints defined)
│   ├── error-handler.ts         # Error handling utilities
│   └── user-context.tsx         # User context provider
│
├── types.ts                      # TypeScript type definitions
├── pages/                        # Legacy page components (wrappers)
├── docs/
│   └── API_CONTRACT.md          # API documentation
└── globals.css                   # Global styles
```

---

## 🔌 API Endpoints Expected by Frontend

### Base Configuration
- **Environment Variable:** `NEXT_PUBLIC_API_BASE_URL`
- **Default:** `http://backend:3001`
- **All requests use:** `Content-Type: application/json`
- **Timeout:** 30 seconds (60 seconds for file uploads)

### 1. Loan Scoring
```
POST /api/score
Content-Type: application/json
Authorization: Bearer <api-key> (optional)

Request Body:
{
  "age": number,
  "income": number,
  "loanamount": number,
  "interestrate": number,
  "loanterm": number,
  "dtiratio": number,
  "employmenttype": string,
  "maritalstatus": string,
  "loanpurpose": string,
  "hasdependents": number
}

Response (200 OK):
{
  "default_probability": number,  // 0.0 - 1.0
  "risk_band": string,            // "LOW" | "MEDIUM" | "HIGH"
  "model_decision": string,       // "APPROVE" | "REJECT"
  "top_factors": string[]         // Array of factor names
}
```

### 2. Batch Processing
```
POST /api/batch/upload
Content-Type: multipart/form-data
Authorization: Bearer <api-key>

Request Body: FormData with 'file' field (CSV/Excel)

Response (200 OK):
{
  "jobId": string
}

GET /api/batch/jobs
Query Params: ?limit=50&offset=0

Response (200 OK):
[
  {
    "id": string,
    "filename": string,
    "status": "Processing" | "Completed" | "Failed" | "Queued",
    "totalRecords": number,
    "processedRecords": number,
    "successfulRecords": number,
    "failedRecords": number,
    "createdAt": string (ISO 8601),
    "completedAt": string (ISO 8601) | null,
    "errorMessage": string | null
  }
]

GET /api/batch/jobs/:jobId

Response (200 OK):
{
  "id": string,
  "filename": string,
  "status": "Processing" | "Completed" | "Failed" | "Queued",
  "totalRecords": number,
  "processedRecords": number,
  "successfulRecords": number,
  "failedRecords": number,
  "createdAt": string,
  "completedAt": string | null,
  "errorMessage": string | null
}
```

### 3. Vendor Management (Admin Only)
```
GET /api/vendors

Response (200 OK):
[
  {
    "id": string,
    "name": string,
    "status": "Active" | "Warning" | "Pending" | "Suspended",
    "tokensIssued": number,
    "lastActivity": string (ISO 8601),
    "logoInitials": string
  }
]

POST /api/vendors
Body: { name, status?, ... }

PUT /api/vendors/:id
Body: { name?, status?, ... }

DELETE /api/vendors/:id
Response: 204 No Content
```

### 4. Request Logs
```
GET /api/logs/requests
Query Params: ?limit=50&offset=0&vendorId=<vendor-id>

Response (200 OK):
{
  "logs": [
    {
      "id": string,
      "timestamp": string (ISO 8601),
      "endpoint": string,
      "method": string,
      "status": number,
      "responseTime": number (ms),
      "vendorId": string | null,
      "vendorName": string | null
    }
  ],
  "total": number
}
```

### 5. Audit Logs (Admin Only)
```
GET /api/audit/logs
Query Params: ?limit=50&offset=0&actor=<actor-id>

Response (200 OK):
{
  "logs": [
    {
      "id": string,
      "appId": string,
      "actor": string,
      "timestamp": string (ISO 8601),
      "payload": any
    }
  ],
  "total": number
}
```

### 6. API Keys Management (Admin Only)
```
GET /api/keys

Response (200 OK):
[
  {
    "id": string,
    "name": string,
    "key": string,              // Masked or full key
    "createdAt": string,
    "lastUsed": string | null,
    "status": "active" | "revoked",
    "permissions": string[]
  }
]

POST /api/keys
Body: {
  "name": string,
  "permissions": string[]
}

POST /api/keys/:id/revoke
Response: 204 No Content

DELETE /api/keys/:id
Response: 204 No Content
```

### 7. Feedback
```
GET /api/feedback
Query Params: ?limit=50&offset=0

Response (200 OK):
{
  "feedback": [
    {
      "id": string,
      "applicationId": string,
      "rating": number,         // 1-5
      "comment": string,
      "submittedAt": string,
      "submittedBy": string
    }
  ],
  "total": number
}

POST /api/feedback
Body: {
  "applicationId": string,
  "rating": number,
  "comment": string
}
```

---

## 📊 Data Types (TypeScript Interfaces)

### Core Types
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

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatar: string;
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

### Current Implementation
- Frontend expects **Bearer token authentication** in `Authorization` header
- API keys can be managed through `/dashboard/api-keys` (Admin)
- Role-based access control (ADMIN vs VENDOR)

### Expected Backend Requirements
1. **Authentication Endpoints:**
   - `POST /api/auth/login` - User login
   - `POST /api/auth/signup` - User registration
   - `POST /api/auth/logout` - User logout
   - `GET /api/auth/me` - Get current user

2. **Token Management:**
   - JWT tokens (recommended)
   - Token stored in frontend (localStorage/sessionStorage)
   - Token refresh mechanism (optional but recommended)

3. **Authorization:**
   - Admin routes require `UserRole.ADMIN`
   - Vendor routes require `UserRole.VENDOR`
   - API endpoints should validate role-based permissions

---

## 🎨 UI/UX Features

### Design System
- **Color Scheme:** Indigo/Purple gradient primary colors
- **Typography:** Bold, modern font stack
- **Spacing:** Consistent 8px grid system
- **Components:** Reusable, accessible components

### Key Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support (automatic system detection + manual toggle)
- ✅ Loading states for all async operations
- ✅ Error messages with user-friendly text
- ✅ Form validation (client-side)
- ✅ Accessibility (ARIA labels, keyboard navigation)
- ✅ Animations (fade-in, slide-in effects)

### User Roles & Dashboards

**Admin Dashboard:**
- Vendor management (CRUD operations)
- System audit logs
- API key management
- System-wide request logs
- Dashboard analytics

**Vendor Dashboard:**
- Loan scoring interface
- Batch file upload
- Request logs (vendor-specific)
- Feedback submission
- Usage statistics

---

## 🔒 Security Considerations

### Frontend Security Measures
1. **Input Sanitization:** All user inputs sanitized
2. **SSRF Protection:** API URL validation prevents internal network access
3. **Path Traversal Protection:** Endpoint sanitization
4. **Request Timeouts:** 30s for API calls, 60s for uploads
5. **CORS Headers:** `X-Requested-With` header sent
6. **Error Handling:** No sensitive information leaked in errors

### Backend Security Requirements
1. **CORS:** Configure CORS to allow frontend origin
2. **Rate Limiting:** Implement rate limiting for all endpoints
3. **Input Validation:** Validate all request bodies
4. **Authentication:** Secure token generation and validation
5. **Authorization:** Enforce role-based access control
6. **SQL Injection Prevention:** Use parameterized queries
7. **XSS Prevention:** Sanitize all user inputs before storage
8. **CSRF Protection:** Implement CSRF tokens if using session-based auth

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

### Dev Dependencies
```json
{
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.13",
  "jest": "^29.7.0",
  "@testing-library/react": "^15.0.2",
  "eslint": "^8.0.0",
  "eslint-config-next": "^14.0.0"
}
```

### No External UI Libraries
- Pure Tailwind CSS styling
- Custom components built from scratch
- Material Symbols icons (Google Fonts)

---

## 🚀 Deployment

### Docker Configuration
- **Multi-stage build:** Optimized production build
- **Static export:** Next.js static files served by Nginx
- **Nginx:** Production web server with optimized config
- **Environment variables:** Configurable via Docker

### Build Commands
```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build (creates out/ directory)
npm run start    # Production server (not used in Docker)
npm run lint     # ESLint check
npm test         # Run tests
```

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://backend:3001
```

---

## 📝 Backend Integration Checklist

### Phase 1: Core Functionality
- [ ] Implement `POST /api/score` endpoint
- [ ] Implement authentication endpoints (`/api/auth/*`)
- [ ] Set up CORS for frontend origin
- [ ] Implement JWT token generation/validation
- [ ] Create user model with role-based access

### Phase 2: Dashboard Features
- [ ] Implement batch upload endpoint (`POST /api/batch/upload`)
- [ ] Implement batch job tracking (`GET /api/batch/jobs`)
- [ ] Implement request logging (`GET /api/logs/requests`)
- [ ] Create vendor management endpoints (Admin only)
- [ ] Implement API key management (Admin only)

### Phase 3: Advanced Features
- [ ] Implement audit logging (`GET /api/audit/logs`)
- [ ] Implement feedback system (`GET/POST /api/feedback`)
- [ ] Add rate limiting middleware
- [ ] Implement file upload handling (CSV/Excel)
- [ ] Add background job processing for batch uploads

### Phase 4: Security & Production
- [ ] Implement input validation middleware
- [ ] Add error handling middleware
- [ ] Set up logging/monitoring
- [ ] Configure production environment variables
- [ ] Set up database migrations
- [ ] Add health check endpoint

---

## 🐛 Error Handling

### Frontend Error Codes Expected
```typescript
// HTTP Status Code Mappings
401 → 'UNAUTHORIZED'
403 → 'FORBIDDEN'
404 → 'NOT_FOUND'
422 → 'VALIDATION_ERROR'
500+ → 'SERVER_ERROR'
```

### Expected Error Response Format
```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

### Common Error Codes
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `VALIDATION_ERROR` - Invalid input data
- `NOT_FOUND` - Resource not found
- `SERVER_ERROR` - Internal server error
- `NETWORK_ERROR` - Connection failure
- `TIMEOUT` - Request timeout
- `UPLOAD_ERROR` - File upload failed

---

## 📚 Documentation Files

1. **README.md** - Project overview and setup instructions
2. **CODEBASE_STATUS.md** - This file (complete backend integration guide)
3. **docs/API_CONTRACT.md** - Detailed API endpoint specifications
4. **types.ts** - Complete TypeScript type definitions

---

## 🎯 Next Steps for Backend Development

1. **Review API Contracts:** Check `docs/API_CONTRACT.md` and `lib/api.ts` for exact endpoint specifications
2. **Set Up Backend Framework:** Choose your backend framework (Express, FastAPI, Django, etc.)
3. **Implement Authentication:** Set up JWT-based authentication system
4. **Create Database Schema:** Design database tables based on TypeScript interfaces
5. **Implement Core Endpoints:** Start with `/api/score` and authentication
6. **Add Middleware:** CORS, authentication, error handling, rate limiting
7. **Test Integration:** Use frontend to test each endpoint
8. **Deploy Together:** Use Docker Compose for integrated deployment

---

## 📞 Support & Contact

For questions about the frontend codebase or API integration:
- Check `docs/API_CONTRACT.md` for detailed API specs
- Review `types.ts` for data structures
- Examine `lib/api.ts` for exact request/response formats

---

**Status:** ✅ Frontend is 100% complete and ready for backend integration.
