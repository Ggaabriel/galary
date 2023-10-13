FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app/galary

COPY . .
RUN npm install
RUN npm run build
EXPOSE 4173:4173
CMD ["npm", "run", "preview"]