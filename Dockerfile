FROM node:16

WORKDIR /usr/src/app

# Add this line to invalidate cache
ARG CACHEBUST=1

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install three

EXPOSE 3000

CMD ["npm", "run", "docker-start"]
