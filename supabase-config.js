// Supabase configuration
const supabaseUrl = 'https://kkyocjjhwmmtetfxmbha.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtreW9jampod21tdGV0ZnhtYmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjQwMzYsImV4cCI6MjA2ODUwMDAzNn0.XdGYOVvTXHlXnKXSCiIIUgfx_ngu4cpcIIvebpYDQ04'

// Wait for window.supabase to be available
let supabaseClient = null;

function initSupabase() {
  if (typeof window !== 'undefined' && window.supabase && window.supabase.createClient) {
    try {
      supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
      console.log('✅ Supabase client initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Error initializing Supabase client:', error);
      return false;
    }
  }
  return false;
}

// Multiple initialization attempts for better compatibility
function attemptInitialization(attempts = 0) {
  if (attempts >= 20) {
    console.error('❌ Supabase library not available after all attempts');
    return;
  }

  if (initSupabase()) {
    console.log('✅ Supabase initialized successfully!');
    return;
  }

  // Try again after delay
  setTimeout(() => {
    attemptInitialization(attempts + 1);
  }, 500);
}

// Start initialization attempts
attemptInitialization();

// Database functions
const productService = {
  // Get table name based on platform
  getTableName(platform) {
    const platformLower = platform?.toLowerCase();
    switch(platformLower) {
      case 'aliexpress':
        return 'aliexpress_products';
      case 'amazon':
        return 'amazon_products';
      case 'mercadolivre':
      case 'mercado livre':
        return 'mercadolivre_products';
      default:
        return 'aliexpress_products'; // fallback
    }
  },

  // Get all products from all platforms
  async getAllProducts() {
    if (!supabaseClient) {
      console.error('Supabase client not initialized');
      return [];
    }

    try {
      console.log('🔍 Fetching products from all platforms...');

      const [aliexpressResult, amazonResult, mercadolivreResult] = await Promise.allSettled([
        supabaseClient.from('aliexpress_products').select('*'),
        supabaseClient.from('amazon_products').select('*'),
        supabaseClient.from('mercadolivre_products').select('*')
      ]);

      let allProducts = [];

      // Process AliExpress products
      if (aliexpressResult.status === 'fulfilled') {
        if (aliexpressResult.value.error) {
          console.error('Error fetching AliExpress products:', aliexpressResult.value.error);
        } else if (aliexpressResult.value.data) {
          const aliexpressProducts = aliexpressResult.value.data.map(product => ({
            ...product,
            platform: 'aliexpress'
          }));
          allProducts = allProducts.concat(aliexpressProducts);
          console.log(`✅ Loaded ${aliexpressProducts.length} AliExpress products`);
        }
      } else {
        console.error('AliExpress query failed:', aliexpressResult.reason);
      }

      // Process Amazon products
      if (amazonResult.status === 'fulfilled') {
        if (amazonResult.value.error) {
          console.error('Error fetching Amazon products:', amazonResult.value.error);
        } else if (amazonResult.value.data) {
          const amazonProducts = amazonResult.value.data.map(product => ({
            ...product,
            platform: 'amazon'
          }));
          allProducts = allProducts.concat(amazonProducts);
          console.log(`✅ Loaded ${amazonProducts.length} Amazon products`);
        }
      } else {
        console.error('Amazon query failed:', amazonResult.reason);
      }

      // Process Mercado Livre products
      if (mercadolivreResult.status === 'fulfilled') {
        if (mercadolivreResult.value.error) {
          console.error('Error fetching Mercado Livre products:', mercadolivreResult.value.error);
        } else if (mercadolivreResult.value.data) {
          const mercadolivreProducts = mercadolivreResult.value.data.map(product => ({
            ...product,
            platform: 'mercadolivre'
          }));
          allProducts = allProducts.concat(mercadolivreProducts);
          console.log(`✅ Loaded ${mercadolivreProducts.length} Mercado Livre products`);
        }
      } else {
        console.error('Mercado Livre query failed:', mercadolivreResult.reason);
      }

      console.log(`📊 Total products loaded: ${allProducts.length}`);
      return allProducts;
    } catch (error) {
      console.error('❌ Error getting all products:', error);
      return [];
    }
  },

  // Get products by platform
  async getProductsByPlatform(platform) {
    const tableName = this.getTableName(platform);

    const { data, error } = await supabaseClient
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error getting products from ${tableName}:`, error);
      return [];
    }
    return data || [];
  },

  // Get products by category from specific platform
  async getProductsByCategory(category, platform = null) {
    if (platform) {
      const tableName = this.getTableName(platform);
      const { data, error } = await supabaseClient
        .from(tableName)
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`Error getting products by category from ${tableName}:`, error);
        return [];
      }
      return data?.map(p => ({ ...p, platform })) || [];
    } else {
      // Get from all platforms
      try {
        const [aliexpressData, amazonData, mercadolivreData] = await Promise.all([
          this.getProductsByCategory(category, 'aliexpress'),
          this.getProductsByCategory(category, 'amazon'),
          this.getProductsByCategory(category, 'mercadolivre')
        ]);

        return [
          ...aliexpressData,
          ...amazonData,
          ...mercadolivreData
        ];
      } catch (error) {
        console.error('Error getting products by category from all platforms:', error);
        return [];
      }
    }
  },

  // Search products in specific platform or all platforms
  async searchProducts(searchTerm, platform = null) {
    if (platform) {
      const tableName = this.getTableName(platform);
      const { data, error } = await supabaseClient
        .from(tableName)
        .select('*')
        .ilike('title', `%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`Error searching products in ${tableName}:`, error);
        return [];
      }
      return data?.map(p => ({ ...p, platform })) || [];
    } else {
      // Search in all platforms
      try {
        const [aliexpressData, amazonData, mercadolivreData] = await Promise.all([
          this.searchProducts(searchTerm, 'aliexpress'),
          this.searchProducts(searchTerm, 'amazon'),
          this.searchProducts(searchTerm, 'mercadolivre')
        ]);

        return [
          ...aliexpressData,
          ...amazonData,
          ...mercadolivreData
        ];
      } catch (error) {
        console.error('Error searching products in all platforms:', error);
        return [];
      }
    }
  },

  // Add new product to specific platform table
  async addProduct(product, platform) {
    const tableName = this.getTableName(platform);

    // Remove platform from product object since it's determined by table
    const { platform: _, ...productData } = product;

    const { data, error } = await supabaseClient
      .from(tableName)
      .insert([productData])
      .select();

    if (error) {
      console.error(`Error adding product to ${tableName}:`, error);
      throw error;
    }
    return data;
  },

  // Update product in specific platform table
  async updateProduct(id, updates, platform) {
    const tableName = this.getTableName(platform);

    // Remove platform from updates object
    const { platform: _, ...updateData } = updates;

    const { data, error } = await supabaseClient
      .from(tableName)
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error(`Error updating product in ${tableName}:`, error);
      throw error;
    }
    return data;
  },

  // Delete product from specific platform table
  async deleteProduct(id, platform) {
    const tableName = this.getTableName(platform);

    const { error } = await supabaseClient
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting product from ${tableName}:`, error);
      throw error;
    }
    return true;
  },

  // Update prices from affiliate links
  async updatePricesFromLinks() {
    if (!window.priceExtractor) {
      console.error('Price extractor not available');
      return;
    }

    console.log('🔄 Updating prices from affiliate links...');

    try {
      const allProducts = await this.getAllProducts();
      const updatePromises = [];

      for (const product of allProducts) {
        if (product.link && product.platform) {
          console.log(`📋 Checking price for: ${product.title}`);

          try {
            const priceData = await window.priceExtractor.getPriceInBRL(product.link, product.platform);

            if (priceData && priceData.price > 0) {
              const roundedPrice = Math.round(priceData.price * 100) / 100;
              console.log(`💰 Found price for ${product.title}: R$ ${roundedPrice}`);

              const updatePromise = this.updateProduct(product.id, { 
                price: roundedPrice 
              }, product.platform);

              updatePromises.push(updatePromise);
            } else {
              console.log(`❌ No price found for: ${product.title}`);
            }

            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (error) {
            console.error(`Error updating price for ${product.title}:`, error);
          }
        }
      }

      // Wait for all updates to complete
      await Promise.all(updatePromises);
      console.log('✅ Price update completed!');

      return true;
    } catch (error) {
      console.error('❌ Error updating prices from links:', error);
      return false;
    }
  },

  // Migrate existing products from old table to new tables
  async migrateExistingProducts() {
    try {
      // Get all products from old table
      const { data: oldProducts, error } = await supabaseClient
        .from('products')
        .select('*');

      if (error) {
        console.error('Error getting products from old table:', error);
        return;
      }

      if (!oldProducts || oldProducts.length === 0) {
        console.log('No products to migrate');
        return;
      }

      // Group products by platform
      const productsByPlatform = {
        aliexpress: [],
        amazon: [],
        mercadolivre: []
      };

      oldProducts.forEach(product => {
        const platform = product.platform?.toLowerCase();
        if (productsByPlatform[platform]) {
          // Remove platform and id from product before inserting
          const { platform: _, id, ...productData } = product;
          productsByPlatform[platform].push(productData);
        }
      });

      // Insert products into new tables
      const promises = [];

      if (productsByPlatform.aliexpress.length > 0) {
        promises.push(
          supabaseClient.from('aliexpress_products').insert(productsByPlatform.aliexpress)
        );
      }

      if (productsByPlatform.amazon.length > 0) {
        promises.push(
          supabaseClient.from('amazon_products').insert(productsByPlatform.amazon)
        );
      }

      if (productsByPlatform.mercadolivre.length > 0) {
        promises.push(
          supabaseClient.from('mercadolivre_products').insert(productsByPlatform.mercadolivre)
        );
      }

      await Promise.all(promises);
      console.log('Migration completed successfully!');

    } catch (error) {
      console.error('Error during migration:', error);
    }
  }
}