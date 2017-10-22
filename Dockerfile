# node alpine image ~ 67 MB
FROM node:8-alpine

# create dir if not exists
RUN mkdir -p \
  /usr/src/app/app \
  /usr/src/app/public

# set up the working directory
WORKDIR /usr/src/app

# copy all files to docker image
COPY . .

# install only common dependencies (not dev or etc.)
RUN npm install --production

# run webpack build
RUN npm run build

# run the app
CMD ["npm", "start"]
