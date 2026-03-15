package com.heringerstore.controller;

import com.heringerstore.model.Produto;
import com.heringerstore.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin("*") 
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @GetMapping
    public List<Produto> listar() {
        return service.listarProdutos();
    }

    @PostMapping
    public Produto cadastrar(@RequestBody Produto produto) {
        return service.salvarProduto(produto);
    }

    // O método deve ficar DENTRO da classe
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable Long id) {
        service.excluirProduto(id); // Chamando via Service para manter o padrão
        return ResponseEntity.noContent().build();
    }

    // PUT http://localhost:8080/produtos/{id}
@PutMapping("/{id}")
public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto detalhesProduto) {
    Produto produtoExistente = service.buscarPorId(id); // Você precisará criar esse método no Service
    
    produtoExistente.setPreco(detalhesProduto.getPreco());
    produtoExistente.setTamanhos(detalhesProduto.getTamanhos());
    produtoExistente.setDescricao(detalhesProduto.getDescricao());
    
    Produto atualizado = service.salvarProduto(produtoExistente);
    return ResponseEntity.ok(atualizado);
}
}