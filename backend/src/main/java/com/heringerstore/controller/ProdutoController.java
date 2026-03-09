package com.heringerstore.controller;

import com.heringerstore.model.Produto;
import com.heringerstore.service.ProdutoService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin
public class ProdutoController {

    private ProdutoService service = new ProdutoService();

    @GetMapping
    public List<Produto> listarProdutos(){
        return service.listarProdutos();
    }

}