FROM node:12.18.4

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

CMD [ "yarn", "start" ]