FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]