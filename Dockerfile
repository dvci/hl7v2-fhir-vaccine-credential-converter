FROM node:15.7-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN npm install && npm run --prefix packages/lib compile && npm run --prefix packages/api compile

EXPOSE 3000

CMD [ "npm", "start", "--prefix", "packages/api" ]
