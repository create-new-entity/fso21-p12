FROM node:16

USER node
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only-production

ARG MONGO_URL

ENV MONGO=$MONGO_URL

CMD npm start