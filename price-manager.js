
// Sistema de gerenciamento de preços manual
class PriceManager {
    constructor() {
        this.isEditing = false;
        this.init();
    }

    init() {
        this.createPriceEditInterface();
    }

    createPriceEditInterface() {
        // Botão para ativar modo de edição de preços
        const editButton = document.createElement('button');
        editButton.id = 'togglePriceEdit';
        editButton.textContent = '✏️ Editar Preços';
        editButton.style.cssText = `
            position: fixed;
            top: 70px;
            right: 10px;
            z-index: 1000;
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;

        editButton.onclick = () => this.toggleEditMode();
        document.body.appendChild(editButton);
    }

    toggleEditMode() {
        this.isEditing = !this.isEditing;
        const button = document.getElementById('togglePriceEdit');
        
        if (this.isEditing) {
            button.textContent = '💾 Salvar Preços';
            button.style.background = '#dc3545';
            this.enablePriceEditing();
        } else {
            button.textContent = '✏️ Editar Preços';
            button.style.background = '#28a745';
            this.disablePriceEditing();
        }
    }

    enablePriceEditing() {
        const priceElements = document.querySelectorAll('.current-price');
        
        priceElements.forEach((priceEl, index) => {
            const currentPrice = priceEl.textContent.replace('R$ ', '').replace(',', '.');
            const productCard = priceEl.closest('.product-card');
            
            // Criar input para edição
            const input = document.createElement('input');
            input.type = 'number';
            input.step = '0.01';
            input.value = parseFloat(currentPrice) || 0;
            input.style.cssText = `
                width: 80px;
                padding: 3px;
                border: 1px solid #ddd;
                border-radius: 3px;
                font-size: 14px;
            `;
            
            // Adicionar dados do produto ao input
            if (productCard) {
                const title = productCard.querySelector('.product-title')?.textContent;
                const link = productCard.querySelector('.product-link')?.href;
                input.dataset.productTitle = title;
                input.dataset.productLink = link;
            }
            
            priceEl.style.display = 'none';
            priceEl.parentNode.insertBefore(input, priceEl.nextSibling);
        });
    }

    disablePriceEditing() {
        const inputs = document.querySelectorAll('input[type="number"]');
        
        inputs.forEach(async (input) => {
            const newPrice = parseFloat(input.value) || 0;
            const priceEl = input.previousSibling;
            
            // Atualizar o display
            priceEl.textContent = `R$ ${newPrice.toFixed(2).replace('.', ',')}`;
            priceEl.style.display = 'inline';
            
            // Atualizar no banco de dados
            await this.updatePriceInDatabase(input.dataset.productTitle, input.dataset.productLink, newPrice);
            
            // Remover input
            input.remove();
        });
    }

    async updatePriceInDatabase(title, link, newPrice) {
        try {
            if (!supabaseClient) {
                console.error('Supabase client not available');
                return;
            }

            // Determinar plataforma pelo link
            let platform = 'aliexpress';
            if (link.includes('amazon') || link.includes('amzn.to')) {
                platform = 'amazon';
            } else if (link.includes('mercadolivre') || link.includes('mercadolibre')) {
                platform = 'mercadolivre';
            }

            const tableName = productService.getTableName(platform);
            
            const { data, error } = await supabaseClient
                .from(tableName)
                .update({ price: newPrice })
                .eq('title', title)
                .eq('link', link);

            if (error) {
                console.error('Erro ao atualizar preço:', error);
            } else {
                console.log(`✅ Preço atualizado: ${title} - R$ ${newPrice}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar preço no banco:', error);
        }
    }

    // Função para obter preço real de um link manualmente
    async getManualPrice(url) {
        const userPrice = prompt(`Cole o link do produto e informe o preço atual:\n\nLink: ${url}\n\nDigite o preço (ex: 25.90):`);
        
        if (userPrice && !isNaN(parseFloat(userPrice))) {
            return parseFloat(userPrice);
        }
        
        return null;
    }

    // Atualizar todos os preços manualmente
    async updateAllPricesManually() {
        if (!confirm('Deseja atualizar os preços de todos os produtos manualmente?')) {
            return;
        }

        const allProducts = await productService.getAllProducts();
        
        for (const product of allProducts) {
            if (product.link) {
                console.log(`\n📋 Produto: ${product.title}`);
                console.log(`🔗 Link: ${product.link}`);
                
                const newPrice = await this.getManualPrice(product.link);
                
                if (newPrice) {
                    await productService.updateProduct(product.id, { price: newPrice }, product.platform);
                    console.log(`✅ Preço atualizado: R$ ${newPrice}`);
                } else {
                    console.log('❌ Preço não informado, pulando...');
                }
            }
        }
        
        // Recarregar página para mostrar novos preços
        window.location.reload();
    }
}

// Função global para atualização manual de preços
window.updateAllPricesManually = async function() {
    const priceManager = new PriceManager();
    await priceManager.updateAllPricesManually();
};

// Inicializar apenas em desenvolvimento
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname === 'localhost' || 
        window.location.hostname.includes('replit') || 
        window.location.hostname.includes('repl.co')) {
        
        // Aguardar um pouco para garantir que outros scripts carregaram
        setTimeout(() => {
            new PriceManager();
        }, 1000);
    }
});
