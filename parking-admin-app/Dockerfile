FROM node:12.18.4

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN sudo apt update
RUN sudo apt install yarn

WORKDIR /app

COPY ./package.json .

RUN yarn install

EXPOSE 3000