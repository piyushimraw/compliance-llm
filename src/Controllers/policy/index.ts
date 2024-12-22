import type { Context } from "hono";
import { insertPolicy } from "services/db/policy/create.js"
const CreateNewPolicy = async (c: Context) => {
  const policy = await c.req.json()
  const newPolicy = await insertPolicy(policy)
  return c.json({ status: 'ok', policy: newPolicy })
}

export { CreateNewPolicy }