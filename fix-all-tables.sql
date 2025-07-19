
-- Script SQL completo para corrigir as tabelas no Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Remover coluna old_price de todas as tabelas
ALTER TABLE aliexpress_products DROP COLUMN IF EXISTS old_price;
ALTER TABLE amazon_products DROP COLUMN IF EXISTS old_price;
ALTER TABLE mercadolivre_products DROP COLUMN IF EXISTS old_price;

-- 2. Limpar TODOS os produtos existentes (com preços incorretos)
DELETE FROM aliexpress_products;
DELETE FROM amazon_products;  
DELETE FROM mercadolivre_products;

-- 3. Inserir produtos com preço 0 para extração automática dos links afiliados
INSERT INTO aliexpress_products (title, category, price, rating, reviews, image, link) VALUES
('Kokko Distortion (variados)', 'pedais', 0, 4.3, 234, 'https://ae01.alicdn.com/kf/H123456789.jpg', 'https://s.click.aliexpress.com/e/_oprO7T8'),
('Afinador Mini Pedal Kokko', 'pedais', 0, 4.5, 156, 'https://ae01.alicdn.com/kf/H987654321.jpg', 'https://s.click.aliexpress.com/e/_oDBUPWi'),
('Controlador MIDI Chocolate', 'audiotech', 0, 4.2, 89, 'https://ae01.alicdn.com/kf/H567890123.jpg', 'https://s.click.aliexpress.com/e/_oEd2SDy'),
('Palhetas Alice Kit 12 unidades', 'acessorios', 0, 4.7, 445, 'https://ae01.alicdn.com/kf/H246810357.jpg', 'https://s.click.aliexpress.com/e/_picks123');

INSERT INTO amazon_products (title, category, price, rating, reviews, image, link) VALUES
('Audio Interface Focusrite Scarlett Solo', 'audiotech', 0, 4.6, 1234, 'https://m.media-amazon.com/images/I/example1.jpg', 'https://amzn.to/example1'),
('Monitor de Referência KRK Rokit 5', 'audiotech', 0, 4.8, 567, 'https://m.media-amazon.com/images/I/example2.jpg', 'https://amzn.to/example2'),
('Cabo XLR Mogami Gold', 'acessorios', 0, 4.5, 234, 'https://m.media-amazon.com/images/I/example3.jpg', 'https://amzn.to/example3');

INSERT INTO mercadolivre_products (title, category, price, rating, reviews, image, link) VALUES
('Guitarra Tagima TG-500 Stratocaster', 'instrumentos', 0, 4.5, 234, 'https://http2.mlstatic.com/D_example1.jpg', 'https://mercadolivre.com.br/example1'),
('Pedal Boss DS-1 Distortion', 'pedais', 0, 4.7, 567, 'https://http2.mlstatic.com/D_example2.jpg', 'https://mercadolivre.com.br/example2'),
('Cabo P10 Santo Angelo 3 metros', 'acessorios', 0, 4.3, 123, 'https://http2.mlstatic.com/D_example3.jpg', 'https://mercadolivre.com.br/example3');

-- 4. Verificar se está tudo correto
SELECT 'aliexpress_products' as tabela, COUNT(*) as total, AVG(price) as preco_medio
FROM aliexpress_products
UNION ALL
SELECT 'amazon_products' as tabela, COUNT(*) as total, AVG(price) as preco_medio
FROM amazon_products
UNION ALL
SELECT 'mercadolivre_products' as tabela, COUNT(*) as total, AVG(price) as preco_medio
FROM mercadolivre_products;
