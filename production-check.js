
// Production compatibility check
console.log('🔍 Production Check Started');
console.log('Current URL:', window.location.href);
console.log('Environment:', {
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    isProduction: !window.location.hostname.includes('repl')
});

// Check if all required libraries are loaded
setTimeout(() => {
    console.log('📋 Library Check:');
    console.log('- Supabase available:', !!window.supabase);
    console.log('- Supabase client:', !!window.supabaseClient);
    console.log('- Product service:', !!window.productService);
    console.log('- Price extractor:', !!window.priceExtractor);
    
    if (window.supabase) {
        console.log('✅ Supabase library loaded successfully');
    } else {
        console.error('❌ Supabase library not loaded');
    }
}, 3000);
