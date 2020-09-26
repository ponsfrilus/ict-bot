FROM node:13
LABEL version=0.0.5
LABEL maintainer="Jérôme Cosandey"
LABEL maintainer="Nicolas Borboën"

RUN mkdir -p /usr/src/app
COPY data.json /usr/src/app
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY index.js /usr/src/app

WORKDIR /usr/src/app

RUN npm install

CMD ["npm", "start"]

# Please note that you will need the relevant BOT_TOKEN information exported in
# your shell environment
# Build: docker build -t epflsi/ict-bot:0.0.5 .
# Run: docker run -it --rm --name ict-bot -e BOT_TOKEN epflsi/ict-bot:0.0.5
# Test: docker exec -it ict-bot bash
# Run Prod: docker run -d --rm --name ict-bot -e BOT_TOKEN epflsi/ict-bot:0.0.5
# Stop: docker stop ict-bot
