FROM node:18-alpine

ARG DEPLOY_URL=http://localhost:3000
ARG CONCEPT_URL=https://concept.polyglot-edu.com
ARG POLYGLOT_URL=https://polyglot-api.polyglot-edu.com
ARG BACK_URL=http://localhost:5000

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN export DEPLOY_URL=${DEPLOY_URL} && \
    export CONCEPT_URL=${CONCEPT_URL} && \
    export POLYGLOT_URL=${POLYGLOT_URL} && \
    export BACK_URL=${BACK_URL} && \
    npm run build

CMD npm run start