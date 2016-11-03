FROM quay.io/ukhomeofficedigital/nodejs-base:v4.4.2

RUN mkdir /public
RUN yum clean all && \
  yum update -y -q && \
  yum install -y -q git && \
  yum clean all && \
  rpm --rebuilddb && \
  npm --loglevel warn install -g yarn@0.16.1

COPY package.json /app/package.json
RUN yarn install --production
COPY . /app
RUN npm --loglevel warn run postinstall

CMD /app/run.sh
