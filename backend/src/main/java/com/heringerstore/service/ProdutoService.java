package com.heringerstore.service;

import com.heringerstore.model.Produto;
import com.heringerstore.repository.ProdutoRepository;
import java.util.List;

public class ProdutoService {

    private ProdutoRepository repository = new ProdutoRepository();

    public List<Produto> listarProdutos(){
        return repository.listar();
    }

}