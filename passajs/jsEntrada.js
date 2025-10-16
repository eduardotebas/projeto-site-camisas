const products = {
    // ⚠️ ATUALIZE AQUI COM ARRAY DE IMAGENS ⚠️
    // Use URLs de imagem reais (ou caminhos como 'img/camisa1_frente.jpg')
    temporada: [
        { 
            id: 1, 
            name: 'Camisa Paris Saint-Germain 24/25', 
            description: 'Tecido respirável e leve', 
            price: 149.90, 
            images: [
                '../imagensicones/psgfrente.jpeg',
                '../imagensicones/psgverso.jpeg',
            ]
        },
        { 
            id: 2, 
            name: 'Camisa Branca Clássica', 
            description: 'Perfeita para todos os dias', 
            price: 79.90, 
            images: [
                'https://via.placeholder.com/400x400?text=Branca+1',
                'https://via.placeholder.com/400x400?text=Branca+2'
            ] 
        },
        { 
            id: 3, 
            name: 'Camisa Amarela Vibrante', 
            description: 'Cor vibrante e moderna', 
            price: 94.90, 
            images: [
                'https://via.placeholder.com/400x400?text=Amarela+Frente',
                'https://via.placeholder.com/400x400?text=Amarela+Costas'
            ] 
        },
    ],
    retro: [
        { 
            id: 4, 
            name: 'Camisa Vintage Retrô', 
            description: 'Estilo dos anos 80', 
            price: 179.90, 
            images: [
                'https://via.placeholder.com/400x400?text=Retro+Vintage+1',
                'https://via.placeholder.com/400x400?text=Retro+Vintage+2'
            ] 
        },
        { id: 5, name: 'Camisa Estampa Clássica', description: 'Design retrô autêntico', price: 179.90, images: ['https://via.placeholder.com/400x400?text=Retro+Estampa'] },
        { id: 6, name: 'Camisa Xadrez Vintage', description: 'Padrão dos 90s', price: 179.90, images: ['https://via.placeholder.com/400x400?text=Xadrez+90s'] },
    ],
    mangalonga: [
        { id: 7, name: 'Camisa Manga Longa Preta', description: 'Elegante e sofisticada', price: 179.90, images: ['https://via.placeholder.com/400x400?text=Manga+Longa+Preta'] },
        { id: 8, name: 'Camisa Manga Longa Jeans', description: 'Confortável e versátil', price: 179.90, images: ['https://via.placeholder.com/400x400?text=Manga+Longa+Jeans'] },
        { id: 9, name: 'Camisa Manga Longa Social', description: 'Ideal para trabalho', price: 179.90, images: ['https://via.placeholder.com/400x400?text=Manga+Longa+Social'] },
    ]
};

const categories = [
    { id: 'temporada', name: 'Temporada Atual', icon: '☀️' },
    { id: 'retro', name: 'Retrô', icon: '🕰️' },
    { id: 'mangalonga', name: 'Manga Longa', icon: '🧥' }
];

const sizes = ['P', 'M', 'G', 'GG', 'XG'];
let cart = [];
let currentSlide = 0;
let currentCategory = 'temporada';

// Objeto para rastrear a imagem atual de cada produto, no formato { productId: imageIndex }
let currentImageIndex = {};

// --- NOVAS FUNÇÕES DE CONTROLE DE IMAGEM DO PRODUTO ---

function changeProductImage(productId, direction) {
    const productData = Object.values(products).flatMap(category => category).find(p => p.id === productId);
    
    if (!productData || productData.images.length < 2) return;

    // Inicializa o índice se não existir
    if (currentImageIndex[productId] === undefined) {
        currentImageIndex[productId] = 0;
    }
    
    let newIndex = currentImageIndex[productId] + direction;
    const maxIndex = productData.images.length - 1;

    // Lógica para loop (carrossel)
    if (newIndex > maxIndex) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = maxIndex;
    }
    
    currentImageIndex[productId] = newIndex;

    // Aplica o transform CSS
    const imageContainer = document.getElementById(`productImages-${productId}`);
    if (imageContainer) {
        imageContainer.style.transform = `translateX(-${newIndex * 100}%)`;
    }
}


// --- LÓGICA EXISTENTE DO CAROUSEL (BANNER PRINCIPAL) ---

function initCarousel() {
    const dotsContainer = document.getElementById('carouselControls');
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function goToSlide(n) {
    currentSlide = n;
    updateCarousel();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % 3;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + 3) % 3;
    updateCarousel();
}

// --- CATEGORIAS ---

