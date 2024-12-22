# Compliance Checker API

A scalable API to analyze a webpage's content against a compliance policy and return findings (non-compliant sections). This project supports integrating with OpenAI or open-source LLMs and is built with Node.js/TypeScript.

## Features

- Takes a webpage URL and a compliance policy as input.
- Uses LLMs to analyze webpage content for policy violations.
- Returns structured findings in JSON format.
- Designed for scalability, extensibility, and efficient processing.

## Tech Stack

- **Backend**: Node.js/TypeScript
- **AI Integration**: OpenAI API or open-source models (e.g., Hugging Face Transformers)
- **Data Storage**: Redis for caching, PostgreSQL/DynamoDB for persistent storage
- **Queue System**: RabbitMQ or AWS SQS for handling high-volume requests
- **Deployment**: Docker and Kubernetes

---

## Getting Started

### Prerequisites

1. **Node.js**: Ensure you have Node.js (v16 or higher) installed.
2. **Package Manager**: Use npm.
3. **Environment Variables**:
   - `OPENAI_API_KEY`: API key for OpenAI integration (if applicable).
   - `REDIS_URL`: Redis instance URL for caching.
   - `DATABASE_URL`: Database connection string.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/compliance-checker-api.git
   cd compliance-checker-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   REDIS_URL=redis://localhost:6379
   DATABASE_URL=your_database_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Documentation

### **Endpoint**: `/api/check-compliance`

#### Method: **POST**

#### Request Body:
```json
{
  "webpageUrl": "https://example.com",
  "policyText": "<compliance policy here>"
}
```

#### Response:
```json
{
  "results": [
    {
      "section": "Section Title or Content Snippet",
      "violation": "Policy clause violated",
      "confidence": 0.95
    }
  ],
  "summary": {
    "complianceScore": 75,
    "totalViolations": 5
  }
}
```

---

## Project Structure

```
compliance-checker-api/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.ts
├── tests/
├── .env
├── Dockerfile
├── package.json
└── README.md
```

---

## Deployment

### Using Docker:

1. Build the Docker image:
   ```bash
   docker build -t compliance-checker-api .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env compliance-checker-api
   ```

### Using Kubernetes:

1. Deploy using the provided `deployment.yaml` file:
   ```bash
   kubectl apply -f deployment.yaml
   ```

---

## Testing

Run the test suite using:
```bash
npm run test
```

---

## Future Enhancements

- Add support for dynamically ingesting compliance policies.
- Implement more advanced logging and monitoring.
- Optimize LLM integrations for cost and performance.
