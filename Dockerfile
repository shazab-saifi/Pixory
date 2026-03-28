FROM oven/bun:1 AS base

WORKDIR /app

COPY ./package.json ./package.json
COPY ./bun.lock ./bun.lock

RUN bun install

COPY . .

EXPOSE 3000

RUN bun run build

CMD [ "bun", "run", "start:prod" ]
