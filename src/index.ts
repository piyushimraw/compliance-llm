import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { ComplianceRouter, PolicyRouter } from './routes/index.js'
import { getStatus } from 'controllers/index.js'
import { startQueue } from 'queue/check-compliance.js'

const app = new Hono()
startQueue()

app.route('/compliance', ComplianceRouter)
app.route('/policy', PolicyRouter)


const port = 3000
console.log(`Server is running on http://localhost:${port}`)

app.get('/health', getStatus)


serve({
  fetch: app.fetch,
  port
})
