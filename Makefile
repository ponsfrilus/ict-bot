.PHONY: dev start docker docker-dev docker-prod docker-build docker-tag docker-run docker-inside docker-run-prod docker-log stop

start:
	cd dev && npm start

dev:
	cd dev && npm run dev

docker-dev: docker-build docker-tag docker-run

docker-prod: docker-build docker-tag docker-run-prod docker-log

docker-build:
	docker build -t epflsi/ict-bot:$$(jq -r ".version" dev/package.json) .

docker-tag:
	docker tag epflsi/ict-bot:$$(jq -r ".version" dev/package.json) epflsi/ict-bot:latest

docker-run:
	docker run -it --rm --name ict-bot -e ICT_BOT_TOKEN epflsi/ict-bot:$$(jq -r ".version" dev/package.json)

docker-inside:
	docker exec -it ict-bot bash

docker-run-prod:
	docker run -d --rm --name ict-bot -e ICT_BOT_TOKEN epflsi/ict-bot:latest

docker-log:
	docker logs -f ict-bot

stop:
	docker stop ict-bot
