/*const products = {
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
            name: 'Camisa Inter de Milão III - Total 90',
            description: 'Total 90',
            price: 149.90,
            images: [
                '../imagensicones/intermilaototal90.png',
                '../imagensicones/intermilaototal90verso.png'
            ]
        },
        {
            id: 3,
            name: 'Camisa Amarela Seleção Copa Do Mundo 26/27',
            description: 'Copa do Mundo',
            price: 179.90,
            images: [
                '../imagensicones/CamisaBrasaCopadoMundo.png',
                '../imagensicones/CamisaBrasaCopadoMundoVerso.png'
            ]
        },
         {
            id: 4,
            name: 'Camisa Alemanha Copa Do Mundo 26/27',
            description: 'Copa do Mundo', price: 179.90, 
            images:[
                '../imagensicones/CamisaAlemanhaCopa2.png',
                '../imagensicones/CamisaAlemanhaCopaVerso.png',
                '../imagensicones/CamisaAlemanhaCopa.png'
            ]},
             { 
                id: 5,
                 name: 'Camisa FC Porto 25/26',
                  description: 'Temporada',
                   price: 149.90,
                    images: [
                        '../imagensicones/CamisaPorto.png',
                        '../imagensicones/CamisaPortoVerso.png'
                    ] },
    ],
    retro: [
        { id: 6,
         name: 'Camisa Barcelona 17/18',
         description: 'Retrô', price: 179.90,
         images: [
            'https://via.placeholder.com/400x400?text=Retro+Vintage+1'
        ] },
        {
             id: 7,
             name: 'Camisa Estampa Clássica',
             description: 'Design retrô autêntico',
             price: 179.90,
             images: ['https://via.placeholder.com/400x400?text=Retro+Estampa'      
     ] },
        { id: 8,
             name: 'Camisa Xadrez Vintage',
             description: 'Padrão dos 90s',
             price: 179.90, images: [
                'https://via.placeholder.com/400x400?text=Xadrez+90s'
            ] },
    ],
    mangalonga: [
        { id: 9,
            name: 'Camisa Manga Longa Preta',
            description: 'Elegante e sofisticada',
            price: 179.90,
            images: [
                'https://via.placeholder.com/400x400?text=Manga+Longa+Preta'
            ] },
        { id: 10,
            name: 'Camisa Manga Longa Jeans',
            description: 'Confortável e versátil',
            price: 179.90,
            images: [
                'https://via.placeholder.com/400x400?text=Manga+Longa+Jeans'

            ] },
        { id: 11,
            name: 'Camisa Manga Longa Social',
            description: 'Ideal para trabalho',
            price: 179.90,
            images: [
                'https://via.placeholder.com/400x400?text=Manga+Longa+Social'
            ] },
    ]
};*/

document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const profileBtn = document.getElementById('profileBtn');
    const closeLogin = document.getElementById('closeLogin');

    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    }

    if (closeLogin) {
        closeLogin.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });
    }
});

let productsFromDB = [];

const categories = [
    { id: 'temporada', name: 'Temporada Atual', icon: '☀️' },
    { id: 'retro', name: 'Retrô', icon: '🕰️' },
    { id: 'mangalonga', name: 'Manga Longa', icon: '🧥' }
];

