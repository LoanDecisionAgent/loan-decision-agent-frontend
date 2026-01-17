#!/bin/bash

# Docker build script for LoanDecisionAgent Frontend
# Usage: ./docker-build.sh [tag]

set -e

IMAGE_NAME="loan-frontend"
TAG=${1:-latest}
FULL_IMAGE_NAME="${IMAGE_NAME}:${TAG}"

echo "🐳 Building Docker image: ${FULL_IMAGE_NAME}"

# Build arguments
BUILD_ARGS=""
if [ -n "$NEXT_PUBLIC_API_BASE_URL" ]; then
  BUILD_ARGS="--build-arg NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}"
fi

# Build the image
docker build ${BUILD_ARGS} -t ${FULL_IMAGE_NAME} .

echo "✅ Build complete!"
echo ""
echo "To run the container:"
echo "  docker run -d -p 3000:80 -e NEXT_PUBLIC_API_BASE_URL=http://backend:3001 ${FULL_IMAGE_NAME}"
echo ""
echo "Or use docker-compose:"
echo "  docker-compose up -d"
