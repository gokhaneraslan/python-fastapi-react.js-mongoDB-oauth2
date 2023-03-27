FROM node:17-alpine

WORKDIR /app

COPY /package.json /app/

RUN npm install --slient

RUN npm install -g react-scripts@5.0.0

COPY . /app/

CMD ["npm", "start"]
