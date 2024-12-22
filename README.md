# Compliance Checker API

A scalable API that analyzes webpage content against compliance policies using LLMs. Built with Node.js/TypeScript, this service supports OpenAI integration with an extensible architecture for other LLM providers.

## Architecture Overview

### Core Components
- **API Layer**: Hono.js-based REST API
- **Queue System**: Asynchronous job processing with Bee-Queue
- **Database**: PostgreSQL with Drizzle ORM
- **LLM Integration**: OpenAI GPT-4 with structured outputs
- **Content Processing**: HTML scraping and text extraction

### Key Features
- Asynchronous compliance checking
- Web content scraping and processing
- Structured compliance reports with confidence scores
- Policy management and versioning
- Queue-based architecture for scalability

## API Reference

### Policy Management
- `POST /policy` - Create policy from URL
  ```json
  {
    "name": "Policy Name",
    "source": "https://example.com/policy",
    "selectors": ["article"]
  }
  ```

- `GET /policy/:id` - Retrieve policy
- `PUT /policy/:id` - Update policy
- `DELETE /policy/:id` - Delete policy

### Compliance Checking
- `POST /compliance/check` - Submit check request
  ```json
  {
    "url": "https://example.com",
    "policyId": "123",
    "name": "Check Name"
  }
  ```

- `GET /compliance/status/:id` - Get check status

## Development Setup

### Prerequisites
- Node.js v20+
- Docker & Docker Compose
- PostgreSQL
- Redis

### Quick Start
```bash
# use node version 20
nvm use 

# generate .env file
cp .env.example .env


# Install packages
npm install

# start the infrastructure
docker-compose up -d 

# Copy the .env.example file to .env and update the values
cp .env.example .env

# Run database migrations
npm run migrate



# Start development server
npm run dev
```

### Environment Variables

```.env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
OPENAI_API_KEY=your_openai_key
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Run with Docker Compose

```bash
# Start the infrastructure
docker-compose up -d
```

## Future Enhancements

### Security & Performance
- API authentication/authorization
- Rate limiting and request throttling
- Response caching
- Batch processing support

### Monitoring & Reliability
- Structured logging
- Error tracking
- Service health monitoring
- Performance metrics

### Feature Roadmap
- Multiple LLM provider support
- Custom compliance rule definitions
- Real-time status updates via WebSocket
- Enhanced report templating