The code adds new product listings to the `pedais` category within the `mockProducts` object, including Valeton GP-5, Kokko Distortion Pedal, Afinador Mini Pedal Kokko, Hotone Expression Pedal, and Ampero II Multi-Effects, complete with their respective affiliate links and details.
```

```replit_final_file
// Enhanced mock data with more products for better showcase
const mockProducts = {
    pedais: [
        {
            id: 1,
            title: "Boss DS-1 Distortion Pedal",
            price: 89.99,
            oldPrice: 120.00,
            image: "https://via.placeholder.com/220x160/667eea/ffffff?text=Boss+DS-1",
            platform: "aliexpress",
            rating: 4.5,
            reviews: 234,
            affiliate_link: "https://aliexpress.com/item/boss-ds1",
            featured: true,
            trending: false,
            bestseller: false
        },
        {
            id: 2,
            title: "Tube Screamer TS9 Clone",
            price: 45.99,
            oldPrice: 65.00,
            image: "https://via.placeholder.com/220x160/764ba2/ffffff?text=TS9+Clone",
            platform: "amazon",
            rating: 4.2,
            reviews: 156,
            affiliate_link: "https://amazon.com/tube-screamer",
            featured: false,
            trending: true,
            bestseller: false
        },
        {
            id: 11,
            title: "Delay Pedal Digital",
            price: 129.99,
            oldPrice: 180.00,
            image: "https://via.placeholder.com/220x160/e74c3c/ffffff?text=Delay",
            platform: "aliexpress",
            rating: 4.6,
            reviews: 89,
            affiliate_link: "https://aliexpress.com/delay",
            featured: false,
            trending: false,
            bestseller: true
        },
        {
            id: 17,
            title: "Valeton GP-5 Multi-Effects",
            price: 189.99,
            oldPrice: 249.00,
            image: "https://via.placeholder.com/220x160/27ae60/ffffff?text=Valeton+GP5",
            platform: "aliexpress",
            rating: 4.6,
            reviews: 342,
            affiliate_link: "https://s.click.aliexpress.com/e/_okGjNtC",
            featured: true,
            trending: false,
            bestseller: false
        },
        {
            id: 18,
            title: "Kokko Distortion Pedal",
            price: 35.99,
            oldPrice: 55.00,
            image: "https://via.placeholder.com/220x160/e74c3c/ffffff?text=Kokko+Distortion",
            platform: "aliexpress",
            rating: 4.3,
            reviews: 287,
            affiliate_link: "https://s.click.aliexpress.com/e/_oprO7T8",
            featured: false,
            trending: true,
            bestseller: false
        },
        {
            id: 19,
            title: "Afinador Mini Pedal Kokko",
            price: 29.99,
            oldPrice: 45.00,
            image: "https://via.placeholder.com/220x160/3498db/ffffff?text=Afinador+Kokko",
            platform: "aliexpress",
            rating: 4.5,
            reviews: 156,
            affiliate_link: "https://s.click.aliexpress.com/e/_oDBUPWi",
            featured: false,
            trending: false,
            bestseller: true
        },
        {
            id: 20,
            title: "Hotone Expression Pedal",
            price: 79.99,
            oldPrice: 99.00,
            image: "https://via.placeholder.com/220x160/9b59b6/ffffff?text=Hotone+Expression",
            platform: "aliexpress",
            rating: 4.4,
            reviews: 89,
            affiliate_link: "https://s.click.aliexpress.com/e/_oEeF0c2",
            featured: false,
            trending: false,
            bestseller: false
        },
        {
            id: 21,
            title: "Ampero II Multi-Effects",
            price: 299.99,
            oldPrice: 399.00,
            image: "https://via.placeholder.com/220x160/e67e22/ffffff?text=Ampero+II",
            platform: "aliexpress",
            rating: 4.7,
            reviews: 234,
            affiliate_link: "https://s.click.aliexpress.com/e/_o2ew7Rc",
            featured: true,
            trending: false,
            bestseller: true
        }
    ],
    acessorios: [
        {
            id: 3,
            title: "Kit 20 Palhetas Profissionais",
            price: 15.99,
            oldPrice: 25.00,
            image: "https://via.placeholder.com/220x160/e74c3c/ffffff?text=Palhetas",
            platform: "mercadolivre",
            rating: 4.8,
            reviews: 892,
            affiliate_link: "https://mercadolivre.com/palhetas",
            featured: false,
            trending: true,
            bestseller: false
        },
        {
            id: 4,
            title: "Capo Guitarra Premium",
            price: 22.50,
            oldPrice: 35.00,
            image: "https://via.placeholder.com/220x160/3498db/ffffff?text=Capo",
            platform: "aliexpress",
            rating: 4.6,
            reviews: 445,
            affiliate_link: "https://aliexpress.com/capo",
            featured: true,
            trending: false,
            bestseller: false
        },
        {
            id: 12,
            title: "Cordas Guitarra Elétrica",
            price: 28.99,
            oldPrice: 40.00,
            image: "https://via.placeholder.com/220x160/2ecc71/ffffff?text=Cordas",
            platform: "amazon",
            rating: 4.4,
            reviews: 567,
            affiliate_link: "https://amazon.com/cordas",
            featured: false,
            trending: false,
            bestseller: true
        }
    ],
    homestudio: [
        {
            id: 5,
            title: "Interface Audio USB Behringer",
            price: 299.99,
            oldPrice: 399.00,
            image: "https://via.placeholder.com/220x160/2ecc71/ffffff?text=Interface",
            platform: "amazon",
            rating: 4.4,
            reviews: 678,
            affiliate_link: "https://amazon.com/behringer-interface",
            featured: true,
            trending: false,
            bestseller: false
        },
        {
            id: 6,
            title: "Microfone Condensador BM800",
            price: 129.99,
            oldPrice: 180.00,
            image: "https://via.placeholder.com/220x160/f39c12/ffffff?text=BM800",
            platform: "aliexpress",
            rating: 4.3,
            reviews: 1234,
            affiliate_link: "https://aliexpress.com/bm800",
            featured: false,
            trending: true,
            bestseller: false
        },
        {
            id: 13,
            title: "Mesa de Som 8 Canais",
            price: 189.99,
            oldPrice: 250.00,
            image: "https://via.placeholder.com/220x160/9b59b6/ffffff?text=Mesa+Som",
            platform: "mercadolivre",
            rating: 4.5,
            reviews: 234,
            affiliate_link: "https://mercadolivre.com/mesa-som",
            featured: false,
            trending: false,
            bestseller: true
        }
    ],
    audiotech: [
        {
            id: 7,
            title: "Monitor Referência KRK Rokit 5",
            price: 899.99,
            oldPrice: 1200.00,
            image: "https://via.placeholder.com/220x160/9b59b6/ffffff?text=KRK+Rokit",
            platform: "amazon",
            rating: 4.7,
            reviews: 342,
            affiliate_link: "https://amazon.com/krk-rokit",
            featured: true,
            trending: false,
            bestseller: false
        },
        {
            id: 8,
            title: "Fones Studio Profissional",
            price: 199.99,
            oldPrice: 280.00,
            image: "https://via.placeholder.com/220x160/34495e/ffffff?text=Headphones",
            platform: "mercadolivre",
            rating: 4.5,
            reviews: 567,
            affiliate_link: "https://mercadolivre.com/fones",
            featured: false,
            trending: true,
            bestseller: false
        },
        {
            id: 14,
            title: "Amplificador Valvulado",
            price: 599.99,
            oldPrice: 800.00,
            image: "https://via.placeholder.com/220x160/e67e22/ffffff?text=Amplificador",
            platform: "aliexpress",
            rating: 4.6,
            reviews: 123,
            affiliate_link: "https://aliexpress.com/amplificador",
            featured: false,
            trending: false,
            bestseller: true
        }
    ],
    presets: [
        {
            id: 9,
            title: "Pack 500 Presets Guitar Rig",
            price: 39.99,
            oldPrice: 60.00,
            image: "https://via.placeholder.com/220x160/e67e22/ffffff?text=Presets",
            platform: "aliexpress",
            rating: 4.9,
            reviews: 123,
            affiliate_link: "https://aliexpress.com/presets",
            featured: false,
            trending: true,
            bestseller: false
        },
        {
            id: 10,
            title: "Neural DSP Archetype Nolly",
            price: 149.99,
            oldPrice: 179.00,
            image: "https://via.placeholder.com/220x160/16a085/ffffff?text=Neural+DSP",
            platform: "amazon",
            rating: 4.8,
            reviews: 89,
            affiliate_link: "https://amazon.com/neural-dsp",
            featured: true,
            trending: false,
            bestseller: false
        },
        {
            id: 15,
            title: "Ableton Live Suite",
            price: 599.99,
            oldPrice: 749.00,
            image: "https://via.placeholder.com/220x160/1abc9c/ffffff?text=Ableton",
            platform: "amazon",
            rating: 4.9,
            reviews: 456,
            affiliate_link: "https://amazon.com/ableton",
            featured: false,
            trending: false,
            bestseller: true
        }
    ]
};

