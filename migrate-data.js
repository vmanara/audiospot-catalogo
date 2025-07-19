

// productService will be available globally from supabase-config.js

// Your existing product data for migration
const productsData = [
  {
    title: "Boss DS-1 Distortion Pedal",
    category: "pedais",
    platform: "amazon",
    price: 89.90,
    oldPrice: 120.00,
    rating: 4.5,
    reviews: 2347,
    image: "https://m.media-amazon.com/images/I/61hqzSXKvyL._AC_SX466_.jpg",
    link: "https://amazon.com.br/dp/B0002CZV8E"
  },
  {
    title: "Cabo P10 Mono 3m Monster Cable",
    category: "acessorios",
    platform: "mercadolivre",
    price: 45.90,
    oldPrice: null,
    rating: 4.8,
    reviews: 1543,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_665847-MLB32848350474_112019-F.webp",
    link: "https://produto.mercadolivre.com.br/MLB-123456789"
  },
  {
    title: "Audio Interface Focusrite Scarlett Solo",
    category: "homestudio",
    platform: "aliexpress",
    price: 299.99,
    oldPrice: 450.00,
    rating: 4.6,
    reviews: 892,
    image: "https://ae01.alicdn.com/kf/Sbb8f8c1234567890.jpg",
    link: "https://aliexpress.com/item/123456789.html"
  },
  {
    title: "Fender Player Stratocaster Pack",
    category: "audiotech",
    platform: "amazon",
    price: 2499.99,
    oldPrice: 3200.00,
    rating: 4.9,
    reviews: 456,
    image: "https://m.media-amazon.com/images/I/71ABC123DEF.jpg",
    link: "https://amazon.com.br/dp/B087CDEF123"
  },
  {
    title: "Neural DSP Archetype Nolly",
    category: "presets",
    platform: "amazon",
    price: 199.00,
    oldPrice: 250.00,
    rating: 4.7,
    reviews: 234,
    image: "https://m.media-amazon.com/images/I/61XYZ789ABC.jpg",
    link: "https://amazon.com.br/dp/B098765432"
  },
  {
    title: "TC Electronic Ditto Looper",
    category: "pedais",
    platform: "mercadolivre",
    price: 350.00,
    oldPrice: 420.00,
    rating: 4.4,
    reviews: 678,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_789012-MLB.webp",
    link: "https://produto.mercadolivre.com.br/MLB-987654321"
  },
  {
    title: "Suporte Guitarra Universal",
    category: "acessorios",
    platform: "aliexpress",
    price: 25.90,
    oldPrice: null,
    rating: 4.2,
    reviews: 1876,
    image: "https://ae01.alicdn.com/kf/H123456789.jpg",
    link: "https://aliexpress.com/item/987654321.html"
  },
  {
    title: "Shure SM57 Microfone Dinâmico",
    category: "homestudio",
    platform: "amazon",
    price: 450.00,
    oldPrice: 550.00,
    rating: 4.8,
    reviews: 3421,
    image: "https://m.media-amazon.com/images/I/41DEF456GHI.jpg",
    link: "https://amazon.com.br/dp/B000CZ0R42"
  },
  {
    title: "Marshall DSL40CR Amplificador",
    category: "audiotech",
    platform: "mercadolivre",
    price: 1899.99,
    oldPrice: 2300.00,
    rating: 4.6,
    reviews: 156,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_456789-MLB.webp",
    link: "https://produto.mercadolivre.com.br/MLB-456789123"
  },
  {
    title: "Ableton Live Suite (Download)",
    category: "presets",
    platform: "amazon",
    price: 599.00,
    oldPrice: 750.00,
    rating: 4.9,
    reviews: 89,
    image: "https://m.media-amazon.com/images/I/51GHI789JKL.jpg",
    link: "https://amazon.com.br/dp/B08ABCD1234"
  }
];

async function migrateData() {
    console.log('Starting data migration...');
    
    try {
        for (const product of productsData) {
            const result = await productService.addProduct(product);
            console.log(`Added product: ${product.title}`);
        }
        console.log('Data migration completed successfully!');
    } catch (error) {
        console.error('Error during migration:', error);
    }
}

// Make migrateData available globally
window.migrateData = migrateData;
