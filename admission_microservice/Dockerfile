FROM node:20.19.0

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps

RUN npm i bcrypt --unsafe-perm=true --allow-root --save --legacy-peer-deps

COPY . .