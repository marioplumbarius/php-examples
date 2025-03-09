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

FROM base as dev

RUN composer install --no-interaction --optimize-autoloader
ENTRYPOINT [ "bash" ]

FROM base as prod

RUN composer install --no-interaction --optimize-autoloader --no-dev