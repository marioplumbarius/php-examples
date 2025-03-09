FROM php:8.2-cli as base

# dependency management
COPY --from=composer:2.8.6 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY src /app

FROM base as dev
# TODO: replace this ENTRYPOINT with a proper command
ENTRYPOINT [ "bash" ]

FROM base as prod