class ProductCatalog {
    constructor() {
        this.products = mockProducts;
        this.currentFilters = {
            platform: 'all',
            search: '',
            sort: 'default'
        };
        this.apiEndpoints = {
            aliexpress: 'https://api.aliexpress.com/products',
            amazon: 'https://api.amazon.com/products', 
            mercadolivre: 'https://api.mercadolivre.com/products'
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderAllProducts();
        this.renderSpecialSections();
        this.hideLoading();
    }

    setupEventListeners() {
        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.filterProducts();
        });

        // Platform filter
        document.getElementById('platformFilter').addEventListener('change', (e) => {
            this.currentFilters.platform = e.target.value;
            this.filterProducts();
        });

        // Sort filter
        document.getElementById('sortFilter').addEventListener('change', (e) => {
            this.currentFilters.sort = e.target.value;
            this.filterAndSortProducts();
        });

        // Category cards navigation
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.scrollToCategory(category);
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    renderAllProducts() {
        Object.keys(this.products).forEach(category => {
            this.renderCategory(category);
        });
    }

    renderSpecialSections() {
        this.renderFeatured();
        this.renderTrending();
        this.renderBestsellers();
    }

    renderFeatured() {
        const container = document.getElementById('featuredProducts');
        if (!container) return;

        const featuredProducts = this.getAllProducts().filter(p => p.featured);
        this.renderProductsInContainer(container, featuredProducts);
    }

