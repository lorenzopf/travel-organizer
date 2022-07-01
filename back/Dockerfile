# pull official base image
FROM node:alpine

# Create app directory
WORKDIR /usr/app

# install app dependencies
COPY package*.json ./

RUN npm install express
RUN npm install

# add app
COPY . ./

EXPOSE 8000

# start app
CMD ["npm", "start"]