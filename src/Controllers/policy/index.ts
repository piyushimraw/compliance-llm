import type { Context } from "hono";
import { insertPolicy } from "../../services/db/policy/index.js";
import { getHTML, parseHTML } from "../../utils/index.js";
import { createParsePolicyJob } from "../../queue/parse-policy.js";



const CreateNewPolicy = async (c: Context) => {
  const policy = await c.req.json()
  const newPolicy = await insertPolicy({
    ...policy,
    content: ""
  })
  await createParsePolicyJob(policy.source, newPolicy[0].id.toString(), policy.selectors)
  return c.json({ status: 'ok', policy: newPolicy }, 201)
}

export { CreateNewPolicy }