document.getElementById('formProduto').addEventListener('submit', async (e) => {
    e.preventDefault();

    const produto = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        preco: parseFloat(document.getElementById('preco').value),
        quantidade: parseInt(document.getElementById('quantidade').value),
        tamanhos: document.getElementById('tamanhos').value,
        imagemUrl: document.getElementById('imagemUrl').value,
        categoria: document.getElementById('categoria').value
    };

    try {
        const response = await fetch("http://localhost:8080/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });

        if (response.ok) {
            alert("Produto cadastrado com sucesso no MySQL!");
            document.getElementById('formProduto').reset();
        } else {
            alert("Erro ao cadastrar produto.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Servidor Java offline!");
    }
});

// Função para carregar e exibir os produtos na tabela
async function carregarProdutosAdmin() {
    try {
        const response = await fetch("http://localhost:8080/produtos");
        const produtos = await response.json();
        const tabela = document.getElementById('tabelaProdutos');
        
        tabela.innerHTML = produtos.map(p => `
            <tr id="linha-${p.id}">
                <td style="padding: 10px; border: 1px solid #ddd;">${p.id}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${p.nome}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <input type="number" step="0.01" value="${p.preco}" id="edit-preco-${p.id}" style="width: 80px;">
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <input type="text" value="${p.tamanhos}" id="edit-tamanhos-${p.id}" style="width: 100px;">
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <textarea id="edit-desc-${p.id}">${p.descrição || ''}</textarea>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                    <button onclick="salvarEdicao(${p.id})" style="background: #4caf50; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px;">Salvar</button>
                    <button onclick="excluirProduto(${p.id})" style="background: #ff5252; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">Excluir</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Erro ao carregar:", error);
    }
}

async function salvarEdicao(id) {
    const dadosAtualizados = {
        preco: parseFloat(document.getElementById(`edit-preco-${id}`).value),
        tamanhos: document.getElementById(`edit-tamanhos-${id}`).value,
        descricao: document.getElementById(`edit-desc-${id}`).value
    };

    try {
        const response = await fetch(`http://localhost:8080/produtos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            alert("Produto atualizado com sucesso!");
            carregarProdutosAdmin(); // Recarrega para confirmar
        } else {
            alert("Erro ao atualizar.");
        }
    } catch (error) {
        alert("Erro de conexão.");
    }
}

// Função para excluir o produto no banco de dados
async function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir esta camisa?")) {
        try {
            const response = await fetch(`http://localhost:8080/produtos/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Produto removido com sucesso!");
                carregarProdutosAdmin(); // Atualiza a tabela
            } else {
                alert("Erro ao excluir produto.");
            }
        } catch (error) {
            alert("Erro de conexão com o servidor.");
        }
    }
}

// Chama a função ao abrir a página
carregarProdutosAdmin();

// Atualiza o listener do formulário para recarregar a tabela após cadastrar
// (Adicione 'carregarProdutosAdmin()' dentro do 'if (response.ok)' do seu código de cadastro)