ALTER TABLE "transactions" DROP CONSTRAINT "transactions_buyer_id_businesses_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_buyer_id_collectors_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_seller_id_businesses_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_seller_id_collectors_id_fk";
