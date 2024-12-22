import type { Context } from "hono";
import { checkCompliance } from "utils/index.js";

export const CheckCompliance = async (c: Context) => {
  const { url, policyId } = await c.req.json()
  const compliance = await checkCompliance(url, policyId)
  return c.json({ compliance }, 202)
} 