function renderCategories() {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = categories.map(cat => `
        <li class="category-item">
            <button class="category-btn ${cat.id === 'temporada' ? 'active' : ''}" onclick="filterByCategory('${cat.id}', event)">
                <span class="category-icon">${cat.icon}</span>
                <span>${cat.name}</span>
            </button>
        </li>
    `).join('');
}

function filterByCategory(categoryId, event) {
    currentCategory = categoryId;
    
    // Atualizar botões
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Uso de event.target.closest para garantir que o botão seja ativado
    if (event && event.target) {
        event.target.closest('.category-btn').classList.add('active');
    }

    // Atualizar título
    const categoryName = categories.find(c => c.id === categoryId).name;
    document.getElementById('categoryTitle').textContent = categoryName;

    // Renderizar produtos
    renderProducts();
}


// --- PRODUTOS (ATUALIZADA) ---
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const currentProducts = products[currentCategory];

    grid.innerHTML = currentProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <div class="product-image-container" id="productImages-${product.id}">
                    ${product.images.map((imgUrl, index) => `
                        <img 
                            src="${imgUrl}" 
                            alt="${product.name} - Imagem ${index + 1}" 
                        >
                    `).join('')}
                </div>
                ${product.images.length > 1 ? `
                    <div class="product-image-controls">
                        <button class="image-arrow prev" onclick="changeProductImage(${product.id}, -1)">&#10094;</button>
                        <button class="image-arrow next" onclick="changeProductImage(${product.id}, 1)">&#10095;</button>
                    </div>
                ` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${categories.find(c => c.id === currentCategory).name}</div>
                <div class="product-title">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <div class="size-selector" id="sizes-${product.id}">
                    ${sizes.map(size => `
                        <button class="size-btn" data-size="${size}">${size}</button>
                    `).join('')}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        </div>
    `).join('');

    // Adicionar listeners aos botões de tamanho
    sizes.forEach(size => {
        document.querySelectorAll(`[data-size="${size}"]`).forEach(btn => {
            btn.addEventListener('click', function() {
                this.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
    
    // Resetar ou aplicar o estado inicial do carrossel do produto (opcional)
    currentProducts.forEach(product => {
        const imageContainer = document.getElementById(`productImages-${product.id}`);
        if (imageContainer) {
            // Garante que a primeira imagem (índice 0) esteja visível ao renderizar
            imageContainer.style.transform = `translateX(0%)`;
            currentImageIndex[product.id] = 0; 
        }
    });
}


// --- LÓGICA DE CARRINHO (INALTERADA) ---

function addToCart(productId) {
    const product = Object.values(products).flatMap(category => category).find(p => p.id === productId);
    const sizeBtn = document.querySelector(`#sizes-${productId} .size-btn.selected`);
    
    if (!sizeBtn) {
        alert('Por favor, selecione um tamanho!');
        return;
    }

    const size = sizeBtn.textContent;
    const cartItem = {
        id: Date.now(),
        ...product,
        size,
        category: currentCategory
    };

    cart.push(cartItem);
    updateCart();
    showNotification('Adicionado ao carrinho!');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function updateCart() {
    document.getElementById('cartCount').textContent = cart.length;
    renderCartItems();
}

function renderCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartSummaryDiv = document.getElementById('cartSummary');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="cart-empty">Seu carrinho está vazio</div>';
        cartSummaryDiv.innerHTML = '';
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-size">Tamanho: ${item.size}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remover</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartSummaryDiv.innerHTML = `
        <div class="cart-total">
            <div class="total-line">
                <span>Subtotal:</span>
                <span>R$ ${total.toFixed(2)}</span>
            </div>
            <div class="total-line">
                <span>Frete:</span>
                <span>R$ 15.00</span>
            </div>
            <div class="total-amount">
                <span>Total:</span>
                <span>R$ ${(total + 15).toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">FINALIZAR COMPRA</button>
        </div>
    `;
}

function checkout() {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price, 0) + 15;
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}\n\nObrigado por comprar na Bro Style!`);
    cart = [];
    updateCart();
    document.getElementById('cartModal').classList.remove('active');
}

function showNotification(message) {
    // Mantendo o alert simples, mas idealmente seria um toast/snackbar
    alert(message);
}

// --- LISTENERS E INICIALIZAÇÃO (INALTERADOS) ---

document.getElementById('cartIcon').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('active');
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
});

document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('cartModal')) {
        document.getElementById('cartModal').classList.remove('active');
    }
});

// Auto-play carousel
setInterval(nextSlide, 5000);

// Inicializar
initCarousel();
renderCategories();
renderProducts();
renderCartItems();