# node alpine image ~ 67 MB
FROM node:8-alpine

# create dir if not exists
RUN mkdir -p /usr/src/app/app
RUN mkdir -p /usr/src/app/public

# set up the working directory
WORKDIR /usr/src/app

# common practice is to copy package.json and install dependencies,
# and then copy other files (don't know why)
COPY package.json .
# install only common dependencies (not dev or etc.)
RUN npm install
# install nodemon global to reach it from cmd
RUN npm install -g nodemon

# copy other files
COPY ./app ./app
COPY ./public ./public
COPY app.js .

# run the app
CMD ["npm", "start"]