import { db } from "db/index.js"
import { Policy, PolicyInsertSchema } from "db/schema.js"
import { type PolicyInsert } from "db/schema.js"

export const insertPolicy = async (policy: PolicyInsert) => {
  const parsedPolicy = PolicyInsertSchema.parse(policy)
  const newPolicy = await db.insert(Policy).values(parsedPolicy).returning()
  return newPolicy
}