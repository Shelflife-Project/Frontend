FROM node:22.19.0-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install
RUN npm i -g serve

COPY . .

ARG VITE_BACKEND_BASE_URL
RUN VITE_BACKEND_BASE_URL=${VITE_BACKEND_BASE_URL} npm run build

EXPOSE 5173

CMD [ "serve", "-s", "-l", "5173", "dist" ]