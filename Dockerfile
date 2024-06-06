FROM node:20-alpine3.20 AS base

# ____ Dependencies ____
FROM base AS dependencies

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ____ Builder ____
FROM base AS builder

WORKDIR /app

# Bundle app source
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build && rm -rf src

# # ____ Release ____
FROM base as release

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV INDEX=1

RUN addgroup --system --gid 1001 runner
RUN adduser --system --uid 1001 runner

COPY --from=builder --chown=runner:runner /app /app
COPY --from=dependencies /app/node_modules /app/node_modules

USER runner

EXPOSE 3000

CMD node /app/dist/index.js





# docker build . -t simple-api:v1 --no-cache \
# && docker run --rm -it -d simple-api:v1 sh ls -la /app