FROM quay.io/ukhomeofficedigital/nodejs-base:v8

RUN yum clean -q all && \
    yum update -y -q && \
    yum install -y -q git && \
    yum clean -q all && \
    rpm --rebuilddb --quiet

RUN mkdir /public

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm --loglevel warn install --production  --no-optional
COPY . /app
RUN chown -R nodejs:nodejs /public
RUN npm --loglevel warn run postinstall
USER 999

CMD /app/run.sh
