package com.heringerstore.service;

import com.heringerstore.model.Produto;
import com.heringerstore.repository.ProdutoRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public List<Produto> listarProdutos() {
        return repository.listar();
    }

}*/

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    // Para o Comprador ver as camisas
    public List<Produto> listarProdutos(){
        return repository.findAll(); // O JPA já tem esse método pronto
    }

    // Para o Admin cadastrar novas camisas
    public Produto salvarProduto(Produto produto) {
        return repository.save(produto);
    }

    public void excluirProduto(Long id) {
    repository.deleteById(id);
}
public Produto buscarPorId(Long id) {
    return repository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
}
}