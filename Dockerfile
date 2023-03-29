<<<<<<< HEAD
FROM node:alpine
=======
FROM node:18.15.0
>>>>>>> 5d7e2f2 (initial commit)

WORKDIR /app

COPY /package.json /app/

RUN npm install

COPY . /app/

CMD ["npm", "start"]
