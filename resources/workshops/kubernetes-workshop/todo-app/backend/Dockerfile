FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# COPY .env .env
RUN npm install
COPY . .
EXPOSE 3004
CMD ["npm", "start"]