FROM node

WORKDIR /app

ARG NODE_ENV=production

COPY package*.json ./
RUN npm install
COPY logs ./logs
COPY load ./load
COPY dist ./dist

CMD ["npm", "run", "start"]