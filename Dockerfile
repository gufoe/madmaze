FROM node:alpine
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
ENTRYPOINT ["yarn", "preview"]