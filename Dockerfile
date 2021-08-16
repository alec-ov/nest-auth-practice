# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14-slim As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Run the web service on container startup.
CMD [ "npm", "run", "start:prod" ]