# Use official Node.js runtime as base
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
