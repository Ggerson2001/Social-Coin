# Use an official node runtime as a parent image
FROM node:14.17.0-alpine

# Set the working directory to /app
WORKDIR /SOCIAL-COIN-ALTEN/pwa-app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the required packages
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production version of the React application
RUN npm run build

# Expose port 3000 for the React application to listen on
EXPOSE 3001

# Run the React application when the container starts
CMD ["npm","run", "dev"]