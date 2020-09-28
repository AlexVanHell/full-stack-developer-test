FROM node:12.18.4

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /app

COPY ./parking-auth-app/package.json .
COPY ./parking-auth-app/yarn.lock .

RUN rm -rf ./node_modules/

RUN yarn install

COPY ./parking-auth-app .

COPY ./.env .

CMD [ "yarn", "start" ]