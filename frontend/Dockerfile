FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --prefer-offline --no-audit

COPY . .

EXPOSE 3039

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]