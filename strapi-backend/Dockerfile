FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Для Strapi не нужен build, если не кастомный пайплайн. Если используете build: уберите если не нужен.
# RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
