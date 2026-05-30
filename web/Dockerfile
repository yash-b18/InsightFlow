FROM node:22-slim
WORKDIR /app
COPY package*.json ./
# Dev image uses `npm install` (not `npm ci`): create-next-app's lockfile has a
# cross-platform transitive mismatch that strict `npm ci` rejects on Linux.
RUN npm install --no-audit --no-fund
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
