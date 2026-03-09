package com.heringerstore.controller;

import com.heringerstore.model.Produto;
import com.heringerstore.service.ProdutoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin
public class ProdutoController {
    @Autowired
    private ProdutoService service;

    @GetMapping
    public List<Produto> listarProdutos() {
        return service.listarProdutos();
    }

}