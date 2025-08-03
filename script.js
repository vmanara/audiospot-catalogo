// Estado da aplicação
let allProductsData = [];
let filteredProducts = [];
let currentFilters = {
    marketplace: 'all',
    category: '',
    priceRange: '',
    search: ''
};

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const loading = document.getElementById('loading');
const productsCount = document.getElementById('products-count');
const tabButtons = document.querySelectorAll('.tab-button');

// Inicialização
document.addEventListener('DOMContentLoaded', async function() {
    showLoading();

    try {
        await loadAllProducts();
        hideLoading();
        applyFilters();
        setupEventListeners();

    } catch (error) {
        console.error('Erro na inicialização:', error);
        hideLoading();
        showError('Erro ao carregar produtos. Tente recarregar a página.');
    }
});

// Carregamento de produtos
async function loadAllProducts() {
    const products = [];

    try {
        // Carrega produtos do AliExpress
        const aliexpressProducts = await loadAliExpressProducts();
        products.push(...aliexpressProducts);

        // Carrega produtos do Mercado Livre
        const mercadoLivreProducts = await loadMercadoLivreProducts();
        products.push(...mercadoLivreProducts);

        allProductsData = products;
        console.log(`Total de produtos carregados: ${allProductsData.length}`);

        // Log das categorias
        const categories = {};
        allProductsData.forEach(p => {
            categories[p.category] = (categories[p.category] || 0) + 1;
        });
        console.log('Produtos por categoria:', categories);

    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        allProductsData = [];
    }
}

