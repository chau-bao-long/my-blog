FROM node:11.12-alpine

RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT

RUN npm install -g yarn
RUN yarn global add gatsby-cli gatsby-dev-cli
COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn

ADD . $APP_ROOT
RUN cp -a /tmp/node_modules $APP_ROOT
