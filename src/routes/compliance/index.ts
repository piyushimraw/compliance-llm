import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { CheckCompliance, GetComplianceCheck } from "../../controllers/compliance/index.js"

const ComplianceRouter = new Hono()


ComplianceRouter.post('/check', zValidator(
  "json",
  z.object({
    url: z.string().url(),
    policyId: z.string(),
    name: z.string(),
  })
  ), CheckCompliance)


ComplianceRouter.get('/status/:id', zValidator(
  "param",
  z.object({
    id: z.string(),
  })
), GetComplianceCheck)

export { ComplianceRouter }
