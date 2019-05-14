package com.tickerboard.tickerboard;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class StockRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private StockRepository stockRepository;

    @Test
    public void whenFindBySymbol_thenReturnStock() {
        Stock Amadeus = new Stock("Amadeus IT", "AMS", 68.08);
        entityManager.persist(Amadeus);
        entityManager.flush();

        Stock found = stockRepository.getStockBySymbol(Amadeus.getSymbol());

        assertThat(found.getName())
                .isEqualTo(Amadeus.getName());
    }
}
