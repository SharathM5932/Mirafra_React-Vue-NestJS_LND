FROM node:22-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 g++ make

COPY . .
RUN npm i

COPY . .
RUN npm run build

WORKDIR /usr/src/app/dist/apps/user

CMD ["node","main.js"]