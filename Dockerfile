# Use an official Node.js
FROM node:18

# Set up working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the entire app
COPY . .

# Expose a port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]