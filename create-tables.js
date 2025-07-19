
// Script to create the separate platform tables

async function createPlatformTables() {
    console.log('🏗️ Creating platform-specific tables...');
    
    try {
        // Create AliExpress table
        const aliexpressResult = await supabaseClient.rpc('exec_sql', {
            sql: `
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
            `
        });
        
        // Create Amazon table
        const amazonResult = await supabaseClient.rpc('exec_sql', {
            sql: `
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
            `
        });
        
        // Create Mercado Livre table
        const mercadolivreResult = await supabaseClient.rpc('exec_sql', {
            sql: `
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
            `
        });
        
        console.log('✅ Platform tables created successfully!');
        
    } catch (error) {
        console.error('❌ Error creating tables:', error);
        
        // Alternative method - create tables directly with Supabase client
        console.log('🔄 Trying alternative method...');
        
        try {
            // Test if tables exist by trying to select from them
            const testResults = await Promise.allSettled([
                supabaseClient.from('aliexpress_products').select('id').limit(1),
                supabaseClient.from('amazon_products').select('id').limit(1),
                supabaseClient.from('mercadolivre_products').select('id').limit(1)
            ]);
            
            testResults.forEach((result, index) => {
                const tables = ['aliexpress_products', 'amazon_products', 'mercadolivre_products'];
                if (result.status === 'fulfilled') {
                    console.log(`✅ Table ${tables[index]} exists and is accessible`);
                } else {
                    console.log(`❌ Table ${tables[index]} needs to be created manually in Supabase dashboard`);
                    console.log(`   Error: ${result.reason?.message}`);
                }
            });
            
        } catch (testError) {
            console.error('❌ Error testing tables:', testError);
        }
    }
}

// Make function available globally
window.createPlatformTables = createPlatformTables;

// Auto-run when script loads
document.addEventListener('DOMContentLoaded', createPlatformTables);
