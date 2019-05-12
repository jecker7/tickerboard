package com.tickerboard.tickerboard;
import java.beans.Transient;
import java.util.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface StockRepository extends CrudRepository<Stock, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Stock s SET s.price = :newPrice WHERE s.symbol = :symbol")
    void setNewPrice(@Param("newPrice") double newPrice, @Param("symbol") String symbol);

    @Transactional
    @Modifying
    @Query("UPDATE Stock s SET s.price = s.price + :priceChange WHERE s.symbol =:symbol")
    void changeOldPrice(@Param("priceChange") double priceChange, @Param("symbol") String symbol);

    @Query("SELECT s from Stock s WHERE s.symbol = :symbol ")
    Stock getStockBySymbol(@Param("symbol") String symbol);


}
