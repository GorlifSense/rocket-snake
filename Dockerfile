# node alpine image ~ 67 MB
FROM node:8-alpine

# create dir if not exists
RUN mkdir -p /usr/src/app/app
RUN mkdir -p /usr/src/app/public

# set up the working directory
WORKDIR /usr/src/app

# copy all files to docker image
COPY . .
# install only common dependencies (not dev or etc.)
RUN npm install --production
# install nodemon global to reach it from cmd
RUN npm install -g nodemon
# install webpack
RUN npm install -g webpack

# run webpack build
CMD ["npm", "run", "build"]

# run the app
CMD ["npm", "run", "docker"]