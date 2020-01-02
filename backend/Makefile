CONTAINER_NAME := sd-api

build:
	docker-compose build
	docker-compose run --rm node npm install

start:
	docker-compose up -d

stop:
	docker-compose down

remove:
	docker-compose rm

logs:
	docker logs -f $(CONTAINER_NAME)

logs-tail:
	docker logs -f --tail 100 $(CONTAINER_NAME)

lint:
	docker-compose run --rm node npm run lint

mocha:
	docker-compose run --rm node npm run mocha

test: lint mocha

run:
	docker-compose exec node sh