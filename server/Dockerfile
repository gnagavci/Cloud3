FROM node:18-alpine

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code (excluding node_modules)
COPY . .

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "dev"]