    renderTrending() {
        const container = document.getElementById('trendingProducts');
        if (!container) return;

        const trendingProducts = this.getAllProducts().filter(p => p.trending);
        this.renderProductsInContainer(container, trendingProducts);
    }

    renderBestsellers() {
        const container = document.getElementById('bestsellerProducts');
        if (!container) return;

        const bestsellerProducts = this.getAllProducts().filter(p => p.bestseller);
        this.renderProductsInContainer(container, bestsellerProducts);
    }

    renderProductsInContainer(container, products) {
        container.innerHTML = '';
        products.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });
    }

    getAllProducts() {
        let allProducts = [];
        Object.values(this.products).forEach(categoryProducts => {
            allProducts = allProducts.concat(categoryProducts);
        });
        return allProducts;
    }

    renderCategory(category) {
        const container = document.querySelector(`[data-category="${category}"]`);
        if (!container) return;

        const products = this.products[category];
        container.innerHTML = '';

        products.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });

        // Update product count
        this.updateProductCount(category, products.length);
    }

    updateProductCount(category, count) {
        const countElement = document.querySelector(`.product-count[data-category="${category}"]`);
        if (countElement) {
            countElement.textContent = `${count} produto${count !== 1 ? 's' : ''}`;
        }
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.platform = product.platform;
        card.dataset.price = product.price;
        card.dataset.rating = product.rating;

        const platformClass = `platform-${product.platform}`;
        const platformName = this.getPlatformName(product.platform);
        const stars = this.generateStars(product.rating);
        const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

        card.dataset.discount = discount;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            <div class="product-info">
                <span class="product-platform ${platformClass}">${platformName}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    R$ ${product.price.toFixed(2)}
                    ${product.oldPrice ? `<span class="product-old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span>(${product.reviews})</span>
                </div>
                <a href="${product.affiliate_link}" target="_blank" rel="noopener" class="product-link">
                    Ver Produto ${discount > 0 ? `- ${discount}% OFF` : ''}
                </a>
            </div>
        `;

        return card;
    }

    getPlatformName(platform) {
        const platforms = {
            aliexpress: 'AliExpress',
            amazon: 'Amazon',
            mercadolivre: 'Mercado Livre'
        };
        return platforms[platform] || platform;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    filterProducts() {
        const allCards = document.querySelectorAll('.product-card');
        const visibleCounts = {};

        allCards.forEach(card => {
            let shouldShow = true;
            const cardTitle = card.querySelector('.product-title').textContent.toLowerCase();

            // Search filter
            if (this.currentFilters.search && !cardTitle.includes(this.currentFilters.search)) {
                shouldShow = false;
            }

            // Platform filter
            if (this.currentFilters.platform !== 'all') {
                if (card.dataset.platform !== this.currentFilters.platform) {
                    shouldShow = false;
                }
            }

            card.style.display = shouldShow ? 'block' : 'none';

            // Count visible products by category
            if (shouldShow) {
                const categoryContainer = card.closest('.products-grid');
                if (categoryContainer) {
                    const category = categoryContainer.dataset.category;
                    if (category) {
                        visibleCounts[category] = (visibleCounts[category] || 0) + 1;
                    }
                }
            }
        });

        // Update counters
        Object.keys(this.products).forEach(category => {
            this.updateProductCount(category, visibleCounts[category] || 0);
        });
    }

    filterAndSortProducts() {
        this.filterProducts();
        if (this.currentFilters.sort !== 'default') {
            this.sortProducts();
        }
    }

    sortProducts() {
        Object.keys(this.products).forEach(category => {
            const container = document.querySelector(`[data-category="${category}"]`);
            if (!container) return;

            const cards = Array.from(container.querySelectorAll('.product-card:not([style*="display: none"])'));

            cards.sort((a, b) => {
                const priceA = parseFloat(a.dataset.price);
                const priceB = parseFloat(b.dataset.price);
                const ratingA = parseFloat(a.dataset.rating || 0);
                const ratingB = parseFloat(b.dataset.rating || 0);

                switch (this.currentFilters.sort) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'rating':
                        return ratingB - ratingA;
                    case 'discount':
                        const discountA = parseFloat(a.dataset.discount || 0);
                        const discountB = parseFloat(b.dataset.discount || 0);
                        return discountB - discountA;
                    default:
                        return 0;
                }
            });

            // Reorder cards in container
            cards.forEach(card => container.appendChild(card));
        });
    }

    scrollToCategory(category) {
        const element = document.getElementById(category);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 1000);
        }
    }

    // Sistema de API para automatizar produtos
    async fetchProductsFromAPI(platform, category, keywords) {
        try {
            const response = await fetch(`${this.apiEndpoints[platform]}?category=${category}&q=${keywords}&limit=20`);
            const data = await response.json();
            return this.normalizeAPIProducts(data, platform);
        } catch (error) {
            console.error(`Erro ao buscar produtos do ${platform}:`, error);
            return [];
        }
    }

    normalizeAPIProducts(apiData, platform) {
        // Normaliza dados de diferentes APIs para o formato padrão
        return apiData.products?.map((item, index) => ({
            id: Date.now() + index,
            title: item.title || item.name,
            price: parseFloat(item.price || item.current_price),
            oldPrice: parseFloat(item.original_price || item.old_price),
            image: item.image_url || item.thumbnail,
            platform: platform,
            rating: parseFloat(item.rating || 4.0),
            reviews: parseInt(item.review_count || Math.floor(Math.random() * 500) + 50),
            affiliate_link: item.affiliate_url || item.url,
            featured: false,
            trending: Math.random() > 0.8,
            bestseller: Math.random() > 0.9
        })) || [];
    }

    async loadProductsFromAPI(category, keywords) {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'flex';

        try {
            // Busca produtos de todas as plataformas em paralelo
            const promises = Object.keys(this.apiEndpoints).map(platform => 
                this.fetchProductsFromAPI(platform, category, keywords)
            );

            const results = await Promise.all(promises);
            const newProducts = results.flat();

            // Adiciona novos produtos à categoria
            if (!this.products[category]) {
                this.products[category] = [];
            }

            this.products[category] = [...this.products[category], ...newProducts];
            this.renderCategory(category);
            this.renderSpecialSections();

            console.log(`${newProducts.length} produtos adicionados à categoria ${category}`);
        } catch (error) {
            console.error('Erro ao carregar produtos da API:', error);
        } finally {
            this.hideLoading();
        }
    }

    // Configuração de API Keys (usar com Replit Secrets)
    setAPIKeys(keys) {
        this.apiKeys = keys;
        // Adiciona autenticação às requisições
        Object.keys(this.apiEndpoints).forEach(platform => {
            if (keys[platform]) {
                this.apiEndpoints[platform] += `?api_key=${keys[platform]}`;
            }
        });
    }

    // Agendamento automático de atualização de produtos
    scheduleProductUpdates() {
        // Atualiza produtos a cada 6 horas
        setInterval(() => {
            Object.keys(this.products).forEach(category => {
                const keywords = this.getCategoryKeywords(category);
                this.loadProductsFromAPI(category, keywords);
            });
        }, 6 * 60 * 60 * 1000);
    }

    getCategoryKeywords(category) {
        const keywords = {
            pedais: 'guitar pedal effects distortion delay reverb',
            acessorios: 'guitar pick capo strings accessories',
            homestudio: 'audio interface microphone studio monitor',
            audiotech: 'headphones amplifier audio equipment',
            presets: 'guitar presets plugins vst effects'
        };
        return keywords[category] || category;
    }
}

