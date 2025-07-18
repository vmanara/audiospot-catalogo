
// Exemplos de como usar o sistema de API

// 1. Carregar produtos automaticamente ao inicializar
document.addEventListener('DOMContentLoaded', async () => {
    const catalog = window.ProductCatalog;
    const manager = window.ProductManager;
    
    // Carregar produtos iniciais de cada categoria
    const categories = ['pedais', 'acessorios', 'homestudio', 'audiotech', 'presets'];
    
    for (const category of categories) {
        await catalog.loadProductsFromAPI(category);
        // Aguarda 1 segundo entre requisições para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
});

// 2. Adicionar produto individual
async function addCustomProduct() {
    const manager = window.ProductManager;
    
    const productData = {
        title: "Boss DD-7 Digital Delay",
        price: 159.99,
        oldPrice: 199.99,
        image: "https://example.com/boss-dd7.jpg",
        platform: "amazon",
        rating: 4.8,
        reviews: 245,
        affiliate_link: "https://amazon.com/boss-dd7",
        category: "pedais",
        featured: true
    };
    
    await manager.addSingleProduct(productData);
}

// 3. Atualizar produtos de uma categoria específica
async function updateCategoryProducts(category) {
    const catalog = window.ProductCatalog;
    await catalog.loadProductsFromAPI(category);
}

// 4. Configurar API keys via Replit Secrets
function configureAPIKeys() {
    const catalog = window.ProductCatalog;
    
    // Estas chaves devem ser configuradas via Replit Secrets
    const apiKeys = {
        aliexpress: process.env.ALIEXPRESS_API_KEY,
        amazon: process.env.AMAZON_API_KEY,
        mercadolivre: process.env.MERCADOLIVRE_API_KEY
    };
    
    catalog.setAPIKeys(apiKeys);
}

// 5. Webhook para receber produtos externos
async function handleWebhook(productData) {
    const manager = window.ProductManager;
    
    try {
        const normalizedProduct = {
            ...productData,
            id: Date.now(),
            rating: productData.rating || 4.0,
            reviews: productData.reviews || 100
        };
        
        await manager.addSingleProduct(normalizedProduct);
        console.log('Produto adicionado via webhook:', normalizedProduct.title);
    } catch (error) {
        console.error('Erro ao processar webhook:', error);
    }
}

// 6. Função para exportar produtos (backup)
function exportProducts() {
    const catalog = window.ProductCatalog;
    const exportData = {
        timestamp: new Date().toISOString(),
        products: catalog.products
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], 
        { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `products-backup-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
}

// 7. Função para importar produtos
async function importProducts(file) {
    const manager = window.ProductManager;
    
    try {
        const text = await file.text();
        const data = JSON.parse(text);
        
        for (const [category, products] of Object.entries(data.products)) {
            for (const product of products) {
                await manager.addSingleProduct({
                    ...product,
                    category
                });
            }
        }
        
        console.log('Produtos importados com sucesso');
    } catch (error) {
        console.error('Erro ao importar produtos:', error);
    }
}

// Exemplo de uso com formulário HTML
function createProductForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <h3>Adicionar Produto Manual</h3>
        <input name="title" placeholder="Título" required>
        <input name="price" type="number" step="0.01" placeholder="Preço" required>
        <input name="oldPrice" type="number" step="0.01" placeholder="Preço Anterior">
        <input name="image" placeholder="URL da Imagem" required>
        <select name="platform" required>
            <option value="aliexpress">AliExpress</option>
            <option value="amazon">Amazon</option>
            <option value="mercadolivre">Mercado Livre</option>
        </select>
        <select name="category" required>
            <option value="pedais">Pedais & Efeitos</option>
            <option value="acessorios">Acessórios</option>
            <option value="homestudio">Home Studio</option>
            <option value="audiotech">Audio Tech</option>
            <option value="presets">Presets & Plugins</option>
        </select>
        <input name="affiliate_link" placeholder="Link Afiliado" required>
        <button type="submit">Adicionar Produto</button>
    `;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const productData = Object.fromEntries(formData);
        
        productData.price = parseFloat(productData.price);
        productData.oldPrice = productData.oldPrice ? parseFloat(productData.oldPrice) : null;
        
        await window.ProductManager.addSingleProduct(productData);
        form.reset();
    });
    
    return form;
}
