# Sử dụng multi-stage build:
# Giai đoạn 1: Build ứng dụng React
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

# Giai đoạn 2: Chạy ứng dụng React
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]