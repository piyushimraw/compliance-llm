import { Hono } from "hono"

const PolicyRouter = new Hono()

PolicyRouter.get('/', (c) => {
  return c.json({ status: 'ok' })
})

PolicyRouter.post('/', (c) => {
  return c.json({ status: 'ok' })
})

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