FROM node:18-alpine

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

CMD npm run start