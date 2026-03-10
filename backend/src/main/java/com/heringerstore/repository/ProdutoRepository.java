package com.heringerstore.repository;

import com.heringerstore.model.Produto;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class ProdutoRepository {

    private List<Produto> produtos = new ArrayList<>();

    public ProdutoRepository() {

        produtos.add(new Produto(1L, "Camisa PSG 24/25", "Temporada", 149.90));
        produtos.add(new Produto(2L, "Camisa Seleção Amarela Copa do Mundo 26/27", "Copa do Mundo", 179.90));
        produtos.add(new Produto(3L, "Camisa Inter de Milão Total 90", "Total 90", 149.90));
        produtos.add(new Produto(4L, "Camisa Alemanha Copa do Mundo 26/27", "Copa do Mundo", 179.90));
        produtos.add(new Produto(5L, "Camisa Futebol Clube do Porto 25/26", "Temporada", 149.90));
    }

    public List<Produto> listar() {
        return produtos;
    }

}