async function loadAliExpressProducts() {
    try {
        const response = await fetch('Produtos/aliexpress.js');
        const text = await response.text();

        // Extrai o array de produtos do arquivo
        const match = text.match(/const produtos = (\[[\s\S]*?\]);/);
        if (!match) {
            console.error('Não foi possível extrair produtos do AliExpress');
            return [];
        }

        const produtos = eval(match[1]);

        return produtos.map(produto => {
            if (!produto || typeof produto !== 'object') return null;

            // Processa preços
            const originalPriceStr = (produto.preco_original || '0').toString();
            const discountPriceStr = (produto.preco_desconto || '0').toString();
            const discountStr = (produto.desconto || '0').toString();

            const originalPrice = parseFloat(originalPriceStr.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
            const discountPrice = parseFloat(discountPriceStr.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
            const discount = parseInt(discountStr.replace('%', '')) || 0;

            // Auto-categorização
            const autoCategory = autoCategorizeProduto(produto.nome || '');

            return {
                id: `ali_${produto.id || Math.random()}`,
                imageUrl: produto.imagem || '',
                videoUrl: '',
                title: produto.nome || 'Produto sem título',
                originalPrice: originalPrice,
                discountPrice: discountPrice > 0 ? discountPrice : null,
                discount: discount,
                currency: 'BRL',
                commissionRate: parseFloat(produto.avaliacao) || 0,
                estimatedCommission: parseFloat(produto.frete) || 0,
                sales180Day: parseInt(produto.vendas) || 0,
                positiveFeedback: parseFloat((produto.loja || '0').toString().replace('%', '')) || 0,
                trackingUrl: produto.link || '#',
                category: autoCategory,
                marketplace: 'aliexpress'
            };
        }).filter(produto => {
            return produto && 
                   produto.title && 
                   produto.title !== 'Produto sem título' && 
                   produto.originalPrice > 0 &&
                   produto.id !== 'ali_ProductId' &&
                   produto.imageUrl !== 'Image Url';
        });

    } catch (error) {
        console.error('Erro ao carregar produtos do AliExpress:', error);
        return [];
    }
}

async function loadMercadoLivreProducts() {
    try {
        const response = await fetch('Produtos/mercadolivre.js');
        const text = await response.text();

        // Extrai o array de produtos do arquivo
        const match = text.match(/var produtos = (\[[\s\S]*?\]);/);
        if (!match) {
            console.error('Não foi possível extrair produtos do Mercado Livre');
            return [];
        }

        const produtos = eval(match[1]);

        return produtos.map(produto => {
            if (!produto || typeof produto !== 'object') return null;

            // Auto-categorização
            const autoCategory = autoCategorizeProduto(produto.title || '');

            return {
                id: `ml_${produto.id || Math.random()}`,
                imageUrl: produto.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1lcmNhZG8gTGl2cmU8L3RleHQ+PC9zdmc+',
                videoUrl: produto.videoUrl || '',
                title: produto.title || 'Produto sem título',
                originalPrice: 99.99, // Preço padrão para não filtrar o produto
                discountPrice: null,
                discount: 0,
                currency: produto.currency || 'BRL',
                commissionRate: 0,
                estimatedCommission: 0,
                sales180Day: 0,
                positiveFeedback: 95, // Para mostrar rating
                trackingUrl: produto.trackingUrl || '#',
                category: autoCategory,
                marketplace: 'mercadolivre'
            };
        }).filter(produto => {
            return produto && 
                   produto.title && 
                   produto.title !== 'Produto sem título' &&
                   produto.trackingUrl && 
                   produto.trackingUrl !== '#' &&
                   produto.id !== 'ml_ProductId';
        });

    } catch (error) {
        console.error('Erro ao carregar produtos do Mercado Livre:', error);
        return [];
    }
}



// Função para categorizar produtos automaticamente
function autoCategorizeProduto(title) {
    const titleLower = title.toLowerCase();

    // Palavras-chave para categorias específicas de pedais
    const overdriveDistortionKeywords = ['overdrive', 'distortion', 'distorção', 'fuzz', 'boost', 'tube drive', 'saturação'];
    const modulationKeywords = ['chorus', 'flanger', 'phaser', 'tremolo', 'vibrato', 'rotary', 'modulação'];
    const delayReverbKeywords = ['delay', 'reverb', 'echo', 'ambient', 'space', 'hall'];
    const dynamicsKeywords = ['compressor', 'gate', 'limiter', 'sustain', 'noise gate', 'volume'];
    const filterKeywords = ['wah', 'filter', 'envelope', 'auto wah', 'cry baby', 'talk box'];
    const multiEffectsKeywords = ['multi', 'multi-effect', 'multiefeito', 'processor', 'pedalboard', 'preset'];
    const tunerKeywords = ['tuner', 'afinador', 'pitch', 'chromatic'];

    // Palavras-chave para outras categorias
    const audioKeywords = ['microfone', 'mic', 'mixer', 'interface', 'phantom', 'xlr', 'condensador', 'dinâmico'];
    const amplifierKeywords = ['amplificador', 'amp', 'head', 'cabinet', 'combo', 'valve', 'tube'];
    const instrumentsKeywords = ['guitarra', 'guitar', 'bass', 'baixo', 'piano', 'teclado', 'drum', 'bateria', 'violão', 'cordas'];
    const techKeywords = ['usb', 'hub', 'mouse', 'webcam', 'camera', 'monitor', 'ssd', 'nvme', 'computador', 'notebook'];
    const accessoryKeywords = ['cabo', 'suporte', 'tripé', 'case', 'bag', 'mouse pad', 'mousepad', 'adaptador', 'fonte'];

    // Categorização específica para pedais
    if (overdriveDistortionKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'pedal-overdrive';
    }
    if (modulationKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'pedal-modulation';
    }
    if (delayReverbKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'pedal-delay';
    }
    if (dynamicsKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'pedal-dynamics';
    }
    if (filterKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'pedal-filter';
    }
    if (multiEffectsKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'pedal-multi';
    }
    if (tunerKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'pedal-tuner';
    }

    // Categorias gerais
    if (audioKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'audio';
    }
    if (amplifierKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'amplifiers';
    }
    if (instrumentsKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'instruments';
    }
    if (techKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'tech';
    }
    if (accessoryKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'accessories';
    }

    // Se contém a palavra "pedal" mas não se encaixa nas categorias específicas
    if (titleLower.includes('pedal')) {
        return 'pedal-other';
    }

    return 'tech'; // categoria padrão
}

// Event Listeners
function setupEventListeners() {
    // Abas de marketplace
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona active ao botão clicado
            button.classList.add('active');

            currentFilters.marketplace = button.dataset.marketplace;
            applyFilters();
        });
    });

    categoryFilter.addEventListener('change', handleCategoryFilter);
    priceFilter.addEventListener('change', handlePriceFilter);
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

// Filtros
function handleCategoryFilter() {
    currentFilters.category = categoryFilter.value;
    applyFilters();
}

function handlePriceFilter() {
    currentFilters.priceRange = priceFilter.value;
    applyFilters();
}

function handleSearch() {
    currentFilters.search = searchInput.value.toLowerCase();
    applyFilters();
}

