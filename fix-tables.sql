
-- Execute this in Supabase SQL Editor to remove old_price column from all tables

-- Remove old_price column from AliExpress products table
ALTER TABLE aliexpress_products DROP COLUMN IF EXISTS old_price;

-- Remove old_price column from Amazon products table  
ALTER TABLE amazon_products DROP COLUMN IF EXISTS old_price;

-- Remove old_price column from Mercado Livre products table
ALTER TABLE mercadolivre_products DROP COLUMN IF EXISTS old_price;

-- Verify table structures
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('aliexpress_products', 'amazon_products', 'mercadolivre_products')
ORDER BY table_name, ordinal_position;
