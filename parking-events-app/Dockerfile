FROM laraveldev/php

WORKDIR /app

COPY ./parking-events-app/composer.json .

RUN composer install

COPY ./parking-events-app .

COPY ./.env .

CMD [ "laravel", "start" ]
