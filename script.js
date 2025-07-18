
// Mock data for demonstration - replace with actual API calls
const mockProducts = {
    pedais: [
        {
            id: 1,
            title: "Boss DS-1 Distortion Pedal",
            price: 89.99,
            oldPrice: 120.00,
            image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Boss+DS-1",
            platform: "aliexpress",
            rating: 4.5,
            reviews: 234,
            affiliate_link: "https://aliexpress.com/item/boss-ds1"
        },
        {
            id: 2,
            title: "Tube Screamer TS9 Clone",
            price: 45.99,
            oldPrice: 65.00,
            image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=TS9+Clone",
            platform: "amazon",
            rating: 4.2,
            reviews: 156,
            affiliate_link: "https://amazon.com/tube-screamer"
        }
    ],
    acessorios: [
        {
            id: 3,
            title: "Kit 20 Palhetas Profissionais",
            price: 15.99,
            oldPrice: 25.00,
            image: "https://via.placeholder.com/280x200/e74c3c/ffffff?text=Palhetas",
            platform: "mercadolivre",
            rating: 4.8,
            reviews: 892,
            affiliate_link: "https://mercadolivre.com/palhetas"
        },
        {
            id: 4,
            title: "Capo Guitarra Premium",
            price: 22.50,
            oldPrice: 35.00,
            image: "https://via.placeholder.com/280x200/3498db/ffffff?text=Capo",
            platform: "aliexpress",
            rating: 4.6,
            reviews: 445,
            affiliate_link: "https://aliexpress.com/capo"
        }
    ],
    homestudio: [
        {
            id: 5,
            title: "Interface Audio USB Behringer",
            price: 299.99,
            oldPrice: 399.00,
            image: "https://via.placeholder.com/280x200/2ecc71/ffffff?text=Interface",
            platform: "amazon",
            rating: 4.4,
            reviews: 678,
            affiliate_link: "https://amazon.com/behringer-interface"
        },
        {
            id: 6,
            title: "Microfone Condensador BM800",
            price: 129.99,
            oldPrice: 180.00,
            image: "https://via.placeholder.com/280x200/f39c12/ffffff?text=BM800",
            platform: "aliexpress",
            rating: 4.3,
            reviews: 1234,
            affiliate_link: "https://aliexpress.com/bm800"
        }
    ],
    audiotech: [
        {
            id: 7,
            title: "Monitor Referência KRK Rokit 5",
            price: 899.99,
            oldPrice: 1200.00,
            image: "https://via.placeholder.com/280x200/9b59b6/ffffff?text=KRK+Rokit",
            platform: "amazon",
            rating: 4.7,
            reviews: 342,
            affiliate_link: "https://amazon.com/krk-rokit"
        },
        {
            id: 8,
            title: "Fones Studio Profissional",
            price: 199.99,
            oldPrice: 280.00,
            image: "https://via.placeholder.com/280x200/34495e/ffffff?text=Headphones",
            platform: "mercadolivre",
            rating: 4.5,
            reviews: 567,
            affiliate_link: "https://mercadolivre.com/fones"
        }
    ],
    presets: [
        {
            id: 9,
            title: "Pack 500 Presets Guitar Rig",
            price: 39.99,
            oldPrice: 60.00,
            image: "https://via.placeholder.com/280x200/e67e22/ffffff?text=Presets",
            platform: "aliexpress",
            rating: 4.9,
            reviews: 123,
            affiliate_link: "https://aliexpress.com/presets"
        },
        {
            id: 10,
            title: "Neural DSP Archetype Nolly",
            price: 149.99,
            oldPrice: 179.00,
            image: "https://via.placeholder.com/280x200/16a085/ffffff?text=Neural+DSP",
            platform: "amazon",
            rating: 4.8,
            reviews: 89,
            affiliate_link: "https://amazon.com/neural-dsp"
        }
    ]
};