const sizes = ['P', 'M', 'G', 'GG'];
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
    if (!grid) return;

    // Filtro seguro: verifica se p.categoria existe antes de tratar o texto
    const currentProducts = productsFromDB.filter(p => {
        if (!p.categoria) return false; 
        return p.categoria.trim().toLowerCase() === currentCategory.trim().toLowerCase();
    });

    if (currentProducts.length === 0) {
        grid.innerHTML = '<div class="cart-empty">Nenhuma camisa nesta categoria.</div>';
        return;
    }

    grid.innerHTML = currentProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.imagemUrl || ''}" alt="${product.nome}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="product-info">
                <div class="product-category">${(product.categoria || 'Geral').toUpperCase()}</div>
                <div class="product-title">${product.nome || 'Sem nome'}</div>
                <div class="product-description">${product.descricao || ''}</div>
                <div class="product-price">R$ ${(product.preco || 0).toFixed(2)}</div>
                
                <div class="size-selector" id="sizes-${product.id}">
                    ${(product.tamanhos || 'P,M,G').split(',').map(size => `
                        <button class="size-btn" data-size="${size.trim()}">${size.trim()}</button>
                    `).join('')}
                </div>
                
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        </div>
    `).join('');

    adicionarListenersTamanho();
}


function adicionarListenersTamanho() {
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}
// Adicionar listeners aos botões de tamanho
sizes.forEach(size => {
    document.querySelectorAll(`[data-size="${size}"]`).forEach(btn => {
        btn.addEventListener('click', function () {
            this.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});



// --- LÓGICA DE CARRINHO (INALTERADA) ---
function addToCart(productId) {
    // 💡 IMPORTANTE: Mudamos de 'products' para 'productsFromDB'
    const product = productsFromDB.find(p => p.id === productId);

    const sizeBtn = document.querySelector(`#sizes-${productId} .size-btn.selected`);

    if (!sizeBtn) {
        alert('Por favor, selecione um tamanho!');
        return;
    }

    const size = sizeBtn.textContent;
    const cartItem = {
        id: Date.now(),
        productId: product.id,
        name: product.nome, // Adequando ao nome que vem do Java (nome)
        price: product.preco, // Adequando ao nome que vem do Java (preco)
        size: size
    };

    cart.push(cartItem);
    updateCart();
    alert('Adicionado ao carrinho!');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function updateCart() {
    // Mantém sua lógica de atualizar o número no ícone e desenhar os itens
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) cartCountElement.textContent = cart.length;
    
    renderCartItems();
    
    // 💡 A LINHA ESSENCIAL: Salva a lista atualizada no LocalStorage
    localStorage.setItem('carrinhoSalvo', JSON.stringify(cart));
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

// Função para verificar se existe alguém logado e atualizar a interface
function verificarStatusLogin() {
    const estaLogado = localStorage.getItem('usuarioLogado');
    const nomeCompleto = localStorage.getItem('usuarioNome');
    const btnLogin = document.getElementById('profileBtn');

    if (estaLogado === 'true' && nomeCompleto) {
        // Pega apenas o primeiro nome
        const primeiroNome = nomeCompleto.split(' ')[0];
        
        // Substitui o ícone 👤 pelo nome da pessoa
        btnLogin.innerHTML = `<span class="user-name-logged">${primeiroNome}</span>`;
        btnLogin.title = "Clique para sair";
        
        // Muda o comportamento do botão para "Logout" caso ele clique de novo
        btnLogin.onclick = confirmarLogout;
    }
}

function confirmarLogout() {
    if (confirm("Deseja sair da sua conta?")) {
        localStorage.clear(); // Limpa tudo
        window.location.reload(); // Recarrega a página para voltar ao estado inicial
    }
}

// Chame essa função assim que o script carregar ou no window.onload
document.addEventListener('DOMContentLoaded', verificarStatusLogin);

async function checkout() {
    if (cart.length === 0) return;

    const emailLogado = localStorage.getItem('usuarioEmail');

    if (!emailLogado) {
        alert("Você precisa estar logado para finalizar a compra!");
        document.getElementById('loginModal').classList.add('active');
        return;
    }

    // CORREÇÃO: Usando 'item.price' que é como você salvou no addToCart
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const totalComFrete = subtotal + 15;

    // Formatação da lista de itens para o banco de dados
    const resumoItens = cart.map(item => `- ${item.name} (Tam: ${item.size})`).join("\n");

    const novoPedido = {
        emailCliente: emailLogado,
        itens: resumoItens,
        valorTotal: totalComFrete
    };

    try {
        const response = await fetch("http://localhost:8080/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoPedido)
        });

        if (response.ok) {
            // ALERTA CORRIGIDO: Agora o valor aparecerá certinho
            alert(`Pedido Confirmado para ${emailLogado}!\n\nItens:\n${resumoItens}\n\nTotal com Frete: R$ ${totalComFrete.toFixed(2)}`);
            
            cart = [];
            updateCart();
            document.getElementById('cartModal').classList.remove('active');
        } else {
            alert("Erro ao processar o pedido no servidor.");
        }
    } catch (error) {
        alert("Servidor indisponível!");
    }
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
//renderProducts();
renderCartItems();

