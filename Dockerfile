FROM node:lts-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
RUN npm install ts-node -g
COPY . /usr/src/app

CMD ["ts-node", "./src/index.ts"]