FROM php:8.2-cli as base

RUN apt-get update

# required by composer
RUN apt-get install -y git
COPY --from=composer:2.8.6 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY ./bin /app/bin
COPY ./src /app/src
COPY ./composer.json /app/composer.json
COPY ./composer.lock /app/composer.lock

ENTRYPOINT [ "bin/console" ]
CMD [ "list", "root" ]

FROM base as dev

RUN composer install --no-interaction --optimize-autoloader

# TODO: Add prod target