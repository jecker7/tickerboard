package com.tickerboard.tickerboard;
import java.beans.Transient;
import java.util.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * JPA Repository to store Stock data with prices
 * contains queries to set new prices, get old prices, and
 * retrieve a stock by symbol from DB
 */
public interface StockRepository extends CrudRepository<Stock, Long> {


    /**
     * sets a new price "newPrice" for a Stock in our database with symbol "symbol"
     * @param newPrice: a Double specifying new price to set
     * @param symbol: String "symbol" of the Stock to change
     */
    @Transactional
    @Modifying
    @Query("UPDATE Stock s SET s.price = :newPrice WHERE s.symbol = :symbol")
    void setNewPrice(@Param("newPrice") double newPrice, @Param("symbol") String symbol);

    /**
     * updates price for a Stock in our database with symbol "symbol" by adding value "priceChange"
     * @param priceChange: a Double which is added to our current price
     * @param symbol: String "symbol" of the Stock to change
     */
    @Transactional
    @Modifying
    @Query("UPDATE Stock s SET s.price = s.price + :priceChange WHERE s.symbol =:symbol")
    void changeOldPrice(@Param("priceChange") double priceChange, @Param("symbol") String symbol);

    /**
     * Selects Stock with symbol "symbol"
     * @param symbol: String "symbol" of the Stock to get
     */
    @Query("SELECT s from Stock s WHERE s.symbol = :symbol ")
    Stock getStockBySymbol(@Param("symbol") String symbol);


}
