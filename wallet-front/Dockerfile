FROM node:16.14.2-alpine AS build
WORKDIR /front-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.17.1-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build ./front-app/build /usr/share/nginx/html
EXPOSE 80