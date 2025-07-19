
// Migration script for platform-specific tables

// Sample products data for each platform
const aliexpressProducts = [
  {
    title: "Audio Interface Focusrite Scarlett Solo",
    category: "homestudio",
    price: 299.99,
    old_price: 450.00,
    rating: 4.6,
    reviews: 892,
    image: "https://ae01.alicdn.com/kf/Sbb8f8c1234567890.jpg",
    link: "https://aliexpress.com/item/123456789.html"
  },
  {
    title: "Suporte Guitarra Universal",
    category: "acessorios",
    price: 25.90,
    old_price: null,
    rating: 4.2,
    reviews: 1876,
    image: "https://ae01.alicdn.com/kf/H123456789.jpg",
    link: "https://aliexpress.com/item/987654321.html"
  }
];

const amazonProducts = [
  {
    title: "Boss DS-1 Distortion Pedal",
    category: "pedais",
    price: 89.90,
    old_price: 120.00,
    rating: 4.5,
    reviews: 2347,
    image: "https://m.media-amazon.com/images/I/61hqzSXKvyL._AC_SX466_.jpg",
    link: "https://amazon.com.br/dp/B0002CZV8E"
  },
  {
    title: "Fender Player Stratocaster Pack",
    category: "audiotech",
    price: 2499.99,
    old_price: 3200.00,
    rating: 4.9,
    reviews: 456,
    image: "https://m.media-amazon.com/images/I/71ABC123DEF.jpg",
    link: "https://amazon.com.br/dp/B087CDEF123"
  },
  {
    title: "Shure SM57 Microfone Dinâmico",
    category: "homestudio",
    price: 450.00,
    old_price: 550.00,
    rating: 4.8,
    reviews: 3421,
    image: "https://m.media-amazon.com/images/I/41DEF456GHI.jpg",
    link: "https://amazon.com.br/dp/B000CZ0R42"
  },
  {
    title: "Neural DSP Archetype Nolly",
    category: "presets",
    price: 199.00,
    old_price: 250.00,
    rating: 4.7,
    reviews: 234,
    image: "https://m.media-amazon.com/images/I/61XYZ789ABC.jpg",
    link: "https://amazon.com.br/dp/B098765432"
  },
  {
    title: "Ableton Live Suite (Download)",
    category: "presets",
    price: 599.00,
    old_price: 750.00,
    rating: 4.9,
    reviews: 89,
    image: "https://m.media-amazon.com/images/I/51GHI789JKL.jpg",
    link: "https://amazon.com.br/dp/B087JKLMNO"
  }
];

const mercadolivreProducts = [
  {
    title: "Cabo P10 Mono 3m Monster Cable",
    category: "acessorios",
    price: 45.90,
    old_price: null,
    rating: 4.8,
    reviews: 1543,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_665847-MLB32848350474_112019-F.webp",
    link: "https://produto.mercadolivre.com.br/MLB-123456789"
  },
  {
    title: "TC Electronic Ditto Looper",
    category: "pedais",
    price: 350.00,
    old_price: 420.00,
    rating: 4.4,
    reviews: 678,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_789012-MLB.webp",
    link: "https://produto.mercadolivre.com.br/MLB-987654321"
  },
  {
    title: "Marshall DSL40CR Amplificador",
    category: "audiotech",
    price: 1899.99,
    old_price: 2300.00,
    rating: 4.6,
    reviews: 156,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_456789-MLB.webp",
    link: "https://produto.mercadolivre.com.br/MLB-456789123"
  }
];

// Migration functions
async function migrateToNewTables() {
    console.log('Starting migration to platform-specific tables...');
    
    try {
        // Migrate existing products from old table
        await productService.migrateExistingProducts();
        
        // Add sample products to each platform
        console.log('Adding AliExpress products...');
        for (const product of aliexpressProducts) {
            await productService.addProduct(product, 'aliexpress');
            console.log(`Added AliExpress product: ${product.title}`);
        }
        
        console.log('Adding Amazon products...');
        for (const product of amazonProducts) {
            await productService.addProduct(product, 'amazon');
            console.log(`Added Amazon product: ${product.title}`);
        }
        
        console.log('Adding Mercado Livre products...');
        for (const product of mercadolivreProducts) {
            await productService.addProduct(product, 'mercadolivre');
            console.log(`Added Mercado Livre product: ${product.title}`);
        }
        
        console.log('Migration completed successfully!');
        
        // Test the new functions
        console.log('\n--- Testing new functions ---');
        const allProducts = await productService.getAllProducts();
        console.log(`Total products loaded: ${allProducts.length}`);
        
        const aliexpressOnly = await productService.getProductsByPlatform('aliexpress');
        console.log(`AliExpress products: ${aliexpressOnly.length}`);
        
        const amazonOnly = await productService.getProductsByPlatform('amazon');
        console.log(`Amazon products: ${amazonOnly.length}`);
        
        const mercadolivreOnly = await productService.getProductsByPlatform('mercadolivre');
        console.log(`Mercado Livre products: ${mercadolivreOnly.length}`);
        
    } catch (error) {
        console.error('Error during migration:', error);
    }
}

// Clear all platform tables
async function clearAllTables() {
    console.log('Clearing all platform tables...');
    
    try {
        await Promise.all([
            supabaseClient.from('aliexpress_products').delete().neq('id', 0),
            supabaseClient.from('amazon_products').delete().neq('id', 0),
            supabaseClient.from('mercadolivre_products').delete().neq('id', 0)
        ]);
        console.log('All tables cleared!');
    } catch (error) {
        console.error('Error clearing tables:', error);
    }
}

// Make functions available globally
window.migrateToNewTables = migrateToNewTables;
window.clearAllTables = clearAllTables;

// Auto-run migration on page load (comment out if not needed)
// migrateToNewTables();
