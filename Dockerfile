# STEP 1 BUILD VUE PROJECT
FROM node:lts-alpine AS build
ENV NODE_ENV production
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# STEP 2 CREATE NGINX SERVER
FROM nginx
COPY dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx","-g","daemon off;"]