CREATE TABLE "compliance_check" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "compliance_check_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"policyId" integer,
	"complianceReport" jsonb,
	"status" varchar(255) DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "policy" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "policy_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"source" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	CONSTRAINT "policy_source_unique" UNIQUE("source")
);
--> statement-breakpoint
ALTER TABLE "compliance_check" ADD CONSTRAINT "compliance_check_policyId_policy_id_fk" FOREIGN KEY ("policyId") REFERENCES "public"."policy"("id") ON DELETE no action ON UPDATE no action;