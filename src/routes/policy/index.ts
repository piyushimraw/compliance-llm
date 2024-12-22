import { CreateNewPolicy } from "controllers/policy/index.js"
import { Hono } from "hono"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
const PolicyRouter = new Hono()

PolicyRouter.get('/', (c) => {
  return c.json({ status: 'ok' })
})

PolicyRouter.post('/', zValidator(
  'json',
  z.object({
    name: z.string(),
    content: z.optional(z.string()),
    source: z.string().url(),
    selectors: z.array(z.string()).optional()
  })
), CreateNewPolicy)

PolicyRouter.put('/:id', (c) => {
  return c.json({ status: 'ok' })
}) 

PolicyRouter.delete('/:id', (c) => {
  return c.json({ status: 'ok' })
})

PolicyRouter.get('/:id', (c) => {
  return c.json({ status: 'ok' })
})

export { PolicyRouter }