// Cache for products
let productsCache = null;

// Check if Supabase is available
if (!window.supabase) {
    console.error('Supabase library not loaded. Products will not be available.');
}

class AudioSpotApp {
    constructor() {
        this.currentCategory = 'all';
        this.currentPlatform = 'all';
        this.currentSort = 'default';
        this.searchTerm = '';
        this.visibleProducts = 6;
        this.products = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadProducts();
        this.renderProducts();
        this.initAnimations();
    }

    async loadProducts() {
        try {
            // Wait for Supabase client to be available with more retries
            let retries = 0;
            while ((!supabaseClient || !window.productService) && retries < 30) {
                console.log(`Waiting for Supabase client... (attempt ${retries + 1})`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                retries++;
            }

            if (!supabaseClient) {
                console.error('Supabase client not available after retries');
                // Show a message to user
                this.showConnectionError();
                this.products = [];
                return;
            }

            if (!window.productService) {
                console.error('Product service not available');
                this.products = [];
                return;
            }

            console.log('🔄 Loading products from Supabase...');
            this.products = await productService.getAllProducts();
            console.log('✅ Products loaded from Supabase:', this.products.length, 'products');

            // If no products found, try multiple times
            if (this.products.length === 0) {
                console.log('No products found, retrying multiple times...');
                
                for (let attempt = 1; attempt <= 3; attempt++) {
                    await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
                    try {
                        this.products = await productService.getAllProducts();
                        console.log(`Retry attempt ${attempt} results:`, this.products.length, 'products');
                        if (this.products.length > 0) {
                            this.renderProducts();
                            break;
                        }
                    } catch (retryError) {
                        console.error(`Retry attempt ${attempt} failed:`, retryError);
                    }
                }
                
                if (this.products.length === 0) {
                    this.showNoProductsMessage();
                }
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.showConnectionError();
            this.products = [];
        }
    }

    showConnectionError() {
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
                    <h3>❌ Erro de Conexão</h3>
                    <p>Não foi possível conectar ao banco de dados.</p>
                    <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 10px;">
                        🔄 Tentar Novamente
                    </button>
                </div>
            `;
        }
    }

    showNoProductsMessage() {
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
                    <h3>📦 Nenhum Produto Encontrado</h3>
                    <p>Os produtos estão sendo carregados...</p>
                    <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 10px;">
                        🔄 Recarregar
                    </button>
                </div>
            `;
        }
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href');
                this.scrollToSection(target);
                this.updateActiveNav(e.target);
            });
        });

        // Category tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentCategory = e.target.dataset.category;
                this.updateActiveTab(e.target);
                this.renderProducts();
            });
        });

        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.renderProducts();
            });
        }

        // Filters
        const categoryFilter = document.getElementById('categoryFilter');
        const platformFilter = document.getElementById('platformFilter');
        const sortFilter = document.getElementById('sortFilter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentCategory = e.target.value;
                this.renderProducts();
            });
        }

        if (platformFilter) {
            platformFilter.addEventListener('change', (e) => {
                this.currentPlatform = e.target.value;
                this.renderProducts();
            });
        }

        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.renderProducts();
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.visibleProducts += 6;
                this.renderProducts();
            });
        }

        // Smooth scroll for hero buttons
        document.querySelectorAll('.hero-buttons a').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href');
                this.scrollToSection(target);
            });
        });
    }

    getAllProducts() {
        return this.products;
    }

    getFilteredProducts() {
        let filteredProducts = this.getAllProducts();

        // Apply category filter
        if (this.currentCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product =>
                product.category === this.currentCategory
            );
        }

        // Apply search filter
        if (this.searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(this.searchTerm)
            );
        }

        // Apply platform filter
        if (this.currentPlatform !== 'all') {
            filteredProducts = filteredProducts.filter(product =>
                product.platform === this.currentPlatform
            );
        }

        // Apply sorting
        if (this.currentSort !== 'default') {
            filteredProducts = this.sortProducts(filteredProducts);
        }

        return filteredProducts;
    }

    sortProducts(products) {
        return products.sort((a, b) => {
            switch (this.currentSort) {
                case 'price-low':
                    return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
                case 'price-high':
                    return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
                case 'rating':
                    return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
                default:
                    return 0;
            }
        });
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        const filteredProducts = this.getFilteredProducts();
        const visibleProducts = filteredProducts.slice(0, this.visibleProducts);

        productsGrid.innerHTML = '';

        visibleProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });

        // Update load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if (filteredProducts.length <= this.visibleProducts) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }

        // Add loading animation
        this.animateProducts();
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card loading';

        const platformName = this.getPlatformName(product.platform?.toLowerCase() || 'aliexpress');
        const rating = product.rating || 4.0;
        const reviews = product.reviews || 0;
        const price = parseFloat(product.price) || 0;
        const stars = this.generateStars(rating);

        // Use placeholder image if none provided
        const imageUrl = product.image || 'https://via.placeholder.com/300x200?text=Produto';

        card.innerHTML = `
            <img src="${imageUrl}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/300x200?text=Produto'">
            <div class="product-info">
                <span class="product-platform platform-${product.platform?.toLowerCase() || 'aliexpress'}">${platformName}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    
                </div>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span>(${reviews} ${reviews === 1 ? 'avaliação' : 'avaliações'})</span>
                </div>
                <a href="${product.link}" class="product-link" target="_blank">
                    Ver Produto
                </a>
            </div>
        `;

        // Price section - only show current price
        const priceSection = document.createElement('div');
        priceSection.className = 'product-price';

        const currentPrice = product.price > 0 ? product.price.toFixed(2) : '0,00';
        priceSection.innerHTML = `<span class="current-price">R$ ${currentPrice}</span>`;

        card.querySelector('.product-info').insertBefore(priceSection, card.querySelector('.product-rating'));
        return card;
    }

    getPlatformName(platform) {
        const platforms = {
            aliexpress: 'AliExpress',
            amazon: 'Amazon',
            mercadolivre: 'Mercado Livre',
            'mercado livre': 'Mercado Livre'
        };
        return platforms[platform?.toLowerCase()] || platform || 'AliExpress';
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

    updateActiveTab(activeTab) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeTab.classList.add('active');
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    scrollToSection(targetId) {
        const element = document.querySelector(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    initAnimations() {
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        });

        // Observe elements for animation
        document.querySelectorAll('.feature, .product-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateProducts() {
        const cards = document.querySelectorAll('.product-card.loading');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('loading');
            }, index * 100);
        });
    }
}

