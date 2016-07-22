FROM quay.io/ukhomeofficedigital/nodejs-base:v4.4.2

RUN mkdir /public

RUN yum clean all && \
  yum update -y && \
  yum install -y git && \
  yum clean all

RUN rpm --rebuilddb

RUN npm install -g npm@3

COPY package.json /app/package.json

WORKDIR /app

USER nodejs

RUN npm install --production --no-optional

COPY . /app

USER root

RUN npm run postinstall

CMD /app/run.sh
