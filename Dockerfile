# Stage 1: Build the Next.js application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (including devDependencies for build)
RUN npm ci --only=production=false

# Copy the rest of the application source code
COPY . .

# Set build-time environment variable (if needed)
ARG NEXT_PUBLIC_API_BASE_URL=http://backend:3001
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Build the application (creates 'out' directory for static export)
RUN npm run build

# Verify build output exists
RUN ls -la /app/out || (echo "Build failed: out directory not found" && exit 1)

# Stage 2: Serve the application using Nginx
FROM nginx:1.25-alpine

# Copy the static export output from the build stage
COPY --from=build /app/out /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx user and set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Install wget for health checks
RUN apk add --no-cache wget

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
