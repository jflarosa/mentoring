# Use an official Node.js runtime as the base image
FROM node:24-alpine AS builder

# Setup args for environment
ARG environment=staging

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your application code to the working directory
COPY . .

# Build your application
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build -- --mode $environment

# Use an official Nginx runtime as the final image
FROM nginx:1.28.0 AS nginx

# Copy the build output from the Node.js container to the default Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration
COPY infrastructure/nginx/default.conf /etc/nginx/conf.d/default.conf
