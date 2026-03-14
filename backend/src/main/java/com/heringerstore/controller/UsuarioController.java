package com.heringerstore.controller;

import com.heringerstore.model.Usuario;
import com.heringerstore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    public Usuario cadastrar(@RequestBody Usuario usuario) {
        return repository.save(usuario);
    }
    
    // DICA: Adicione este método abaixo para conseguir listar os usuários depois
    @GetMapping
    public java.util.List<Usuario> listar() {
        return repository.findAll();
    }
}