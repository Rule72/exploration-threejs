FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install three@0.150.1
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "docker-start" ]
