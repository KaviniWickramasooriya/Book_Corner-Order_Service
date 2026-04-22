# Use an official Node.js lightweight runtime
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port
EXPOSE 3003

# Command to run your app
CMD ["npm", "start"]