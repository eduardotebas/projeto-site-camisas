package com.heringerstore.repository;

import com.heringerstore.model.Produto;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class ProdutoRepository {

    private List<Produto> produtos = new ArrayList<>();

    public ProdutoRepository() {

        produtos.add(new Produto(1L, "Camisa PSG 24/25", "Tecido respirável", 149.90));
        produtos.add(new Produto(2L, "Camisa Retrô", "Estilo clássico", 179.90));

    }

    public List<Produto> listar() {
        return produtos;
    }

}