// Sistema de gerenciamento de produtos via API
class ProductManager {
    constructor(catalog) {
        this.catalog = catalog;
        this.setupAPIControls();
    }

    setupAPIControls() {
        // Cria painel de controle para APIs (opcional)
        if (window.location.search.includes('admin=true')) {
            this.createAdminPanel();
        }
    }

    createAdminPanel() {
        const adminPanel = document.createElement('div');
        adminPanel.innerHTML = `
            <div style="position: fixed; top: 10px; right: 10px; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 1000; max-width: 300px;">
                <h3>Painel Admin - API</h3>
                <select id="apiCategory">
                    <option value="pedais">Pedais & Efeitos</option>
                    <option value="acessorios">Acessórios</option>
                    <option value="homestudio">Home Studio</option>
                    <option value="audiotech">Audio Tech</option>
                    <option value="presets">Presets & Plugins</option>
                </select>
                <input type="text" id="apiKeywords" placeholder="Palavras-chave..." style="width: 100%; margin: 0.5rem 0; padding: 0.5rem;">
                <button id="loadFromAPI" style="width: 100%; padding: 0.5rem; background: #ff6b35; color: white; border: none; border-radius: 4px;">Carregar da API</button>
                <button id="toggleAdmin" style="width: 100%; padding: 0.5rem; background: #666; color: white; border: none; border-radius: 4px; margin-top: 0.5rem;">Fechar</button>
            </div>
        `;
        document.body.appendChild(adminPanel);

        document.getElementById('loadFromAPI').addEventListener('click', () => {
            const category = document.getElementById('apiCategory').value;
            const keywords = document.getElementById('apiKeywords').value || this.catalog.getCategoryKeywords(category);
            this.catalog.loadProductsFromAPI(category, keywords);
        });

        document.getElementById('toggleAdmin').addEventListener('click', () => {
            adminPanel.remove();
        });
    }

