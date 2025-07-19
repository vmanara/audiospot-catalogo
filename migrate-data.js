// Migration script for platform-specific tables

// Sample products data for each platform
const aliexpressProducts = [
  {
    title: "Kokko Distortion (variados)",
    category: "pedais",
    price: 0, // Será extraído do link
    rating: 4.3,
    reviews: 234,
    image: "https://ae01.alicdn.com/kf/H123456789.jpg",
    link: "https://s.click.aliexpress.com/e/_oprO7T8"
  },
  {
    title: "Afinador Mini Pedal Kokko",
    category: "pedais",
    price: 0, // Será extraído do link
    rating: 4.5,
    reviews: 156,
    image: "https://ae01.alicdn.com/kf/H987654321.jpg",
    link: "https://s.click.aliexpress.com/e/_oDBUPWi"
  },
  {
    title: "Controlador MIDI Chocolate",
    category: "audiotech",
    price: 0, // Será extraído do link
    rating: 4.2,
    reviews: 89,
    image: "https://ae01.alicdn.com/kf/H567890123.jpg",
    link: "https://s.click.aliexpress.com/e/_oEd2SDy"
  },
  {
    title: "Palhetas Alice Kit 12 unidades",
    category: "acessorios",
    price: 0, // Será extraído do link
    rating: 4.7,
    reviews: 445,
    image: "https://ae01.alicdn.com/kf/H246810357.jpg",
    link: "https://s.click.aliexpress.com/e/_picks123"
  }
];

const amazonProducts = [
  {
    title: "Audio Interface Focusrite Scarlett Solo",
    category: "homestudio",
    price: 0, // Será extraído do link
    rating: 4.6,
    reviews: 892,
    image: "https://m.media-amazon.com/images/I/61example.jpg",
    link: "https://amzn.to/example1"
  },
  {
    title: "Monitor de Referência KRK Rokit 5",
    category: "homestudio",
    price: 0, // Será extraído do link
    rating: 4.4,
    reviews: 234,
    image: "https://m.media-amazon.com/images/I/61example2.jpg",
    link: "https://amzn.to/example2"
  },
  {
    title: "Cabo XLR Mogami Gold",
    category: "acessorios",
    price: 0, // Será extraído do link
    rating: 4.8,
    reviews: 156,
    image: "https://m.media-amazon.com/images/I/61example3.jpg",
    link: "https://amzn.to/example3"
  }
];

const mercadolivreProducts = [
  {
    title: "Guitarra Tagima TG-500 Stratocaster",
    category: "instrumentos",
    price: 0, // Será extraído do link
    rating: 4.5,
    reviews: 234,
    image: "https://http2.mlstatic.com/D_example1.jpg",
    link: "https://mercadolivre.com.br/example1"
  },
  {
    title: "Pedal Boss DS-1 Distortion",
    category: "pedais",
    price: 0, // Será extraído do link
    rating: 4.7,
    reviews: 567,
    image: "https://http2.mlstatic.com/D_example2.jpg",
    link: "https://mercadolivre.com.br/example2"
  },
  {
    title: "Cabo P10 Santo Angelo 3 metros",
    category: "acessorios",
    price: 0, // Será extraído do link
    rating: 4.3,
    reviews: 123,
    image: "https://http2.mlstatic.com/D_example3.jpg",
    link: "https://mercadolivre.com.br/example3"
  }
];

