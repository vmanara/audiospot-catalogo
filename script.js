// Cache for products
let productsCache = null;

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
            this.products = await productService.getAllProducts();
            console.log('Products loaded from Supabase:', this.products);
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback to empty array if Supabase fails
            this.products = [];
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
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
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

        const platformName = this.getPlatformName(product.platform);
        const stars = this.generateStars(product.rating);
        const discount = product.oldPrice ? 
            Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <span class="product-platform platform-${product.platform}">${platformName}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    R$ ${product.price.toFixed(2)}
                    ${product.oldPrice ? `<span class="product-old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span>(${product.reviews} avaliações)</span>
                </div>
                <a href="${product.link}" class="product-link" target="_blank">
                    Ver Produto
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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AudioSpotApp();
});