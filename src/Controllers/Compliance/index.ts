import type { Context } from "hono";
import { createComplianceCheck } from "services/db/compliance/index.js";
import { createComplianceCheckJob } from "queue/check-compliance.js";
export const CheckCompliance = async (c: Context) => {
  const { url, policyId, name } = await c.req.json()
  const complianceCheck = await createComplianceCheck(url, Number.parseInt(policyId, 10), name)
  await createComplianceCheckJob(url, policyId, name)
  return c.json({ complianceCheck }, 202)
}       