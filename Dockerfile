FROM node:10.15.0-alpine
WORKDIR /app
COPY . /app
RUN apk update && apk add bash
RUN npm install