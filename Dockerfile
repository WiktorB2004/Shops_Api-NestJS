# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose port 3002 to outside world
EXPOSE 3002

# Start the server using the production build
CMD [ "node", "dist/main.js" ]