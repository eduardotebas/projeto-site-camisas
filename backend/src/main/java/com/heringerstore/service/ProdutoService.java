package com.heringerstore.service;

import com.heringerstore.model.Produto;
import com.heringerstore.repository.ProdutoRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public List<Produto> listarProdutos() {
        return repository.listar();
    }

}