package com.heringerstore.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emailCliente;
    
    @Column(columnDefinition = "TEXT")
    private String itens; // Guardaremos o resumo dos produtos aqui

    private Double valorTotal;
    private LocalDateTime dataPedido = LocalDateTime.now();

    // Getters e Setters
    public Long getId() { return id; }
    public String getEmailCliente() { return emailCliente; }
    public void setEmailCliente(String emailCliente) { this.emailCliente = emailCliente; }
    public String getItens() { return itens; }
    public void setItens(String itens) { this.itens = itens; }
    public Double getValorTotal() { return valorTotal; }
    public void setValorTotal(Double valorTotal) { this.valorTotal = valorTotal; }
    public LocalDateTime getDataPedido() { return dataPedido; }
}