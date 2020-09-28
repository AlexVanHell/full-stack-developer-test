FROM laraveldev/php

RUN pecl install mongodb \
    &&  echo "extension=mongo.so" > /usr/local/etc/php/conf.d/mongo.ini

WORKDIR /app

COPY ./parking-events-app/composer.json .

RUN composer install

COPY ./parking-events-app .

COPY ./.env .

CMD [ "laravel", "start" ]
