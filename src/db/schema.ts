import { boolean, integer, jsonb, pgTable, timestamp, varchar, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// add a unique constraint to the source column
// add index to the source column
export const Policy = pgTable("policy", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  source: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  isActive: boolean().notNull().default(true),
});



export type PolicyInsert = typeof Policy.$inferInsert
export type PolicySelect = typeof Policy.$inferSelect

export const PolicyInsertSchema = createInsertSchema(Policy)
export const PolicySelectSchema = createSelectSchema(Policy)


export const ComplianceCheck = pgTable("compliance_check", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  policyId: integer().references(() => Policy.id),
  complianceReport: jsonb(),
  status: varchar({ length: 255 }).notNull().default('pending'),
});

export type ComplianceCheckInsert = typeof ComplianceCheck.$inferInsert
export type ComplianceCheckSelect = typeof ComplianceCheck.$inferSelect

export const ComplianceCheckInsertSchema = createInsertSchema(ComplianceCheck)
export const ComplianceCheckSelectSchema = createSelectSchema(ComplianceCheck)