// Global function to update prices from links
window.updatePricesFromLinks = async function() {
    if (!productService) {
        console.error('Product service not available');
        return;
    }
    
    console.log('🔄 Iniciando atualização de preços...');
    const success = await productService.updatePricesFromLinks();
    
    if (success) {
        console.log('✅ Preços atualizados com sucesso!');
        // Recarregar página para mostrar novos preços
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } else {
        console.error('❌ Erro ao atualizar preços');
    }
};

// Create update prices button
function createUpdatePricesButton() {
    const button = document.createElement('button');
    button.id = 'updatePricesBtn';
    button.innerHTML = '💰 Atualizar Preços';
    button.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: #28a745;
        color: white;
        border: none;
        padding: 12px 18px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    button.onmouseover = () => {
        button.style.background = '#218838';
        button.style.transform = 'translateY(-2px)';
    };
    
    button.onmouseout = () => {
        button.style.background = '#28a745';
        button.style.transform = 'translateY(0)';
    };
    
    button.onclick = async () => {
        button.innerHTML = '⏳ Atualizando...';
        button.style.background = '#ffc107';
        button.disabled = true;
        
        try {
            await window.updatePricesFromLinks();
        } catch (error) {
            console.error('Erro:', error);
            button.innerHTML = '❌ Erro';
            button.style.background = '#dc3545';
            setTimeout(() => {
                button.innerHTML = '💰 Atualizar Preços';
                button.style.background = '#28a745';
                button.disabled = false;
            }, 3000);
        }
    };
    
    document.body.appendChild(button);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AudioSpotApp();
    
    // Add update prices button after a short delay
    setTimeout(() => {
        createUpdatePricesButton();
    }, 1000);
});