// Migration functions
async function migrateToNewTables() {
    console.log('Starting migration to platform-specific tables...');

    try {
        // Clear existing data in new tables first
        await clearAllTables();

        // Migrate existing products from old table to new tables
        console.log('Migrating existing products from old table...');
        await productService.migrateExistingProducts();

        // Add sample products to each platform
        console.log('Adding AliExpress products...');
        for (const product of aliexpressProducts) {
            try {
                await productService.addProduct(product, 'aliexpress');
                console.log(`✓ Added AliExpress product: ${product.title}`);
            } catch (error) {
                console.error(`✗ Error adding AliExpress product: ${product.title}`, error);
            }
        }

        console.log('Adding Amazon products...');
        for (const product of amazonProducts) {
            try {
                await productService.addProduct(product, 'amazon');
                console.log(`✓ Added Amazon product: ${product.title}`);
            } catch (error) {
                console.error(`✗ Error adding Amazon product: ${product.title}`, error);
            }
        }

        console.log('Adding Mercado Livre products...');
        for (const product of mercadolivreProducts) {
            try {
                await productService.addProduct(product, 'mercadolivre');
                console.log(`✓ Added Mercado Livre product: ${product.title}`);
            } catch (error) {
                console.error(`✗ Error adding Mercado Livre product: ${product.title}`, error);
            }
        }

        console.log('✅ Migration completed successfully!');
        
        // Automatically extract prices from links after migration
        console.log('🔍 Starting automatic price extraction from affiliate links...');
        await updatePricesFromLinks();

        // Test the new functions
        console.log('\n--- Testing new functions ---');
        const allProducts = await productService.getAllProducts();
        console.log(`📊 Total products loaded: ${allProducts.length}`);

        const aliexpressOnly = await productService.getProductsByPlatform('aliexpress');
        console.log(`🛒 AliExpress products: ${aliexpressOnly.length}`);

        const amazonOnly = await productService.getProductsByPlatform('amazon');
        console.log(`📦 Amazon products: ${amazonOnly.length}`);

        const mercadolivreOnly = await productService.getProductsByPlatform('mercadolivre');
        console.log(`🛍️ Mercado Livre products: ${mercadolivreOnly.length}`);

        // Reload page to show new products
        setTimeout(() => {
            window.location.reload();
        }, 2000);

    } catch (error) {
        console.error('❌ Error during migration:', error);
    }
}

// Clear all platform tables
async function clearAllTables() {
    console.log('🧹 Clearing all platform tables...');

    try {
        await Promise.all([
            supabaseClient.from('aliexpress_products').delete().neq('id', 0),
            supabaseClient.from('amazon_products').delete().neq('id', 0),
            supabaseClient.from('mercadolivre_products').delete().neq('id', 0)
        ]);
        console.log('✅ All tables cleared!');
    } catch (error) {
        console.error('❌ Error clearing tables:', error);
    }
}

// Update prices from links function
async function updatePricesFromLinks() {
    console.log('🔄 Starting price update from affiliate links...');

    // Wait for price extractor to be available
    let retries = 0;
    while (!window.priceExtractor && retries < 10) {
        console.log('Waiting for price extractor...');
        await new Promise(resolve => setTimeout(resolve, 500));
        retries++;
    }

    if (!window.priceExtractor) {
        console.error('Price extractor not available');
        return;
    }

    if (!supabaseClient) {
        console.error('Supabase client not available');
        return;
    }

    const success = await productService.updatePricesFromLinks();

    if (success) {
        // Reload page to show updated prices
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
}

// Make functions available globally
window.migrateToNewTables = migrateToNewTables;
window.clearAllTables = clearAllTables;
window.updatePricesFromLinks = updatePricesFromLinks;

// Only show migration buttons in development (localhost)
document.addEventListener('DOMContentLoaded', () => {
    // Only show migration buttons if we're in development
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('replit') || window.location.hostname.includes('repl.co')) {
        // Add buttons to trigger migration manually
        const migrationDiv = document.createElement('div');
        migrationDiv.style.cssText = `
            position: fixed; 
            top: 10px; 
            right: 10px; 
            z-index: 1000; 
            background: white; 
            padding: 10px; 
            border: 1px solid #ccc; 
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;

        const migrateButton = document.createElement('button');
        migrateButton.textContent = 'Migrar para Novas Tabelas';
        migrateButton.style.cssText = 'margin: 5px; padding: 8px 12px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;';
        migrateButton.onclick = migrateToNewTables;

        const clearButton = document.createElement('button');
        clearButton.textContent = 'Limpar Tabelas';
        clearButton.style.cssText = 'margin: 5px; padding: 8px 12px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer;';
        clearButton.onclick = clearAllTables;

        const updatePricesButton = document.createElement('button');
        updatePricesButton.textContent = 'Atualizar Preços';
        updatePricesButton.style.cssText = 'margin: 5px; padding: 8px 12px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer;';
        updatePricesButton.onclick = updatePricesFromLinks;

        migrationDiv.appendChild(migrateButton);
        migrationDiv.appendChild(clearButton);
        migrationDiv.appendChild(updatePricesButton);
        document.body.appendChild(migrationDiv);
    }
});