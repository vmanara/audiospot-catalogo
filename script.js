
// Dados dos produtos das planilhas CSV
const productsData = [
    // Planilha 2 - BR_BRL_pt
    {
        id: "1005005743785108",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/S5430360cec534b68bd452b7c24958d04R.png",
        videoUrl: "https://video.aliexpress-media.com/play/u/ae_sg_item/2671489089/p/1/e/6/t/10301/1100165245500.mp4",
        title: "Idsonix nvme gabinete 10gbps usb 3.2 hub docking station sata ssd caso multiport usb divisor hdmi-compatível leitor de cartão sd/tf",
        originalPrice: 799.58,
        discountPrice: 399.79,
        discount: 50,
        currency: "BRL",
        commissionRate: 3.0,
        estimatedCommission: 11.99,
        sales180Day: 14,
        positiveFeedback: 100.0,
        trackingUrl: "https://s.click.aliexpress.com/e/_oEO3nyL",
        category: "tech"
    },
    {
        id: "1005006356702381",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/Sa5415f22fc3744f49a74bcd11b136f6bj.jpg",
        title: "Fifine microfone dinâmico usb/xlr com controle rgb/jack de fone de ouvido/mudo, microfone para gravação de jogos de pc streaming AmpliGame-AM8",
        originalPrice: 565.42,
        discountPrice: 270.98,
        discount: 52,
        currency: "BRL",
        commissionRate: 6.0,
        estimatedCommission: 16.26,
        sales180Day: 7979,
        positiveFeedback: 98.4,
        trackingUrl: "https://s.click.aliexpress.com/e/_oDbvt83",
        category: "audio"
    },
    {
        id: "1005005676541013",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/S1e3085e53200457a81bc105ea22f22627.jpg",
        title: "Mooer-GWF4 Interruptor Pedal sem fio, Pedal Controlador para Prime P1, Pedal de Guitarra Inteligente e Guitarra Elétrica Gtrs",
        originalPrice: 772.50,
        discountPrice: 231.76,
        discount: 70,
        currency: "BRL",
        commissionRate: 7.0,
        estimatedCommission: 16.22,
        sales180Day: 78,
        positiveFeedback: 90.9,
        trackingUrl: "https://s.click.aliexpress.com/e/_oD2489p",
        category: "instruments"
    },
    {
        id: "1005009106410625",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/A9bdb723d5e69409c83a70728b671300cN.jpg",
        title: "Mouse Pad Gamer Hibrido/Control Profissional 45x40 Branco Preto Liso Hexágono Ergonômico Titorion",
        originalPrice: 99.90,
        discountPrice: 79.92,
        discount: 20,
        currency: "BRL",
        commissionRate: 8.0,
        estimatedCommission: 6.39,
        sales180Day: 14,
        positiveFeedback: 100.0,
        trackingUrl: "https://s.click.aliexpress.com/e/_oErQWt1",
        category: "accessories"
    },
    {
        id: "1005007856413519",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/Se3bea03b7db643129fcd47f0d7573306I.jpg",
        title: "M-VAVE-B Multi-Effect Bass Pedal, recarregável, 36 Presets, 9 Preamp Slots, 8 IR Cab Slots, 3 Simulação, Delay, Reverb Efeitos",
        originalPrice: 827.71,
        discountPrice: 372.47,
        discount: 55,
        currency: "BRL",
        commissionRate: 7.0,
        estimatedCommission: 26.07,
        sales180Day: 37,
        positiveFeedback: 97.1,
        trackingUrl: "https://s.click.aliexpress.com/e/_omYjEMf",
        category: "instruments"
    },
    {
        id: "1005004153310145",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/S399791cc54684c9287daf00bb620ef2aW.jpg",
        title: "Doremidi expressão pedal conversor interruptor pedal guitarra instrumento musical guitarra elétrica sustentar pedal expansor Mpc-10",
        originalPrice: 493.97,
        discountPrice: 246.99,
        discount: 50,
        currency: "BRL",
        commissionRate: 7.0,
        estimatedCommission: 17.29,
        sales180Day: 5,
        positiveFeedback: 0.0,
        trackingUrl: "https://s.click.aliexpress.com/e/_oFMojaR",
        category: "instruments"
    },
    // Planilha1 track - BR_BRL_pt (alguns produtos principais)
    {
        id: "1005004316858924",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/S81e4e5c12a6b430b93570ea8853ad38bz.jpg",
        videoUrl: "https://video.aliexpress-media.com/play/u/ae_sg_item/231207176/p/1/e/6/t/10301/1100044538528.mp4",
        title: "Estação de acoplamento USB C Hagibis com gabinete SSD M.2 compatível com HDMI duplo Ethernet 100W PD USB Hub SD/TF para laptop Macbook Pro",
        originalPrice: 642.55,
        discountPrice: 404.79,
        discount: 37,
        currency: "BRL",
        commissionRate: 8.0,
        estimatedCommission: 32.38,
        sales180Day: 134,
        positiveFeedback: 94.1,
        trackingUrl: "https://s.click.aliexpress.com/e/_oFezQsf",
        category: "tech"
    },
    {
        id: "1005006812428491",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/Sd03a7ea58ed04f058f2599dbf0a77867q.jpg",
        title: "KOKKO-Mini Tuner Guitarra Elétrica, Pedal Efeito com Display LED, True Bypass, Efeitos de Guitarra, Acessórios Instrumento",
        originalPrice: 33.38,
        discountPrice: 16.69,
        discount: 50,
        currency: "BRL",
        commissionRate: 7.0,
        estimatedCommission: 1.17,
        sales180Day: 166,
        positiveFeedback: 89.1,
        trackingUrl: "https://s.click.aliexpress.com/e/_ol6jIND",
        category: "instruments"
    },
    {
        id: "1005006142652231",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/S380d8edbb7c84dff8628be66d4e1744eH.jpg",
        title: "Mixer de som FIFINE para microfone condensador com botão de ganho, interface de áudio com alimentação fantasma de 48V para microfone XLR Podcast-Ampli1",
        originalPrice: 434.70,
        discountPrice: 347.75,
        discount: 20,
        currency: "BRL",
        commissionRate: 5.5,
        estimatedCommission: 19.13,
        sales180Day: 231,
        positiveFeedback: 95.8,
        trackingUrl: "https://s.click.aliexpress.com/e/_okqCuMX",
        category: "audio"
    },
    {
        id: "1005007044861794",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/S0d509576798548949c7cb5c4223d99b9D.jpg",
        title: "FIFINE 1440p Full HD PC Webcam com microfone, tripé, para desktop e laptop USB, webcam de transmissão ao vivo para chamadas de vídeo-K420",
        originalPrice: 362.75,
        discountPrice: 130.59,
        discount: 64,
        currency: "BRL",
        commissionRate: 3.0,
        estimatedCommission: 3.92,
        sales180Day: 7234,
        positiveFeedback: 96.0,
        trackingUrl: "https://s.click.aliexpress.com/e/_oB8bs3l",
        category: "tech"
    },
    {
        id: "1005006756452012",
        imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/Sbb6f7f7479f147c4b64dde8985c246cbn.png",
        title: "Delux m900pro mouse para jogos sem fio ergonômico 8k taxa de pesquisa paw3395 63g doca de carregamento rgb magnético para mão direita grande pc gamer",
        originalPrice: 285.94,
        discountPrice: 239.57,
        discount: 16,
        currency: "BRL",
        commissionRate: 8.0,
        estimatedCommission: 19.17,
        sales180Day: 6619,
        positiveFeedback: 97.2,
        trackingUrl: "https://s.click.aliexpress.com/e/_oCh9pzN",
        category: "tech"
    }
];

