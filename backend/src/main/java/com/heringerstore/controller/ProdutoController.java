package com.heringerstore.controller;

import com.heringerstore.model.Produto;
import com.heringerstore.service.ProdutoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*@RestController
@RequestMapping("/produtos")
@CrossOrigin
public class ProdutoController {
    @Autowired
    private ProdutoService service;

    @GetMapping
    public List<Produto> listarProdutos() {
        return service.listarProdutos();
    }

}*/

@RestController
@RequestMapping("/produtos")
@CrossOrigin("*") // Permite que seu Front-end acesse o Back-end
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    // GET http://localhost:8080/produtos
    @GetMapping
    public List<Produto> listar() {
        return service.listarProdutos();
    }

    // POST http://localhost:8080/produtos
    // O Admin envia os dados no "corpo" da requisição
    @PostMapping
    public Produto cadastrar(@RequestBody Produto produto) {
        return service.salvarProduto(produto);
    }
}