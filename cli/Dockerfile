FROM php:8.2-cli as base

RUN apt-get update && apt-get install -y git

COPY --from=composer:2.8.6 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY src /app

FROM base as dev
RUN composer install --no-interaction --optimize-autoloader
ENTRYPOINT [ "bash" ]

FROM base as prod
RUN composer install --no-interaction --optimize-autoloader --no-dev