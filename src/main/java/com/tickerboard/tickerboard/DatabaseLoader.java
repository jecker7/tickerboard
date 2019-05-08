package com.tickerboard.tickerboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// Spring's @Component annotation lets @SpringBootAppliaction automatically pick up the component
// and the component is automatically created upon execution of program
// CommandLineRunner is implemented so that it gets run after all the beans are created and registered
@Component
public class DatabaseLoader implements CommandLineRunner {


    private final StockRepository repository;

    // Constructor injection and autowiring used to get Spring Data's auto-created StockRepository
    @Autowired
    public DatabaseLoader(StockRepository repository) {
        this.repository = repository;
    }

    // run() method is invoked with command line args to load data
    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Stock("Apple, Inc.", "AAPL", 245.0));
    }
}
