FROM node:alpine

WORKDIR /app/frontend
COPY . /app/frontend
RUN npm install

EXPOSE 5000



