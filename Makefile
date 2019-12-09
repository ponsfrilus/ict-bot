VERSION := $(shell cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')

newversion:
	$(MAKE) version
	npm version patch

.PHONY: version
version:
	@echo $(VERSION)

getversion: package.json
	cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]'

login:
	docker login

build:
	docker build -t saphirevert/ict-bot:$(VERSION) .

run:
	docker run -it --rm --name ict-bot -e BOT_TOKEN saphirevert/ict-bot:$(VERSION)

exec:
	docker exec -it ict-bot bash

runprod:
	docker run -d --rm --name ict-bot -e BOT_TOKEN saphirevert/ict-bot:$(VERSION)

stop:
	docker stop ict-bot
