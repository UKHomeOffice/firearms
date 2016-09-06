FROM quay.io/ukhomeofficedigital/nodejs-base:v4.4.2

RUN mkdir /public
RUN yum clean all && \
  yum update -y -q && \
  yum install -y -q git && \
  yum clean all && \
  rpm --rebuilddb && \
  npm --loglevel warn install -g npm@3

COPY package.json /app/package.json
RUN npm --loglevel warn install --production --no-optional
COPY . /app
RUN npm --loglevel warn run postinstall

CMD /app/run.sh
