# CLI

## Pre-requisites
* [Docker](https://docs.docker.com/get-started/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/)

## Run
### Dev
```bash
COMPOSE_BAKE=true ENV=dev \
docker-compose run --build --rm cli
```

### Prod
```bash
COMPOSE_BAKE=true ENV=prod \
docker-compose run --build --rm cli
```