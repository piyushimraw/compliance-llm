import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { checkCompliance } from "utils/index.js"

const ComplianceRouter = new Hono()

ComplianceRouter.post('/new', (c) => {
  return c.text('Hello Hono!')
})

ComplianceRouter.get('/', (c) => {
  return c.text('Hello Hono!')
})

ComplianceRouter.get('/:id', (c) => {
  return c.text('Hello Hono!')
})

ComplianceRouter.put('/:id', (c) => {
  return c.text('Hello Hono!')
})

ComplianceRouter.delete('/:id', (c) => {
  return c.text('Hello Hono!')
})


ComplianceRouter.post('/check', zValidator(
  "json",
  z.object({
    url: z.string(),
    })
  ), async (c) => {
  const { url } = await c.req.json()
  const complianceScore = await checkCompliance(url)
  return c.json({ complianceScore })
})

export { ComplianceRouter }
