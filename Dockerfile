FROM node:18-alpine3.15


ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /src/

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY . .

EXPOSE 3000

CMD npm start