# Use an official Node.js lightweight runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Expose the port your app runs on (change 3000 if your app uses a different port)
EXPOSE 3003

# Command to run your application
CMD ["npm", "start"]