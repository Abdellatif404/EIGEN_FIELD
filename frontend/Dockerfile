FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --prefer-offline --no-audit

# Copy rest of the code
COPY . .

# Expose port
EXPOSE 3039

# Start dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]