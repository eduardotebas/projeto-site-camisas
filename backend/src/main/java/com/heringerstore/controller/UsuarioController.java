package com.heringerstore.controller;

import com.heringerstore.model.Usuario;
import com.heringerstore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    
    @GetMapping
    public List<Usuario> listar() {
        return repository.findAll();
    }

    // --- NOVO MÉTODO: LOGIN ---
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario dadosLogin) {
        // Busca o usuário pelo email no banco de dados
        Optional<Usuario> usuarioDb = repository.findAll().stream()
            .filter(u -> u.getEmail().equals(dadosLogin.getEmail()) && u.getSenha().equals(dadosLogin.getSenha()))
            .findFirst();

        if (usuarioDb.isPresent()) {
            // Se achou o usuário com email e senha iguais, retorna 200 (OK)
            return ResponseEntity.ok(usuarioDb.get());
        } else {
            // Se não achou, retorna 401 (Não autorizado)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}