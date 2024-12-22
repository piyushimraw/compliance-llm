import type { Context } from "hono";
import { createComplianceCheckJob } from "../../queue/check-compliance.js";
import { createComplianceCheck, getComplianceCheck } from "../../services/db/compliance/index.js";

export const CheckCompliance = async (c: Context) => {
  const { url, policyId, name } = await c.req.json()
  const complianceCheck = await createComplianceCheck(url, Number.parseInt(policyId, 10), name)
  await createComplianceCheckJob(url, policyId, name, `${complianceCheck[0].id}`)
  return c.json({ complianceCheck }, 202)
}       

export const GetComplianceCheck = async (c: Context) => {
  const { id } = await c.req.param()
  const complianceCheck = await getComplianceCheck(Number.parseInt(id, 10))
  return c.json({ complianceCheck }, 200)
}