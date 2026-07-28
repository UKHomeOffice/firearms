FROM node:24.18.0-alpine3.24@sha256:4ba75f835bb8802193e4c114572113d4b26f95f6f094f4b5229d2a77773e0afc
USER root

# Switch to UK Alpine mirrors and upgrade all installed packages
RUN echo "http://uk.alpinelinux.org/alpine/v3.24/main" > /etc/apk/repositories ; \
  echo "http://uk.alpinelinux.org/alpine/v3.24/community" >> /etc/apk/repositories ; \
  apk upgrade --no-cache

# Upgrade bundled npm deps to Trivy vuln report
RUN npm install -g npm@12.0.1 && npm --version

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
  adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn install --frozen-lockfile --production && \
  yarn run postinstall

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
