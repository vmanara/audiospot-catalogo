
// Configuração das APIs para automação de produtos
const API_CONFIG = {
    // Configurações das APIs
    endpoints: {
        aliexpress: {
            base_url: 'https://api.aliexpress.com/v1',
            search_endpoint: '/products/search',
            params: {
                limit: 20,
                sort: 'price_asc'
            }
        },
        amazon: {
            base_url: 'https://api.amazon.com/paapi5',
            search_endpoint: '/searchitems',
            params: {
                limit: 20,
                sort: 'Price:LowToHigh'
            }
        },
        mercadolivre: {
            base_url: 'https://api.mercadolibre.com',
            search_endpoint: '/sites/MLB/search',
            params: {
                limit: 20,
                sort: 'price_asc'
            }
        }
    },

    // Mapeamento de categorias para palavras-chave
    categoryMappings: {
        pedais: {
            aliexpress: 'guitar effects pedal distortion delay reverb',
            amazon: 'guitar pedal effects boss',
            mercadolivre: 'pedal guitarra efeito'
        },
        acessorios: {
            aliexpress: 'guitar accessories pick capo strings',
            amazon: 'guitar accessories',
            mercadolivre: 'acessorio guitarra'
        },
        homestudio: {
            aliexpress: 'audio interface microphone studio',
            amazon: 'home studio recording equipment',
            mercadolivre: 'interface audio microfone'
        },
        audiotech: {
            aliexpress: 'headphones amplifier audio equipment',
            amazon: 'audio equipment headphones',
            mercadolivre: 'fone amplificador audio'
        },
        presets: {
            aliexpress: 'guitar presets software',
            amazon: 'music software plugins',
            mercadolivre: 'preset guitarra software'
        }
    },

    // Configurações de automação
    automation: {
        updateInterval: 6 * 60 * 60 * 1000, // 6 horas
        maxProductsPerCategory: 50,
        enableAutoUpdate: true
    }
};

// Funções utilitárias para APIs
const APIUtils = {
    // Normaliza dados de diferentes APIs
    normalizeProduct: (rawProduct, platform) => {
        const normalizers = {
            aliexpress: (item) => ({
                title: item.productTitle,
                price: parseFloat(item.salePrice),
                oldPrice: parseFloat(item.originalPrice),
                image: item.productMainImageUrl,
                rating: parseFloat(item.averageStar) || 4.0,
                reviews: parseInt(item.totalEvaluateNum) || 100,
                affiliate_link: item.productDetailUrl
            }),
            amazon: (item) => ({
                title: item.ItemInfo?.Title?.DisplayValue,
                price: parseFloat(item.Offers?.Listings?.[0]?.Price?.Amount),
                oldPrice: parseFloat(item.Offers?.Listings?.[0]?.SavingBasis?.Amount),
                image: item.Images?.Primary?.Large?.URL,
                rating: parseFloat(item.CustomerReviews?.StarRating?.Value) || 4.0,
                reviews: parseInt(item.CustomerReviews?.Count) || 100,
                affiliate_link: item.DetailPageURL
            }),
            mercadolivre: (item) => ({
                title: item.title,
                price: parseFloat(item.price),
                oldPrice: parseFloat(item.original_price),
                image: item.thumbnail,
                rating: 4.0, // ML não fornece rating na API de busca
                reviews: 100,
                affiliate_link: item.permalink
            })
        };

        return normalizers[platform]?.(rawProduct) || rawProduct;
    },

    // Constrói URL da API com parâmetros
    buildAPIUrl: (platform, category, keywords) => {
        const config = API_CONFIG.endpoints[platform];
        const params = new URLSearchParams(config.params);
        
        if (keywords) params.append('q', keywords);
        if (category) params.append('category', category);
        
        return `${config.base_url}${config.search_endpoint}?${params.toString()}`;
    }
};

// Sistema de cache para APIs
class APICache {
    constructor() {
        this.cache = new Map();
        this.ttl = 60 * 60 * 1000; // 1 hora
    }

    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    get(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;
        
        if (Date.now() - cached.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return cached.data;
    }

    clear() {
        this.cache.clear();
    }
}

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, APIUtils, APICache };
}
