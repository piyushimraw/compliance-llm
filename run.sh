# Build and tag the image
docker build -t compliance-checker:latest . && \

# Remove existing container if it exists
docker rm -f compliance-checker || true

# Run the container
docker run -d \
  --name compliance-checker \
  -p 3000:3000 \
  compliance-checker:latest


echo "Container started. Access at http://localhost:3000"
