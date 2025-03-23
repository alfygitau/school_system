FROM node:20.19.0

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .