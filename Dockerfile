FROM node:16-alpine
ARG BASE_PATH

WORKDIR /app/reader
ENV BASE_PATH ${BASE_PATH}
ENV ROOT_PATH /app/docs
ENV PORT 80
ENV PRODUCTION true

RUN apk add --no-cache \
	chromium \
	nss \
	freetype \
	freetype-dev \
	harfbuzz \
	ca-certificates \
	ttf-freefont \
	yarn
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
	PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN yarn add puppeteer@1.19.0


RUN apk add git openssh

COPY ./.npmrc .
COPY ./package.json .

RUN npm install --legacy-peer-deps
COPY . .

RUN mkdir -p /app/docs 
	
RUN node -v && \
	npm -v && \
	npm run build:fn-schemes && \
	npm run build

CMD [ "npm", "start" ]
