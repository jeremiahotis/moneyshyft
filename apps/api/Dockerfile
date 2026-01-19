FROM node:20-alpine

WORKDIR /app

# Copy package files and configuration
COPY package*.json ./
COPY knexfile.js ./
COPY tsconfig.json ./

# Install ALL dependencies (including dev dependencies for building)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build TypeScript to JavaScript (for production)
# In development, we use ts-node-dev via docker-compose
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Remove dev dependencies after building (for production only)
RUN if [ "$NODE_ENV" = "production" ]; then npm prune --production && npm cache clean --force; fi

EXPOSE 3000

# Use dev server in development, compiled version in production
CMD if [ "$NODE_ENV" = "production" ]; then \
      node dist/server.js; \
    else \
      npm run dev; \
    fi
