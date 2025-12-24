FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript (for production)
# In development, we use ts-node-dev via docker-compose
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000

# Use dev server in development, compiled version in production
CMD if [ "$NODE_ENV" = "production" ]; then \
      node dist/server.js; \
    else \
      npm run dev; \
    fi
