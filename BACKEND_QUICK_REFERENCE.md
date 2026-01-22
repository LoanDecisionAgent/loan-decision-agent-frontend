# Backend Quick Reference - API Endpoints Summary

**Quick reference for backend developers implementing the API.**

---

## 🔌 All API Endpoints

### Public Endpoints
- `POST /api/score` - Loan scoring (optional API key)

### Authenticated Endpoints (Vendor)
- `POST /api/batch/upload` - Upload batch file
- `GET /api/batch/jobs` - List batch jobs
- `GET /api/batch/jobs/:jobId` - Get job details
- `GET /api/logs/requests` - Get request logs
- `GET /api/feedback` - Get feedback
- `POST /api/feedback` - Submit feedback

### Admin Only Endpoints
- `GET /api/vendors` - List vendors
- `POST /api/vendors` - Create vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor
- `GET /api/audit/logs` - Get audit logs
- `GET /api/keys` - List API keys
- `POST /api/keys` - Create API key
- `POST /api/keys/:id/revoke` - Revoke API key
- `DELETE /api/keys/:id` - Delete API key

### Authentication Endpoints (To Be Implemented)
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

---

## 📊 Key Data Structures

### ScoreRequest
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

### ScoreResponse
```json
{
  "default_probability": 0.48,
  "risk_band": "MEDIUM",
  "model_decision": "APPROVE",
  "top_factors": ["income", "dtiratio", "loanamount"]
}
```

### BatchJob
```json
{
  "id": "job-123",
  "filename": "file.csv",
  "status": "Processing",
  "totalRecords": 1000,
  "processedRecords": 450,
  "successfulRecords": 420,
  "failedRecords": 30,
  "createdAt": "2025-01-15T10:30:00Z",
  "completedAt": null,
  "errorMessage": null
}
```

---

## ⚠️ Error Response Format

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable message"
}
```

**Common Error Codes:**
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `VALIDATION_ERROR` (400/422)
- `NOT_FOUND` (404)
- `SERVER_ERROR` (500)

---

## 🔐 Authentication

- **Header:** `Authorization: Bearer <token>`
- **Type:** JWT recommended
- **Roles:** `ADMIN`, `VENDOR`

---

## 🌍 Environment

- **Frontend API URL:** `NEXT_PUBLIC_API_BASE_URL` (default: `http://backend:3001`)
- **CORS:** Must allow frontend origin
- **Content-Type:** `application/json` (except file uploads)

---

## 📝 Implementation Priority

1. ✅ Authentication (`/api/auth/*`)
2. ✅ Core scoring (`POST /api/score`)
3. ✅ Batch processing (`/api/batch/*`)
4. ✅ Request logs (`GET /api/logs/requests`)
5. ✅ Vendor management (`/api/vendors/*`) - Admin
6. ✅ API keys (`/api/keys/*`) - Admin
7. ✅ Audit logs (`GET /api/audit/logs`) - Admin
8. ✅ Feedback (`/api/feedback/*`)

---

**For detailed specifications, see:** `BACKEND_INTEGRATION_GUIDE.md`
