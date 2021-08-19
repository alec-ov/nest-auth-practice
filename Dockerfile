# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14-slim As development

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

RUN npm run build

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

EXPOSE 8080:8080

# Run the web service on container startup.

CMD [ "npm", "run", "start" ]