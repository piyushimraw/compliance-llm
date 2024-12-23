import { eq } from "drizzle-orm"
import { db } from "../../../db/index.js"
import { type PolicyInsert, PolicyInsertSchema, Policy } from "../../../db/schema.js"


export const insertPolicy = async (policy: PolicyInsert) => {
  const parsedPolicy = PolicyInsertSchema.parse(policy)
  const newPolicy = await db.insert(Policy).values(parsedPolicy).returning()
  return newPolicy
}
export const getPolicyById = async (policyId: string) => {
    const policy = await db.select().from(Policy).where(eq(Policy.id, Number.parseInt(policyId, 10))).limit(1)
    return policy[0]
}   

export const updatePolicy = async (policyId: string, status: string, content: string) => {
    const policy = await db.update(Policy).set({ status, content, updatedAt: new Date() }).where(eq(Policy.id, Number.parseInt(policyId, 10)))
    return policy
}