class ProductCatalog {
    constructor() {
        this.products = mockProducts;
        this.currentFilters = {
            platform: 'all',
            price: 'all',
            category: 'all',
            search: '',
            sort: 'default'
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderAllProducts();
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

        // Price filter
        document.getElementById('priceFilter').addEventListener('change', (e) => {
            this.currentFilters.price = e.target.value;
            this.filterProducts();
        });

        // Sort filter
        document.getElementById('sortFilter').addEventListener('change', (e) => {
            this.currentFilters.sort = e.target.value;
            this.filterAndSortProducts();
        });

        // Category navigation
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.dataset.category;
                this.scrollToCategory(category);
                this.highlightNavItem(e.target);
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
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        
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
                    <span>(${product.reviews} avaliações)</span>
                </div>
                <a href="${product.affiliate_link}" target="_blank" rel="noopener" class="product-link">
                    Ver Oferta ${discount ? `- ${discount}% OFF` : ''}
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

            // Price filter
            if (this.currentFilters.price !== 'all') {
                const price = parseFloat(card.dataset.price);
                const priceRange = this.currentFilters.price;
                
                if (priceRange === '0-50' && (price < 0 || price > 50)) shouldShow = false;
                if (priceRange === '50-100' && (price < 50 || price > 100)) shouldShow = false;
                if (priceRange === '100-200' && (price < 100 || price > 200)) shouldShow = false;
                if (priceRange === '200+' && price < 200) shouldShow = false;
            }

            card.style.display = shouldShow ? 'block' : 'none';

            // Count visible products by category
            if (shouldShow) {
                const category = card.closest('.products-grid').dataset.category;
                visibleCounts[category] = (visibleCounts[category] || 0) + 1;
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

    highlightNavItem(clickedItem) {
        document.querySelectorAll('.nav-list a').forEach(item => {
            item.classList.remove('active');
        });
        clickedItem.classList.add('active');
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 1000);
        }
    }

    // Method to integrate with real APIs
    async loadProductsFromAPI(category) {
        try {
            // Example API integration structure
            // Replace with actual AliExpress API calls
            
            /*
            const response = await fetch(`/api/products/${category}`);
            const data = await response.json();
            
            this.products[category] = data.products.map(product => ({
                id: product.id,
                title: product.title,
                price: product.price,
                oldPrice: product.originalPrice,
                image: product.imageUrl,
                platform: product.source, // 'aliexpress', 'amazon', 'mercadolivre'
                rating: product.rating,
                reviews: product.reviewCount,
                affiliate_link: product.affiliateUrl
            }));
            
            this.renderCategory(category);
            */
            
            console.log(`Loading ${category} products from API...`);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }
}

// Initialize the catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductCatalog();
});

// Add some utility functions for future API integration
const ApiUtils = {
    // AliExpress API integration helper
    formatAliExpressProduct(apiProduct) {
        return {
            id: apiProduct.productId,
            title: apiProduct.productTitle,
            price: apiProduct.salePrice,
            oldPrice: apiProduct.originalPrice,
            image: apiProduct.productMainImageUrl,
            platform: 'aliexpress',
            rating: apiProduct.evaluateScore,
            reviews: apiProduct.evaluateCount,
            affiliate_link: apiProduct.promotionLink
        };
    },

    // Amazon API integration helper
    formatAmazonProduct(apiProduct) {
        return {
            id: apiProduct.ASIN,
            title: apiProduct.ItemInfo.Title.DisplayValue,
            price: apiProduct.Offers.Listings[0].Price.Amount,
            oldPrice: apiProduct.Offers.Listings[0].SavingBasis?.Amount,
            image: apiProduct.Images.Primary.Large.URL,
            platform: 'amazon',
            rating: apiProduct.CustomerReviews?.StarRating,
            reviews: apiProduct.CustomerReviews?.Count,
            affiliate_link: apiProduct.DetailPageURL
        };
    },

    // Mercado Livre API integration helper
    formatMercadoLivreProduct(apiProduct) {
        return {
            id: apiProduct.id,
            title: apiProduct.title,
            price: apiProduct.price,
            oldPrice: apiProduct.original_price,
            image: apiProduct.thumbnail,
            platform: 'mercadolivre',
            rating: apiProduct.reviews_summary?.rating_average,
            reviews: apiProduct.reviews_summary?.total,
            affiliate_link: apiProduct.permalink
        };
    }
};
