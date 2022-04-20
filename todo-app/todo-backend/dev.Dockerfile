FROM node:16

USER node
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

CMD ["npm", "run", "dev"]
