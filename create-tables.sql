
-- Criar tabelas separadas para cada plataforma

-- Tabela para produtos do AliExpress
CREATE TABLE IF NOT EXISTS aliexpress_products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0,
    old_price DECIMAL(10,2),
    image TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para produtos da Amazon
CREATE TABLE IF NOT EXISTS amazon_products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0,
    old_price DECIMAL(10,2),
    image TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para produtos do Mercado Livre
CREATE TABLE IF NOT EXISTS mercadolivre_products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0,
    old_price DECIMAL(10,2),
    image TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_aliexpress_category ON aliexpress_products(category);
CREATE INDEX IF NOT EXISTS idx_amazon_category ON amazon_products(category);
CREATE INDEX IF NOT EXISTS idx_mercadolivre_category ON mercadolivre_products(category);

CREATE INDEX IF NOT EXISTS idx_aliexpress_price ON aliexpress_products(price);
CREATE INDEX IF NOT EXISTS idx_amazon_price ON amazon_products(price);
CREATE INDEX IF NOT EXISTS idx_mercadolivre_price ON mercadolivre_products(price);
