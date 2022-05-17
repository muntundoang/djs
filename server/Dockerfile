FROM node:16.14.2

WORKDIR /server

ENV PORT=3001

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]