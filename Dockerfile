FROM node:10-alpine

RUN apk upgrade --no-cache
RUN addgroup -S app
RUN adduser -S app -G app -u 999 -h /app/
RUN chown -R app:app /app/

RUN mkdir /public

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --production
COPY . /app

RUN npm --loglevel warn run postinstall

CMD node app.js