function applyFilters() {
    showLoading();

    setTimeout(() => {
        filteredProducts = allProductsData.filter(product => {
            // Filtro por marketplace
            if (currentFilters.marketplace !== 'all' && product.marketplace !== currentFilters.marketplace) {
                return false;
            }

            // Filtro por categoria
            if (currentFilters.category && product.category !== currentFilters.category) {
                return false;
            }

            // Filtro por preço
            if (currentFilters.priceRange) {
                const price = product.discountPrice || product.originalPrice;
                const [min, max] = currentFilters.priceRange.split('-').map(p => parseFloat(p) || Infinity);
                if (price < min || (max !== Infinity && price > max)) {
                    return false;
                }
            }

            // Filtro por busca
            if (currentFilters.search) {
                const searchText = product.title.toLowerCase();
                if (!searchText.includes(currentFilters.search)) {
                    return false;
                }
            }

            return true;
        });

        updateProductsCount();
        hideLoading();
        renderProducts(filteredProducts);
    }, 300);
}

// Renderização
function renderProducts(products) {
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente ajustar os filtros ou buscar por outros termos.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const discountBadge = product.discount > 0 ? 
        `<div class="discount-badge">-${product.discount}%</div>` : '';

    const commissionBadge = product.commissionRate > 0 ? 
        `<div class="commission-badge">+${product.commissionRate}% cashback</div>` : '';

    const marketplaceBadge = `<div class="marketplace-badge">${getMarketplaceName(product.marketplace)}</div>`;

    // Não mostra preço para Mercado Livre
    let priceSection = '';
    if (product.marketplace !== 'mercadolivre') {
        const originalPriceDisplay = product.discount > 0 ? 
            `<span class="original-price">R$ ${product.originalPrice.toFixed(2)}</span>` : '';

        const currentPrice = product.discountPrice || product.originalPrice;

        priceSection = `
            <div class="price-section">
                <span class="current-price">R$ ${currentPrice.toFixed(2)}</span>
                ${originalPriceDisplay}
            </div>
        `;
    }

    const rating = calculateRating(product.positiveFeedback);
    const ratingStars = generateStars(rating);

    return `
        <div class="product-card" onclick="openProduct('${product.trackingUrl}')">
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.title}" loading="lazy" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuYW8gZGlzcG9uaXZlbDwvdGV4dD48L3N2Zz4='">
                ${discountBadge}
                ${commissionBadge}
                ${marketplaceBadge}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                ${priceSection}
                <div class="product-stats">
                    <div class="rating">
                        <span class="stars">${ratingStars}</span>
                        <span>${product.positiveFeedback}%</span>
                    </div>
                    ${product.marketplace !== 'mercadolivre' ? `
                    <div class="sales">
                        <i class="fas fa-shopping-cart"></i>
                        ${product.sales180Day} vendas
                    </div>
                    ` : ''}
                </div>
                <a href="${product.trackingUrl}" target="_blank" class="buy-button" onclick="event.stopPropagation();">
                    <i class="fas fa-external-link-alt"></i>
                    Ver no ${getMarketplaceName(product.marketplace)}
                </a>
            </div>
        </div>
    `;
}

// Utilitários
function getMarketplaceName(marketplace) {
    const names = {
        'aliexpress': 'AliExpress',
        'mercadolivre': 'Mercado Livre',
        'amazon': 'Amazon'
    };
    return names[marketplace] || marketplace;
}

function updateProductsCount() {
    const count = filteredProducts.length;
    const marketplace = currentFilters.marketplace === 'all' ? 'todos os marketplaces' : getMarketplaceName(currentFilters.marketplace);
    productsCount.textContent = `${count} produto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''} em ${marketplace}`;
}

function calculateRating(positiveFeedback) {
    if (positiveFeedback >= 98) return 5;
    if (positiveFeedback >= 95) return 4.5;
    if (positiveFeedback >= 90) return 4;
    if (positiveFeedback >= 80) return 3.5;
    if (positiveFeedback >= 70) return 3;
    return 2.5;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
}

function openProduct(url) {
    window.open(url, '_blank');
}

function showLoading() {
    loading.style.display = 'block';
    productsGrid.style.opacity = '0.5';
}

function hideLoading() {
    loading.style.display = 'none';
    productsGrid.style.opacity = '1';
}

function showError(message) {
    productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--danger);">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3>Erro</h3>
            <p>${message}</p>
        </div>
    `;
}

// Analytics (opcional)
function trackProductClick(productId, productTitle) {
    console.log('Produto clicado:', productId, productTitle);
    // Aqui você pode implementar tracking com Google Analytics, Facebook Pixel, etc.
}