FROM node:lts

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build || true

CMD npm run start