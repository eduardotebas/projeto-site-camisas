package com.heringerstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private double preco;
    private Integer quantidade;
    private String tamanhos;
    private String imagemUrl; // Caminho da foto (ex: ../imagensicones/psgfrente.jpeg)
    private String categoria; // Para o filtro (ex: temporada, retro, mangalonga)

    // Construtor padrão (Obrigatório para o JPA)
    public Produto() {
    }

    // Construtor completo para facilitar testes
    public Produto(String nome, String descricao, double preco, Integer quantidade, String tamanhos, String imagemUrl, String categoria) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.tamanhos = tamanhos;
        this.imagemUrl = imagemUrl;
        this.categoria = categoria;
    }

    // --- GETTERS AND SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getTamanhos() {
        return tamanhos;
    }

    public void setTamanhos(String tamanhos) {
        this.tamanhos = tamanhos;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}