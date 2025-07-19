
// Supabase configuration
const supabaseUrl = 'https://kkyocjjhwmmtetfxmbha.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtreW9jampod21tdGV0ZnhtYmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjQwMzYsImV4cCI6MjA2ODUwMDAzNn0.XdGYOVvTXHlXnKXSCiIIUgfx_ngu4cpcIIvebpYDQ04'

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

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
    try {
      const [aliexpressData, amazonData, mercadolivreData] = await Promise.all([
        this.getProductsByPlatform('aliexpress'),
        this.getProductsByPlatform('amazon'),
        this.getProductsByPlatform('mercadolivre')
      ]);

      // Combine all products and add platform field
      const allProducts = [
        ...aliexpressData.map(p => ({ ...p, platform: 'aliexpress' })),
        ...amazonData.map(p => ({ ...p, platform: 'amazon' })),
        ...mercadolivreData.map(p => ({ ...p, platform: 'mercadolivre' }))
      ];

      return allProducts;
    } catch (error) {
      console.error('Error getting all products:', error);
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