// Remova a chamada solta de renderProducts() que estava aqui

async function carregarProdutos() {
    try {
        const resposta = await fetch("http://localhost:8080/produtos");
        if (!resposta.ok) throw new Error("Erro ao buscar produtos");

        const dados = await resposta.json();

        // 💡 Use o nome exato da variável que o seu renderProducts usa:
        productsFromDB = dados;

        renderProducts(); // Agora ele vai desenhar as camisas na tela
    } catch (erro) {
        console.error("Erro de conexão:", erro);
        document.getElementById('productsGrid').innerHTML =
            '<div class="cart-empty">Servidor offline. Ligue o Spring Boot!</div>';
    }
}

// Iniciar o carregamento
carregarProdutos();

//PARA QUE O CADASTRO FUNCIONE

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoUsuario = {
        nome: e.target.querySelector('input[type="text"]').value,
        email: e.target.querySelector('input[type="email"]').value,
        senha: e.target.querySelector('input[type="password"]').value,
        perfil: "COMPRADOR" // Padrão para quem se cadastra no site
    };

    const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario)
    });

    if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        switchTab('login');
    } else {
        alert("Erro ao cadastrar.");
    }
});

// PARA QUE O LOGIN FUNCIONE, SALVE OS DADOS E MOSTRE O NOME
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const loginData = {
        email: e.target.querySelector('input[type="email"]').value,
        senha: e.target.querySelector('input[type="password"]').value
    };

    try {
        const response = await fetch("http://localhost:8080/usuarios/login", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const usuario = await response.json();
            
            // 💡 AQUI ESTÁ A MÁGICA: Salva tudo na memória do navegador
            localStorage.setItem('usuarioLogado', 'true');
            localStorage.setItem('usuarioEmail', usuario.email);
            localStorage.setItem('usuarioNome', usuario.nome);

            alert(`Bem-vindo, ${usuario.nome}!`);
            
            // Fecha o modal e atualiza o ícone para o nome da pessoa
            loginModal.classList.remove('active');
            verificarStatusLogin(); 
        } else {
            alert("Email ou senha incorretos.");
        }
    } catch (error) {
        alert("Erro ao conectar com o servidor para login.");
    }
});

window.onload = () => {
    initCarousel();
    renderCategories();
    carregarProdutos();
    updateCart();
    verificarStatusLogin(); // 💡 Adicione isso aqui para ele checar o nome ao abrir a página
    
    // ... resto do seu código de cartIcon ...
};


//VERIFICA LOGIN

function verificarLogin() {
    const nomeSalvo = localStorage.getItem('usuarioLogado');
    const areaPerfil = document.getElementById('area-perfil');

    if (nomeSalvo) {
        // Se houver um nome, substitui o ícone pelo nome + um botão de sair
        areaPerfil.innerHTML = `
            <span style="color: white; margin-right: 10px; font-weight: bold;">
                Olá, ${nomeSalvo}
            </span>
            <button onclick="logout()" style="background:none; border:none; color:#00CCFF; cursor:pointer; font-size: 12px;">
                (Sair)
            </button>
        `;
    }
}

function logout() {
    localStorage.removeItem('usuarioLogado'); // Apaga o nome
    window.location.reload(); // Recarrega a página para voltar ao ícone
}

// Executa a função toda vez que a página abrir
window.onload = verificarLogin;



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

function toggleLogin() {
    const drawer = document.getElementById('loginDrawer');
    const overlay = document.getElementById('overlay');
    
    // Adiciona ou remove a classe 'active' para animar
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Fechar ao clicar fora (opcional, mas recomendado)
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

// Garante que o código só rode quando o HTML estiver pronto
window.onload = () => {
    initCarousel();
    renderCategories();
    carregarProdutos(); // Carrega do banco
    updateCart();

    // Evento do Carrinho
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    if(cartIcon && cartModal) {
        cartIcon.onclick = () => cartModal.classList.add('active');
    }
};