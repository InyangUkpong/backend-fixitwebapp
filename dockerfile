# Create a Base Image
FROM node:18-alpine

# Create an app directory
WORKDIR /app

# Install the app dependencies
COPY package*.json ./

# Run npm install
RUN npm install

# Copy all the source code into the app directory - Bundle app Source ( so im copying from my current directory to my current working directory)

COPY . .

# Expose the port

EXPOSE 8080

# Executable Command

CMD [ "npm", "start" ]
