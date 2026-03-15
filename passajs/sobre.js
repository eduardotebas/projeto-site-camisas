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
};


const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');

// Abrir carrinho ao clicar no ícone
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
});

// Fechar carrinho ao clicar no X
closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Fechar ao clicar fora da barra branca (no fundo escuro)
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.classList.remove('active');
    }
});



function selectSize(productId, btn) {
    // Remove a seleção de todos os botões daquele produto
    const buttons = document.querySelectorAll(`#sizes-${productId} .size-btn`);
    buttons.forEach(b => b.classList.remove('selected'));
    
    // Adiciona ao botão clicado
    btn.classList.add('selected');
}


document.getElementById('cartIcon').addEventListener('click', () => {
    document.getElementById('sidecart').classList.toggle('active');
});


let cart = JSON.parse(localStorage.getItem('carrinhoSalvo')) || [];



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
    // Mantém sua lógica de atualizar o número no ícone e desenhar os itens
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) cartCountElement.textContent = cart.length;
    
    renderCartItems();
    
    // 💡 A LINHA ESSENCIAL: Salva a lista atualizada no LocalStorage
    localStorage.setItem('carrinhoSalvo', JSON.stringify(cart));
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
function checkout() {
    if (cart.length === 0) return;
    alert(`Compra finalizada! Total: R$ ${(cart.reduce((t, i) => t + i.price, 15)).toFixed(2)}`);
    cart = [];
    updateCart();
}

//NAVEGAR LOGADO

function atualizarInterfaceUsuario() {
    const estaLogado = localStorage.getItem('usuarioLogado');
    const nomeCompleto = localStorage.getItem('usuarioNome');
    const btnLogin = document.getElementById('profileBtn');

    if (estaLogado === 'true' && nomeCompleto && btnLogin) {
        const primeiroNome = nomeCompleto.split(' ')[0];
        
        // Substitui o ícone pelo nome
        btnLogin.innerHTML = `<span class="user-name-logged" style="color: #00CCFF; font-weight: bold;">Olá, ${primeiroNome}</span>`;
        btnLogin.title = "Clique para sair";
        
        // Muda a ação do clique: em vez de abrir modal, ele pergunta se quer sair
        btnLogin.onclick = (e) => {
            e.stopPropagation();
            confirmarLogout();
        };
    } else if (btnLogin) {
        // Caso não esteja logado, garante que o ícone apareça e abra o modal
        btnLogin.innerHTML = "👤";
        btnLogin.onclick = () => {
            document.getElementById('loginModal').classList.add('active');
        };
    }
}

function confirmarLogout() {
    if (confirm("Deseja sair da sua conta?")) {
        localStorage.clear();
        window.location.reload();
    }
}

function logout() {
    localStorage.removeItem('usuarioLogado'); // Apaga o nome
    window.location.reload(); // Recarrega a página para voltar ao ícone
}


//PARTE DA FUNCAO LOGIN
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


window.onload = () => {
    renderAllProducts(); // Carrega os produtos da página camisas
    updateCart();        // Atualiza o contador do carrinho
    atualizarInterfaceUsuario(); // Checa se tem alguém logado e troca o ícone pelo nome
};