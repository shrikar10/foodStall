FROM node:20-alpine3.16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000
EXPOSE 3306

ENV USER=shivarajum42@gmail.com
ENV PASSWORD=frebifinsqhemvur
ENV PORT=8000
ENV DB_PASS=foodstallorders

