CREATE TABLE IF NOT EXISTS "record" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"url" text NOT NULL,
	"remarks" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "record" ADD CONSTRAINT "record_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
