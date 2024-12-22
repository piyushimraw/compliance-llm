import { eq } from "drizzle-orm"

import { db } from "db/index.js"
import { ComplianceCheck, ComplianceCheckInsertSchema } from "db/schema.js"

export const createComplianceCheck = async (url: string, policyId: number, name: string) => {
    const newComplianceCheck = ComplianceCheckInsertSchema.parse({ url, policyId, name })
    const complianceCheck = await db.insert(ComplianceCheck).values(newComplianceCheck).returning()
    return complianceCheck
}

export const getComplianceCheck = async (id: number) => {
    const complianceCheck = await db.select().from(ComplianceCheck).where(eq(ComplianceCheck.id, id)).limit(1)
    return complianceCheck[0]
}

export const updateComplianceCheck = async (id: number, status: string, complianceReport: any) => {
    const complianceCheck = await db.update(ComplianceCheck).set({ status, complianceReport }).where(eq(ComplianceCheck.id, id))
    return complianceCheck
}