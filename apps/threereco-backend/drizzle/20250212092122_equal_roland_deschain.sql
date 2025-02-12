-- Custom SQL migration file, put your code below! --
CREATE OR REPLACE FUNCTION update_stock_after_transaction() 
RETURNS TRIGGER AS $$
BEGIN
  -- If transaction type is 'collection', always update stock for the buyer
  IF NEW.type = 'collection' THEN
    INSERT INTO stock (business_id, product_id, weight)
    VALUES (NEW.buyer_id, NEW.product_id, NEW.weight)
    ON CONFLICT (business_id, product_id)
    DO UPDATE SET weight = stock.weight + NEW.weight;

  -- If transaction type is 'transfer', only update stock if seller has accepted
  ELSIF NEW.type = 'transfer' AND NEW.seller_accepted = TRUE THEN
    -- Decrease stock for the seller
    UPDATE stock 
    SET weight = weight - NEW.weight 
    WHERE business_id = NEW.seller_id 
    AND product_id = NEW.product_id;

    -- Increase stock for the buyer
    INSERT INTO stock (business_id, product_id, weight)
    VALUES (NEW.buyer_id, NEW.product_id, NEW.weight)
    ON CONFLICT (business_id, product_id)
    DO UPDATE SET weight = stock.weight + NEW.weight;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint

-- Drop the existing trigger first
DROP TRIGGER IF EXISTS trigger_update_stock ON transactions;--> statement-breakpoint

-- Create the new trigger with the modified function
CREATE TRIGGER trigger_update_stock
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_stock_after_transaction();--> statement-breakpoint
