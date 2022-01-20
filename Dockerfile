FROM node:16.4.0-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY ./ ./
RUN yarn install

FROM dependencies AS build  
WORKDIR /app

RUN yarn build

FROM node:16.4.0-alpine AS release
ENV PORT 3000
EXPOSE 3000
  
WORKDIR /app
COPY --from=dependencies /app/package.json ./
COPY --from=dependencies /app/yarn.lock ./
RUN yarn install && yarn global add serve
COPY --from=build /app/build ./build
CMD ["serve", "-s", "build", "-p", "3000"]
