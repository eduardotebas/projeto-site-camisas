// ---- DADOS (COPIADOS DO SEU CÓDIGO ORIGINAL) ----
const products = {
    temporada: [
        { id: 1, name: 'Camisa Paris Saint-Germain 24/25', description: 'Temporada', price: 149.90, images: ['../imagensicones/psgfrente.jpeg', '../imagensicones/psgverso.jpeg'] },
        { id: 2, name: 'Camisa Inter de Milão III - Total 90', description: 'Total 90', price: 149.90, images: ['../imagensicones/intermilaototal90.png', '../imagensicones/intermilaototal90verso.png'] },
        { id: 3, name: 'Camisa Amarela Seleção Copa Do Mundo 26/27', description: 'Copa do Mundo', price: 179.90, images: ['../imagensicones/CamisaBrasaCopadoMundo.png', '../imagensicones/CamisaBrasaCopadoMundoVerso.png'] },
        { id: 4, name: 'Camisa Alemanha Copa Do Mundo 26/27', description: 'Copa do Mundo', price: 179.90, images: ['../imagensicones/CamisaAlemanhaCopa2.png', '../imagensicones/CamisaAlemanhaCopaVerso.png', '../imagensicones/CamisaAlemanhaCopa.png'] },
        { id: 5, name: 'Camisa FC Porto 25/26', description: 'Temporada', price: 149.90, images: ['../imagensicones/CamisaPorto.png', '../imagensicones/CamisaPortoVerso.png'] },
    ],
    retro: [
        { id: 6, name: 'Camisa Barcelona 17/18', description: 'Retrô', price: 179.90, images: ['https://via.placeholder.com/400x400?text=Retro+Vintage+1'] },
        { id: 7, name: 'Camisa Estampa Clássica', description: 'Design retrô autêntico', price: 179.90, images: ['https://via.placeholder.com/400x400?text=Retro+Estampa'] },
    ],
    mangalonga: [
        { id: 8, name: 'Camisa Manga Longa Preta', description: 'Elegante e sofisticada', price: 179.90, images: ['https://via.placeholder.com/400x400?text=Manga+Longa+Preta'] },
        { id: 9, name: 'Camisa Manga Longa Jeans', description: 'Confortável e versátil', price: 179.90, images: ['https://via.placeholder.com/400x400?text=Manga+Longa+Jeans'] },
    ]
};

const sizes = ['P', 'M', 'G', 'GG'];
let cart = [];
let currentImageIndex = {};

// ---- RENDERIZAÇÃO ----
function renderAllProducts() {
    const allProducts = Object.values(products).flat();
    const grid = document.getElementById('productsGrid');

    grid.innerHTML = allProducts.map(p => `
        <div class="product-card">
            <div class="product-image">
                <div class="product-image-container" id="productImages-${p.id}">
                    ${p.images.map(img => `<img src="${img}" alt="${p.name}">`).join('')}
                </div>
                ${p.images.length > 1 ? `
                    <div class="product-image-controls">
                        <button class="image-arrow prev" onclick="changeProductImage(${p.id}, -1)">&#10094;</button>
                        <button class="image-arrow next" onclick="changeProductImage(${p.id}, 1)">&#10095;</button>
                    </div>
                ` : ''}
            </div>
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-description">${p.description}</div>
                <div class="product-price">R$ ${p.price.toFixed(2)}</div>
                <div class="size-selector" id="sizes-${p.id}">
                    ${sizes.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('')}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${p.id})">Adicionar ao Carrinho</button>
            </div>
        </div>
    `).join('');

    sizes.forEach(size => {
        document.querySelectorAll(`[data-size="${size}"]`).forEach(btn => {
            btn.addEventListener('click', function () {
                this.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
}

// ---- CONTROLE DE IMAGEM ----
function changeProductImage(productId, direction) {
    const productData = Object.values(products).flat().find(p => p.id === productId);
    if (!productData || productData.images.length < 2) return;

    if (currentImageIndex[productId] === undefined) currentImageIndex[productId] = 0;
    let newIndex = currentImageIndex[productId] + direction;
    const maxIndex = productData.images.length - 1;

    if (newIndex > maxIndex) newIndex = 0;
    else if (newIndex < 0) newIndex = maxIndex;
    currentImageIndex[productId] = newIndex;

    const imageContainer = document.getElementById(`productImages-${productId}`);
    imageContainer.style.transform = `translateX(-${newIndex * 100}%)`;
}

// ---- CARRINHO ----
function addToCart(productId) {
    const product = Object.values(products).flat().find(p => p.id === productId);
    const sizeBtn = document.querySelector(`#sizes-${productId} .size-btn.selected`);
    if (!sizeBtn) return alert('Selecione um tamanho!');
    const size = sizeBtn.textContent;
    const cartItem = { ...product, id: Date.now(), size };
    cart.push(cartItem);
    updateCart();
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
    const container = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty">Seu carrinho está vazio</div>';
        summary.innerHTML = '';
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <div class="cart-item-name">${item.name}</div>
                <div>Tamanho: ${item.size}</div>
                <div>R$ ${item.price.toFixed(2)}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remover</button>
        </div>
    `).join('');
    const total = cart.reduce((t, i) => t + i.price, 0);
    summary.innerHTML = `
        <div class="cart-total">
            <div>Subtotal: R$ ${total.toFixed(2)}</div>
            <div>Frete: R$ 15.00</div>
            <div class="total-amount">Total: R$ ${(total + 15).toFixed(2)}</div>
            <button class="checkout-btn" onclick="checkout()">Finalizar Compra</button>
        </div>
    `;
}
async function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.preco, 0) + 15;
    
    // Criamos o resumo dos itens para salvar no banco
    const resumoItens = cart.map(item => `${item.nome} (${item.size})`).join(", ");

    const novoPedido = {
        emailCliente: "cliente_teste@email.com", // Por enquanto fixo para teste
        itens: resumoItens,
        valorTotal: total
    };

    console.log("Tentando enviar pedido:", novoPedido); // Para debug no F12

    try {
        const response = await fetch("http://localhost:8080/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoPedido)
        });

        if (response.ok) {
            alert(`PEDIDO CONFIRMADO!\nTotal: R$ ${total.toFixed(2)}`);
            cart = [];
            updateCart();
            document.getElementById('cartModal').classList.remove('active');
        } else {
            const erroTxt = await response.text();
            alert("Erro no servidor: " + erroTxt);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro crítico: O servidor Java (Backend) está desligado!");
    }
}

// ---- EVENTOS ----
document.getElementById('cartIcon').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('active');
});
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
});
document.getElementById('cartModal').addEventListener('click', e => {
    if (e.target.id === 'cartModal') document.getElementById('cartModal').classList.remove('active');
});

// ---- INICIALIZAÇÃO ----
renderAllProducts();
updateCart();




//FUNCIONAMENTO DO LOGIN/CADASTRO POR ABA LATERAL

// Seletores
const loginModal = document.getElementById('loginModal');
const profileBtn = document.getElementById('profileBtn'); // Seleciona o botão dentro da div btn-login
const closeLogin = document.getElementById('closeLogin');

// Abrir Modal de Login
profileBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
});

// Fechar Modal de Login
closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

// Função para alternar entre Login e Cadastro
function switchTab(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');

    if (type === 'login') {
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Fechar ao clicar fora (opcional, mas recomendado)
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.classList.remove('active');
    }
});