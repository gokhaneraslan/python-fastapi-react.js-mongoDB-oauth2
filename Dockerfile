FROM node:18-alpine AS Production

ENV NODE_ENV=production

WORKDIR /app

COPY ["/package.json", "/package-lock.json", "/app/"]

RUN npm install

COPY . /app/

RUN npm run build

CMD ["sh", "-c", "npm start"]