// Estado da aplicação
let filteredProducts = [...productsData];
let currentFilters = {
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

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(productsData);
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
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
        filteredProducts = productsData.filter(product => {
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
        
        hideLoading();
        renderProducts(filteredProducts);
    }, 500);
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
    
    const originalPriceDisplay = product.discount > 0 ? 
        `<span class="original-price">R$ ${product.originalPrice.toFixed(2)}</span>` : '';
    
    const currentPrice = product.discountPrice || product.originalPrice;
    
    const rating = calculateRating(product.positiveFeedback);
    const ratingStars = generateStars(rating);
    
    return `
        <div class="product-card" onclick="openProduct('${product.trackingUrl}')">
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.title}" loading="lazy" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuYW8gZGlzcG9uaXZlbDwvdGV4dD48L3N2Zz4='">
                ${discountBadge}
                ${commissionBadge}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="price-section">
                    <span class="current-price">R$ ${currentPrice.toFixed(2)}</span>
                    ${originalPriceDisplay}
                </div>
                <div class="product-stats">
                    <div class="rating">
                        <span class="stars">${ratingStars}</span>
                        <span>${product.positiveFeedback}%</span>
                    </div>
                    <div class="sales">
                        <i class="fas fa-shopping-cart"></i>
                        ${product.sales180Day} vendas
                    </div>
                </div>
                <a href="${product.trackingUrl}" target="_blank" class="buy-button" onclick="event.stopPropagation();">
                    <i class="fas fa-external-link-alt"></i>
                    Ver no AliExpress
                </a>
            </div>
        </div>
    `;
}

// Utilitários
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

// Analytics (opcional)
function trackProductClick(productId, productTitle) {
    console.log('Produto clicado:', productId, productTitle);
    // Aqui você pode implementar tracking com Google Analytics, Facebook Pixel, etc.
}
