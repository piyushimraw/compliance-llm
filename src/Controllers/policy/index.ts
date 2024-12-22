import type { Context } from "hono";
import { insertPolicy } from "../../services/db/policy/index.js";
import { getHTML, parseHTML } from "../../utils/index.js";



const CreateNewPolicy = async (c: Context) => {
  const policy = await c.req.json()
  // parse the html from the policy source content 
  const html = await getHTML(policy.source)
  if (!html) {
    return c.json({ status: 'error', message: 'Failed to get HTML' }, 500)
  }
  const text = await parseHTML(html, policy.selectors)

  const newPolicy = await insertPolicy({
    ...policy,
    content: text
  })
  return c.json({ status: 'ok', policy: newPolicy })
}

export { CreateNewPolicy }