# build the image
docker build -t compliance-checker:latest . && \

# start with docker compose
docker compose up -d