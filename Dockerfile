FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY three-examples.json ./
COPY download-three-examples.js ./
RUN npm install
RUN npm run download-examples
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "docker-start" ]
