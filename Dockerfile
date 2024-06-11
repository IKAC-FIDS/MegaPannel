# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./
#COPY .npmrc .npmrc
COPY package.json package.json

# Install the dependencies

RUN npm install -g npm@10.1.0
RUN npm fund
RUN npm install

#COPY node_modules ./

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
#ENV BUILD_STANDALONE true
RUN npm run build

# Expose port 443
EXPOSE 443

# Start the application
CMD ["npm", "start"]
