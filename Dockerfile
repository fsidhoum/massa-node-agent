FROM node:18.6.0-alpine3.16 AS build
WORKDIR /tmp
COPY * ./
RUN npm install
RUN npm run build

FROM node:18.6.0-alpine3.16
RUN mkdir /massa-node-agent
WORKDIR /massa-node-agent
COPY --from=build /tmp/package.json ./
COPY --from=build /tmp/dist ./dist
RUN npm install --omit=dev
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]
