import type { Context } from "hono"

const getStatus = async (c: Context) => {
  return c.json({ status: 'ok' })
}

export { getStatus }