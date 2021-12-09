FROM node:10.15.0-alpine

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
COPY . /app
RUN apk update && apk add bash