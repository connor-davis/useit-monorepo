ALTER TABLE "businesses" DROP CONSTRAINT "businesses_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "collectors" DROP CONSTRAINT "collectors_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_business_id_businesses_id_fk";
