import { boolean, integer, jsonb, pgTable, timestamp, varchar, text } from "drizzle-orm/pg-core";

export const Policy = pgTable("policy", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  source: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  isActive: boolean().notNull().default(true),
});


export const ComplianceCheck = pgTable("compliance_check", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  policyId: integer().references(() => Policy.id),
  complianceReport: jsonb().notNull(),
});
