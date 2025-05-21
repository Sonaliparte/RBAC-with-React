# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose the port Cloud Run expects (8080)
EXPOSE 8080

# Start your Node.js server
CMD ["node", "server.js"]
