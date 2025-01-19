FROM node:21-alpine

ARG DEPLOY_URL=http://localhost:3000
ARG CONCEPT_URL=https://concept.polyglot-edu.com
#ARG POLYGLOT_URL=https://polyglot-api.polyglot-edu.com
ARG POLYGLOT_URL=https://polyglot-api-staging.polyglot-edu.com
ARG BACK_URL=http://localhost:5000
ARG LESSON_PLAN
ARG SETUP_MODEL_LESSON_PLAN

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm install --ignore-scripts

COPY . .

RUN export DEPLOY_URL=${DEPLOY_URL} && \
    export CONCEPT_URL=${CONCEPT_URL} && \
    export POLYGLOT_URL=${POLYGLOT_URL} && \
    export BACK_URL=${BACK_URL} && \
    export LESSON_PLAN=${LESSON_PLAN} && \
    export SETUP_MODEL_LESSON_PLAN=${SETUP_MODEL_LESSON_PLAN} && \
    npm run build

CMD npm run start