    // Método para adicionar produto individual via API
    async addSingleProduct(productData) {
        const product = {
            id: Date.now(),
            title: productData.title,
            price: productData.price,
            oldPrice: productData.oldPrice,
            image: productData.image,
            platform: productData.platform,
            rating: productData.rating || 4.0,
            reviews: productData.reviews || 100,
            affiliate_link: productData.affiliate_link,
            featured: productData.featured || false,
            trending: productData.trending || false,
            bestseller: productData.bestseller || false
        };

        if (!this.catalog.products[productData.category]) {
            this.catalog.products[productData.category] = [];
        }

        this.catalog.products[productData.category].push(product);
        this.catalog.renderCategory(productData.category);
        this.catalog.renderSpecialSections();

        return product;
    }
}

// Initialize the catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const catalog = new ProductCatalog();
    const productManager = new ProductManager(catalog);

    // Configurar API keys se disponíveis (usar Replit Secrets)
    if (typeof window !== 'undefined' && window.REPLIT_DB_URL) {
        // As API keys devem ser configuradas via Replit Secrets
        fetch('/api/get-keys')
            .then(response => response.json())
            .then(keys => catalog.setAPIKeys(keys))
            .catch(console.error);
    }

    // Expor para uso global (opcional)
    window.ProductCatalog = catalog;
    window.ProductManager = productManager;
});