package com.tickerboard.tickerboard;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

//@Data is a project lombok annotation to automatically build getters, setters, constructors, toString,
// hash, equals, etc. Less boilerplate.
//@Entity is a JPA annotation that denotes the class for storage in relational table
@Data
@Entity
public class Stock {

    //@Id and @GeneratedValue are JPA annotations to set automatically generated primary key "id"
    private @Id @GeneratedValue Long id;
    private String name;
    private String symbol;
    private Double price;

    private Stock() {}

    public Stock(String name, String symbol, Double price) {
        this.name = name;
        this.symbol = symbol;
        this.price = price;
    }
}
