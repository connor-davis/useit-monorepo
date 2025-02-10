ALTER TABLE "collections" DROP CONSTRAINT "collections_business_id_businesses_id_fk";
--> statement-breakpoint
ALTER TABLE "collections" DROP CONSTRAINT "collections_collector_id_collectors_id_fk";
--> statement-breakpoint
ALTER TABLE "collections" DROP CONSTRAINT "collections_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "amount" text NOT NULL;