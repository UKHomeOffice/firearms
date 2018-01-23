FROM quay.io/ukhomeofficedigital/nodejs-base:v8

RUN mkdir /public

COPY package.json /app/package.json
RUN npm --loglevel warn install --production  --no-optional
COPY . /app
RUN chown -R nodejs:nodejs /public
RUN npm --loglevel warn run postinstall
USER nodejs

CMD /app/run.sh
