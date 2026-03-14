/*package com.heringerstore.repository;

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
        produtos.add(new Produto(6L, "Camisa Seleção Brasileira 2 - Jordan", "Copa do Mundo", 179.90));
    }

    public List<Produto> listar() {
        return produtos;
    }

}*/

package com.heringerstore.repository;

import com.heringerstore.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    // Pronto! O JpaRepository já vem com métodos como:
    // save() -> Salva no banco
    // findAll() -> Lista tudo
    // deleteById() -> Deleta
    // findById() -> Busca um só
}