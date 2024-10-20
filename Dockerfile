FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm rebuild node-sass
RUN npm cache clean --force
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "docker-start" ]
