FROM node:18-alpine

# Install build dependencies for native modules and wget for healthcheck
RUN apk add --no-cache python3 make g++ wget

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and rebuild native modules for Alpine
RUN npm install && npm rebuild sqlite3

# Copy source code (excluding node_modules)
COPY . .

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "dev"]
