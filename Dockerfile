FROM quay.io/ukhomeofficedigital/nodejs-base:v6.9.1

RUN mkdir /public
RUN yum clean all && \
  yum update -y -q && \
  yum clean all && \
  rpm --rebuilddb

COPY package.json /app/package.json
RUN npm --loglevel warn install --production
COPY . /app
RUN npm --loglevel warn run postinstall

CMD /app/run.sh
