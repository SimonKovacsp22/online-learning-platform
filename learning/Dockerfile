# Stage 1: Build the Angular app
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf node_modules/video.js/dist/types
RUN npm run build

# Stage 2: Create the production image
FROM nginx:latest
COPY --from=build /app/dist/learning /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]