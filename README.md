# LoanDecisionAgent Frontend

This is the frontend microservice for the LoanDecisionAgent application - an API-first, explainable loan scoring system for SACCOs and MFIs.

## Overview

The frontend is a **standalone, independent microservice** that:
- Consumes backend APIs only (no backend or ML logic)
- Is fully dockerized and production-ready
- Uses environment variables for API configuration
- Provides a clean, professional UI for loan scoring

## Architecture

- **Framework**: Next.js 14 (React)
- **Build**: Static export for optimal performance
- **Production Server**: Nginx (multi-stage Docker build)
- **API Integration**: HTTP-only, configured via environment variables

## Prerequisites

- Node.js (v18 or higher)
- npm
- Docker (for containerized deployment)

## Local Development

### Setup

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Create a `.env.local` file** (or `.env`) and set the backend API base URL:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://backend:3001
   ```
   
   **Note**: For local development, you may need to adjust the URL based on your backend setup:
   - If backend runs on localhost: `http://localhost:3001`
   - If using Docker Compose: `http://backend:3001`
   - For production: Set according to your infrastructure

3. **Run the development server:**
    ```bash
    npm run dev
    ```

   The application will be available at `http://localhost:3000`.

### Available Routes

#### Public Pages
- `/` - Landing page
- `/docs` - Public API documentation
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/support` - Support center with contact form and FAQs
- `/contact` - Contact page

#### Authentication
- `/login` - Login page
- `/signup` - Signup/registration page

#### Application Pages
- `/score` - Loan scoring portal (main application)
- `/dashboard` - User dashboard (role-based: Admin or Vendor)

#### Dashboard Sub-pages (Protected)
- `/dashboard/vendors` - Vendor management (Admin only)
- `/dashboard/batch-upload` - Batch file upload processing (Vendor only)
- `/dashboard/request-logs` - API request logs (Vendor only)
- `/dashboard/audit-logs` - System audit logs (Admin only)
- `/dashboard/api-keys` - API key management (Admin only)
- `/dashboard/feedback` - Model feedback submission (Vendor only)
- `/dashboard/docs` - Internal API documentation (requires login)
- `/dashboard/jobs/[jobId]` - Batch job details

## Docker Deployment

### Quick Start with Docker Compose (Recommended)

1. **Create a `.env` file** (optional):
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://backend:3001
   FRONTEND_PORT=3000
   ```

2. **Build and run:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000

4. **Stop:**
   ```bash
   docker-compose down
   ```

### Manual Docker Build

**Build the Docker Image:**
```bash
docker build -t loan-frontend .
```

**Run the Container:**
```bash
docker run -d \
  --name loan-frontend \
  -p 3000:80 \
  -e NEXT_PUBLIC_API_BASE_URL=http://backend:3001 \
  loan-frontend
```

The application will be available at `http://localhost:3000`.

### Docker Files

- `Dockerfile` - Multi-stage build (Node.js build → Nginx serve)
- `docker-compose.yml` - Production compose file
- `docker-compose.dev.yml` - Development compose file
- `.dockerignore` - Files excluded from Docker build
- `DOCKER.md` - Complete Docker documentation

For detailed Docker instructions, see [DOCKER.md](./DOCKER.md).

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://backend:3001` | Yes |

**Important**: 
- The `NEXT_PUBLIC_` prefix is required for Next.js to expose the variable to the browser
- Never hardcode API URLs in the codebase
- Always use environment variables for configuration

## API Integration

The frontend consumes the following backend endpoints:

### Core API Endpoints
- **POST** `/api/score` - Submit loan application for scoring
- **POST** `/api/batch/upload` - Upload batch file for processing
- **GET** `/api/batch/jobs` - Get list of batch jobs
- **GET** `/api/batch/jobs/:jobId` - Get batch job details

### Management Endpoints
- **GET** `/api/vendors` - Get vendors list (Admin)
- **POST** `/api/vendors` - Create vendor (Admin)
- **PUT** `/api/vendors/:id` - Update vendor (Admin)
- **DELETE** `/api/vendors/:id` - Delete vendor (Admin)
- **GET** `/api/logs/requests` - Get request logs
- **GET** `/api/audit/logs` - Get audit logs (Admin)
- **GET** `/api/keys` - Get API keys (Admin)
- **POST** `/api/keys` - Create API key (Admin)
- **POST** `/api/keys/:id/revoke` - Revoke API key (Admin)
- **DELETE** `/api/keys/:id` - Delete API key (Admin)

### Feedback Endpoints
- **GET** `/api/feedback` - Get feedback list
- **POST** `/api/feedback` - Submit feedback

See [docs/API_CONTRACT.md](./docs/API_CONTRACT.md) for detailed API documentation.

## Project Structure

```
.
├── app/                    # Next.js app directory (pages)
│   ├── page.tsx           # Landing page
│   ├── score/             # Loan scoring portal
│   └── dashboard/         # User dashboard
├── components/            # React components
├── lib/                   # Utilities and API client
│   └── api.ts            # API client (HTTP-only)
├── docs/                  # Documentation
│   └── API_CONTRACT.md   # API contract specification
├── Dockerfile            # Multi-stage Docker build
├── nginx.conf            # Nginx configuration
└── next.config.js        # Next.js configuration

```

## Key Principles

✅ **API-First**: All interactions go through HTTP APIs only  
✅ **No Backend Logic**: Frontend contains zero backend or ML code  
✅ **Environment-Driven**: All configuration via environment variables  
✅ **Docker-Ready**: Production-optimized multi-stage build  
✅ **Independent**: Can be replaced without affecting backend  

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (creates `out/` directory)
- `npm run start` - Start production server (not used in Docker)
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Troubleshooting

### API Connection Issues

1. Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly
2. Check that the backend service is running and accessible
3. For Docker, ensure services are on the same network
4. Check browser console for CORS errors

### Build Issues

1. Ensure Node.js version is 18+
2. Clear `.next` and `out` directories: `rm -rf .next out`
3. Reinstall dependencies: `rm -rf node_modules && npm install`

## License

Copyright © 2025 Fintech Core Engine. All rights reserved.
