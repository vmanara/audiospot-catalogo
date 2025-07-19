
// Price extraction service for affiliate links
class PriceExtractor {
    constructor() {
        this.cache = new Map();
        this.cacheExpiry = 1000 * 60 * 30; // 30 minutes
    }

    // Extract price from AliExpress
    async extractAliExpressPrice(url) {
        try {
            // Use a CORS proxy to fetch the page
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (data.contents) {
                // Look for price patterns in AliExpress
                const pricePatterns = [
                    /\"minPrice\":\s*\"([^\"]+)\"/,
                    /\"maxPrice\":\s*\"([^\"]+)\"/,
                    /\"priceLocal\":\s*\"([^\"]+)\"/,
                    /\"price\":\s*\"([^\"]+)\"/,
                    /R\$\s*(\d+[,\.]\d+)/g,
                    /US\s*\$\s*(\d+[,\.]\d+)/g
                ];

                for (const pattern of pricePatterns) {
                    const match = data.contents.match(pattern);
                    if (match && match[1]) {
                        const price = parseFloat(match[1].replace(',', '.').replace(/[^\d\.]/g, ''));
                        if (price > 0) {
                            return { price: price, currency: 'USD' };
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error extracting AliExpress price:', error);
        }
        return null;
    }

    // Extract price from Amazon
    async extractAmazonPrice(url) {
        try {
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (data.contents) {
                // Look for price patterns in Amazon
                const pricePatterns = [
                    /\"priceAmount\":\s*\"([^\"]+)\"/,
                    /\"price\":\s*\"([^\"]+)\"/,
                    /R\$\s*(\d+[,\.]\d+)/g,
                    /\$\s*(\d+[,\.]\d+)/g
                ];

                for (const pattern of pricePatterns) {
                    const match = data.contents.match(pattern);
                    if (match && match[1]) {
                        const price = parseFloat(match[1].replace(',', '.').replace(/[^\d\.]/g, ''));
                        if (price > 0) {
                            return { price: price, currency: 'BRL' };
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error extracting Amazon price:', error);
        }
        return null;
    }

    // Extract price from Mercado Livre
    async extractMercadoLivrePrice(url) {
        try {
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (data.contents) {
                // Look for price patterns in Mercado Livre
                const pricePatterns = [
                    /\"price\":\s*(\d+[,\.]\d*)/,
                    /\"amount\":\s*(\d+[,\.]\d*)/,
                    /R\$\s*(\d+[,\.]\d+)/g
                ];

                for (const pattern of pricePatterns) {
                    const match = data.contents.match(pattern);
                    if (match && match[1]) {
                        const price = parseFloat(match[1].replace(',', '.').replace(/[^\d\.]/g, ''));
                        if (price > 0) {
                            return { price: price, currency: 'BRL' };
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error extracting Mercado Livre price:', error);
        }
        return null;
    }

    // Main function to extract price from any platform
    async extractPrice(url, platform) {
        const cacheKey = `${platform}_${url}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheExpiry) {
                return cached.data;
            }
        }

        let result = null;
        
        try {
            switch (platform.toLowerCase()) {
                case 'aliexpress':
                    result = await this.extractAliExpressPrice(url);
                    break;
                case 'amazon':
                    result = await this.extractAmazonPrice(url);
                    break;
                case 'mercadolivre':
                case 'mercado livre':
                    result = await this.extractMercadoLivrePrice(url);
                    break;
                default:
                    console.warn(`Unknown platform: ${platform}`);
                    return null;
            }

            // Cache the result
            if (result) {
                this.cache.set(cacheKey, {
                    data: result,
                    timestamp: Date.now()
                });
            }

            return result;
        } catch (error) {
            console.error(`Error extracting price for ${platform}:`, error);
            return null;
        }
    }

    // Convert USD to BRL (simplified conversion)
    async convertUSDToBRL(usdPrice) {
        try {
            // Use a free exchange rate API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            const rate = data.rates.BRL || 5.2; // Fallback rate
            return usdPrice * rate;
        } catch (error) {
            console.error('Error converting USD to BRL:', error);
            return usdPrice * 5.2; // Fallback conversion rate
        }
    }

    // Get price in BRL
    async getPriceInBRL(url, platform) {
        const priceData = await this.extractPrice(url, platform);
        
        if (!priceData) return null;

        if (priceData.currency === 'USD') {
            const brlPrice = await this.convertUSDToBRL(priceData.price);
            return { price: brlPrice, currency: 'BRL', original: priceData };
        }

        return priceData;
    }
}

// Global instance
window.priceExtractor = new PriceExtractor();
