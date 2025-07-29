
// Utilitário para converter CSV em dados de produtos
function csvToProducts(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    const products = [];
    
    // Mapeia os índices das colunas baseado nos cabeçalhos
    const fieldMap = {
        id: headers.indexOf('ProductId'),
        imageUrl: headers.indexOf('Image Url'),
        videoUrl: headers.indexOf('Video Url'),
        title: headers.indexOf('Product Desc'),
        originalPrice: headers.indexOf('Origin Price'),
        discountPrice: headers.indexOf('Discount Price'),
        discount: headers.indexOf('Discount'),
        currency: headers.indexOf('Currency'),
        commissionRate: headers.indexOf('Direct linking commission rate (%)'),
        estimatedCommission: headers.indexOf('Estimated direct linking commission'),
        sales180Day: headers.indexOf('Sales180Day'),
        positiveFeedback: headers.indexOf('Positive Feedback'),
        trackingUrl: headers.indexOf('Tracking URL')
    };
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        // Parse CSV com suporte a vírgulas dentro de aspas
        const values = parseCSVLine(line);
        if (values.length < 5) continue;
        
        try {
            const productTitle = (values[fieldMap.title] || 'Produto sem título').replace(/"/g, '');
            const autoCategory = autoCategorizeProduto(productTitle);
            
            const originalPrice = parseFloat((values[fieldMap.originalPrice] || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
            const discountPrice = parseFloat((values[fieldMap.discountPrice] || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
            const discount = parseInt((values[fieldMap.discount] || '0').replace('%', '')) || 0;
            const commissionRate = parseFloat((values[fieldMap.commissionRate] || '0').replace('%', '')) || 0;
            const positiveFeedback = parseFloat((values[fieldMap.positiveFeedback] || '0').replace('%', '')) || 0;
            
            const product = {
                id: values[fieldMap.id] || `product_${i}`,
                imageUrl: (values[fieldMap.imageUrl] || '').replace(/"/g, ''),
                videoUrl: (values[fieldMap.videoUrl] || '').replace(/"/g, ''),
                title: productTitle,
                originalPrice: originalPrice,
                discountPrice: discountPrice > 0 ? discountPrice : null,
                discount: discount,
                currency: values[fieldMap.currency] || 'BRL',
                commissionRate: commissionRate,
                estimatedCommission: parseFloat((values[fieldMap.estimatedCommission] || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
                sales180Day: parseInt(values[fieldMap.sales180Day] || '0') || 0,
                positiveFeedback: positiveFeedback,
                trackingUrl: (values[fieldMap.trackingUrl] || '#').replace(/"/g, ''),
                category: autoCategory
            };
            
            // Só adiciona produtos com dados válidos
            if (product.title && product.title !== 'Produto sem título' && product.originalPrice > 0) {
                products.push(product);
            }
        } catch (error) {
            console.warn(`Erro ao processar linha ${i}:`, error);
        }
    }
    
    return products;
}

// Função para fazer parse de linha CSV com suporte a vírgulas dentro de aspas
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

// Função para categorizar produtos automaticamente baseado no título
function autoCategorizeProduto(title) {
    const titleLower = title.toLowerCase();
    
    // Palavras-chave para cada categoria
    const audioKeywords = ['microfone', 'mic', 'audio', 'sound', 'som', 'headphone', 'fone', 'speaker', 'alto-falante', 'mixer', 'interface'];
    const instrumentKeywords = ['guitarra', 'guitar', 'pedal', 'bass', 'baixo', 'piano', 'teclado', 'drum', 'bateria', 'violão'];
    const techKeywords = ['usb', 'hub', 'mouse', 'teclado', 'webcam', 'camera', 'monitor', 'ssd', 'nvme', 'cabo', 'carregador'];
    const accessoryKeywords = ['cabo', 'suporte', 'tripé', 'case', 'bag', 'mouse pad', 'mousepad', 'adaptador'];
    
    if (audioKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'audio';
    }
    if (instrumentKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'instruments';
    }
    if (techKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'tech';
    }
    if (accessoryKeywords.some(keyword => titleLower.includes(keyword))) {
        return 'accessories';
    }
    
    return 'tech'; // categoria padrão
}

// Exemplo de uso:
// const csvData = "dados da planilha aqui...";
// const amazonProducts = csvToProducts(csvData, 'tech');
// const mercadoLivreProducts = csvToProducts(csvData, 'instruments');
