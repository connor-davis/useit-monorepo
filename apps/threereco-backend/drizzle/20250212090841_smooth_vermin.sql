ALTER TABLE "stock" ADD CONSTRAINT "stock_productId_unique" UNIQUE("product_id");--> statement-breakpoint
CREATE OR REPLACE FUNCTION update_stock_after_transaction() 
RETURNS TRIGGER AS $$
BEGIN
  -- If transaction type is 'collection', increase stock for the buyer
  IF NEW.type = 'collection' THEN
    INSERT INTO stock (businessId, productId, weight)
    VALUES (NEW.buyerId, NEW.productId, NEW.weight)
    ON CONFLICT (businessId, productId)
    DO UPDATE SET weight = stock.weight + NEW.weight;
    
  -- If transaction type is 'transfer', decrease seller stock and increase buyer stock
  ELSIF NEW.type = 'transfer' THEN
    -- Decrease stock for the seller
    UPDATE stock 
    SET weight = weight - NEW.weight 
    WHERE businessId = NEW.sellerId 
    AND productId = NEW.productId;
    
    -- Increase stock for the buyer
    INSERT INTO stock (businessId, productId, weight)
    VALUES (NEW.buyerId, NEW.productId, NEW.weight)
    ON CONFLICT (businessId, productId)
    DO UPDATE SET weight = stock.weight + NEW.weight;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint
-- Create the trigger to execute after an INSERT on transactions table
CREATE TRIGGER trigger_update_stock
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_stock_after_transaction();--> statement-breakpoint