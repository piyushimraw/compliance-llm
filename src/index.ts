import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { ComplianceRouter } from './routes/index.js'
import { getStatus } from 'Controllers/index.js'

const app = new Hono()

app.route('/compliance', ComplianceRouter)
const port = 3000
console.log(`Server is running on http://localhost:${port}`)

app.get('/health', getStatus)


serve({
  fetch: app.fetch,
  port
})
