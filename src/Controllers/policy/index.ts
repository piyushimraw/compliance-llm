import type { Context } from "hono";
import { insertPolicy } from "services/db/policy/create.js"
import { parseHTML } from "utils/index.js";


const CreateNewPolicy = async (c: Context) => {
  const policy = await c.req.json()
  // parse the html from the policy source content 
  const html = await parseHTML(policy.source)
  if (!html) {
    return c.json({ status: 'error', message: 'Failed to parse HTML' }, 500)
  }

  const newPolicy = await insertPolicy({
    ...policy,
    content: html
  })
  return c.json({ status: 'ok', policy: newPolicy })
}

export { CreateNewPolicy }