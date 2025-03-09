# CLI

## Pre-requisites
* [Docker](https://docs.docker.com/get-started/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/)

## Development
### Build
```bash
COMPOSE_BAKE=true ENV=dev docker-compose build cli
```

### Expose dependencies to IDE
> Note: Run this each time you update the dependencies.

```bash
CONTAINER_ID=$(docker create php-examples/cli)
docker cp $CONTAINER_ID:/app/vendor ./vendor
docker rm -v $CONTAINER_ID
```

### Run
```bash
COMPOSE_BAKE=true ENV=dev docker-compose run cli
```