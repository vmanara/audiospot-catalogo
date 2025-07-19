// Supabase configuration
const supabaseUrl = 'https://kkyocjjhwmmtetfxmbha.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtreW9jampod21tdGV0ZnhtYmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjQwMzYsImV4cCI6MjA2ODUwMDAzNn0.XdGYOVvTXHlXnKXSCiIIUgfx_ngu4cpcIIvebpYDQ04'

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Database functions
const productService = {
  // Get all products
  async getAllProducts() {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')

    if (error) throw error
    return data || []
  },

  // Get products by category
  async getProductsByCategory(category) {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .eq('category', category)

    if (error) throw error
    return data || []
  },

  // Get products by platform
  async getProductsByPlatform(platform) {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .eq('platform', platform)

    if (error) throw error
    return data || []
  },

  // Search products
  async searchProducts(searchTerm) {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .ilike('title', `%${searchTerm}%`)

    if (error) throw error
    return data || []
  },

  // Add new product
  async addProduct(product) {
    const { data, error } = await supabaseClient
      .from('products')
      .insert([product])
      .select()

    if (error) throw error
    return data
  },

  // Update product
  async updateProduct(id, updates) {
    const { data, error } = await supabaseClient
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    return data
  },

  // Delete product
  async deleteProduct(id) {
    const { error } = await supabaseClient
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  }
}