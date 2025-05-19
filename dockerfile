# Step 1: Use Node.js to build the app
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock file to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your project files
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use Nginx to serve the production build
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
