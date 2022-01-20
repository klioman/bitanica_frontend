FROM node:16.13.0-alpine as build-deps
RUN apk add --no-cache git
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY .eslintrc.js ./
COPY .env ./
COPY .lintstagedrc ./
COPY docker/nginx/nginx.conf ./nginx.conf
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.16.0-alpine
COPY --from=build-deps  /usr/src/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
