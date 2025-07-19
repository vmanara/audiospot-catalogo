
-- SQL script to create platform-specific tables without old_price column

-- Create AliExpress products table
CREATE TABLE IF NOT EXISTS aliexpress_products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0,
    image TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Remove old_price column if it exists
ALTER TABLE aliexpress_products DROP COLUMN IF EXISTS old_price;

-- Create Amazon products table
CREATE TABLE IF NOT EXISTS amazon_products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0,
    image TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Remove old_price column if it exists
ALTER TABLE amazon_products DROP COLUMN IF EXISTS old_price;

-- Create Mercado Livre products table
CREATE TABLE IF NOT EXISTS mercadolivre_products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0,
    image TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Remove old_price column if it exists
ALTER TABLE mercadolivre_products DROP COLUMN IF EXISTS old_price;
