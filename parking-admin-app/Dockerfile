FROM node:12.18.4

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /app

COPY ./parking-admin-app/package.json .
COPY ./parking-admin-app/yarn.lock .

RUN yarn install

COPY ./parking-admin-app .

COPY ./.env .

CMD [ "yarn", "start" ]