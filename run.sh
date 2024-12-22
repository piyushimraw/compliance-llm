# start with docker compose
docker compose up -d && \

# run database migrations
npm run migrate

# start the server
npm run dev
