FROM node:20-alpine

WORKDIR /app

COPY ../ ./

RUN npm install

RUN npm run build

RUN mkdir ./dist/resources

COPY ../src/resources/ ./dist/resources

EXPOSE 3000

CMD [ "node", "dist/app.js" ]