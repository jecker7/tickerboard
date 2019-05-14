package com.tickerboard.tickerboard;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//@Data is a project lombok annotation to automatically build getters, setters, constructors, toString,
// hash, equals, etc. Less boilerplate.
//@Entity is a JPA annotation that denotes the class for storage in relational table

/**
 * Creates a Stock object with following parameters:
 * String "name" - the name of the stock, e.g. "Microsoft Corporation"
 * String "symbol" - 3 or 4 character stock ticker symbol, e.g. "MSFT"
 * Double "price" - a simulated stock price, e.g. "205.45"
 * Long "id" - automatically generated primary key to store the Stock in our JPA repository
 *
 * Annotation @Data is a project lombok annotation that automatically buils all getters, setters, constructors, toString,
 * hash, equals, etc. to reduce boilerplate
 *
 * Annotation @Entity is a JPA annotation that denotes the class for storage in a relational table, our JPA repository
 */
@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Stock {

    //@Id and @GeneratedValue are JPA annotations to set automatically generated primary key "id"
    private @Id @GeneratedValue Long id;
    private String name;
    private String symbol;
    private Double price;

    private Stock() {}

    public Stock(String symbol, Double price) {
        this.symbol = symbol;
        this.price = price;
    }

    public Stock(String name, String symbol, Double price) {
        this.name = name;
        this.symbol = symbol;
        this.price = price;
    }
    @Override
    public String toString() {
        return "Stock{" +
                "symbol=" + symbol +
                ", price=" + price  + '\'' +
                '}';
    }
}
