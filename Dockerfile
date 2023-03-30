FROM node:18-alpine AS Production

ENV NODE_ENV=production

WORKDIR /app

COPY ["/package.json", "/package-lock.json", "/app/"]

RUN npm install

COPY . /app/

RUN npm run build

CMD ["sh", "-c", "npm start"]

#######################################################

# FROM node:18-alpine

# install simple http-server for serving static content
#RUN npm install -g http-server

# make the "app" folder the current working directory
#WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
#COPY package*.json /app/

# install project dependencies
#RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
#COPY . /app/

# build client for production with minification
#RUN npm run build

#EXPOSE 3000

#CMD ["http-server", "build"]
