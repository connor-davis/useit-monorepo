DO $$ BEGIN
 CREATE TYPE "public"."business_types" AS ENUM('Recycler', 'Waste Collector', 'Buy Back Centre');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('system_admin', 'admin', 'staff', 'business', 'collector');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "businesses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "business_types" DEFAULT 'Recycler' NOT NULL,
	"description" text NOT NULL,
	"phone_number" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"province" text NOT NULL,
	"zip_code" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "businesses_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_id" uuid NOT NULL,
	"collector_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"weight" decimal NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collectors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"id_number" text NOT NULL,
	"phone_number" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"province" text NOT NULL,
	"zip_code" text NOT NULL,
	"bank_name" text NOT NULL,
	"bank_account_holder" text NOT NULL,
	"bank_account_number" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"price" decimal NOT NULL,
	"gwCode" text NOT NULL,
	"carbonFactor" text NOT NULL,
	"business_id" uuid NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buyer_id" uuid NOT NULL,
	"seller_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"weight" decimal NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"role" "roles" DEFAULT 'collector' NOT NULL,
	"mfa_secret" varchar(255),
	"mfa_enabled" boolean DEFAULT false NOT NULL,
	"mfa_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
