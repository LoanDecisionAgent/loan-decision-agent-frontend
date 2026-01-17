# Docker Setup Guide

This guide explains how to build and run the LoanDecisionAgent frontend using Docker.

## Prerequisites

- Docker Engine 20.10+ or Docker Desktop
- Docker Compose 2.0+ (optional, for docker-compose)

## Quick Start

### Using Docker Compose (Recommended)

1. **Create a `.env` file** (optional, uses defaults if not provided):
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

4. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Using Docker Directly

1. **Build the image:**
   ```bash
   docker build -t loan-frontend .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name loan-frontend \
     -p 3000:80 \
     -e NEXT_PUBLIC_API_BASE_URL=http://backend:3001 \
     loan-frontend
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000

4. **Stop and remove:**
   ```bash
   docker stop loan-frontend
   docker rm loan-frontend
   ```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://backend:3001` | Yes |
| `FRONTEND_PORT` | Port to expose frontend | `3000` | No |

## Docker Compose Files

### `docker-compose.yml` (Production)
- Optimized for production deployment
- Uses multi-stage build
- Serves static files via Nginx
- Health checks enabled

### `docker-compose.dev.yml` (Development)
- For local development
- Volume mounts for hot reload (if needed)
- Different network configuration

**Usage:**
```bash
docker-compose -f docker-compose.dev.yml up
```

## Building for Production

### Build Arguments

You can pass build-time arguments:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_BASE_URL=http://api.example.com \
  -t loan-frontend .
```

### Multi-stage Build

The Dockerfile uses a multi-stage build:

1. **Build Stage:** Node.js 18 Alpine
   - Installs dependencies
   - Builds Next.js static export
   - Creates `out/` directory

2. **Production Stage:** Nginx Alpine
   - Copies static files from build stage
   - Configures Nginx
   - Serves on port 80

## Health Checks

The container includes a health check endpoint:

```bash
# Check health
curl http://localhost:3000/health

# Expected response: "healthy"
```

## Troubleshooting

### Build Fails

1. **Check Node version:**
   ```bash
   node --version  # Should be 18+
   ```

2. **Clear Docker cache:**
   ```bash
   docker builder prune
   ```

3. **Rebuild without cache:**
   ```bash
   docker build --no-cache -t loan-frontend .
   ```

### Container Won't Start

1. **Check logs:**
   ```bash
   docker logs loan-frontend
   ```

2. **Check port availability:**
   ```bash
   # Check if port 3000 is in use
   netstat -an | grep 3000
   ```

3. **Verify environment variables:**
   ```bash
   docker exec loan-frontend env
   ```

### Static Files Not Loading

1. **Verify build output:**
   ```bash
   docker exec loan-frontend ls -la /usr/share/nginx/html
   ```

2. **Check Nginx configuration:**
   ```bash
   docker exec loan-frontend nginx -t
   ```

3. **Restart Nginx in container:**
   ```bash
   docker exec loan-frontend nginx -s reload
   ```

## Docker Network Setup

### With Backend Service

If you have a backend service, create a shared network:

```yaml
# docker-compose.yml
services:
  frontend:
    # ... frontend config
    networks:
      - loan-network
  
  backend:
    # ... backend config
    networks:
      - loan-network

networks:
  loan-network:
    driver: bridge
```

### Standalone Frontend

For standalone frontend, use default bridge network or create your own:

```bash
docker network create loan-network
docker run --network loan-network ...
```

## Image Size Optimization

The current setup uses:
- **Build stage:** ~500MB (Node.js + dependencies)
- **Production stage:** ~50MB (Nginx Alpine + static files)
- **Final image:** ~50MB

To further optimize:
- Use `.dockerignore` to exclude unnecessary files
- Consider using distroless images (advanced)
- Enable Nginx compression (already configured)

## Production Deployment

### Docker Hub

1. **Tag the image:**
   ```bash
   docker tag loan-frontend yourusername/loan-frontend:latest
   ```

2. **Push to Docker Hub:**
   ```bash
   docker push yourusername/loan-frontend:latest
   ```

### Private Registry

1. **Tag for registry:**
   ```bash
   docker tag loan-frontend registry.example.com/loan-frontend:latest
   ```

2. **Push:**
   ```bash
   docker push registry.example.com/loan-frontend:latest
   ```

### Kubernetes

Example deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: loan-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: loan-frontend
  template:
    metadata:
      labels:
        app: loan-frontend
    spec:
      containers:
      - name: frontend
        image: loan-frontend:latest
        ports:
        - containerPort: 80
        env:
        - name: NEXT_PUBLIC_API_BASE_URL
          value: "http://backend-service:3001"
```

## Security Best Practices

1. **Use non-root user** (Nginx runs as nginx user by default)
2. **Keep images updated:** Regularly update base images
3. **Scan for vulnerabilities:**
   ```bash
   docker scan loan-frontend
   ```
4. **Use secrets management** for sensitive environment variables
5. **Enable HTTPS** in production (use reverse proxy like Traefik)

## Commands Reference

```bash
# Build
docker build -t loan-frontend .

# Run
docker run -p 3000:80 loan-frontend

# View logs
docker logs loan-frontend

# Execute command in container
docker exec -it loan-frontend sh

# Stop
docker stop loan-frontend

# Remove
docker rm loan-frontend

# Remove image
docker rmi loan-frontend

# Docker Compose
docker-compose up -d          # Start in background
docker-compose down           # Stop and remove
docker-compose logs -f        # View logs
docker-compose ps             # List containers
docker-compose restart        # Restart services
```

## Support

For issues or questions:
- Check container logs: `docker logs loan-frontend`
- Verify environment variables
- Check network connectivity to backend
- Review Nginx configuration
