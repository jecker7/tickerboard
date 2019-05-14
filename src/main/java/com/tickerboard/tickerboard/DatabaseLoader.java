package com.tickerboard.tickerboard;

import java.util.*;
import java.io.*;
import lombok.Data;
import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.core.io.ClassPathResource;

/**
 * Initializes our JPA StockRepository by reading Stock information from a CSV file and creates
 * entries  in StockRepository for each stock listed in the file as follows:
 *  "String symbol, String companyName, Double price, int id"
 * The "Data" annotation is used by lombok to build getters and setters for our class variables
 * The "@Component" annotation tells Spring Boot to automatically create this component at runtime
 */
@Data
@Component
public class DatabaseLoader implements CommandLineRunner {


    private final StockRepository repository;
    private final String CSVFile = "companylist.csv";
    // Constructor injection and autowiring used to get Spring Data's auto-created StockRepository
    @Autowired
    public DatabaseLoader(StockRepository repository) {
        this.repository = repository;
    }

    /**
     * Parses stocks from the CSV file in fileName and returns a list of
     * @param fileName
     * @return
     */
    public List<Stock> loadCompanyList(String fileName){
        try {
            CsvSchema bootstrapSchema = CsvSchema.emptySchema().withHeader();
            CsvMapper mapper = new CsvMapper();
            File file = new ClassPathResource(fileName).getFile();
            MappingIterator<Stock> readValues =
                    mapper.reader(Stock.class).with(bootstrapSchema).readValues(file);
            return readValues.readAll();
        }
        catch (IOException e){
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    /**
     * Getter for this.companyList
     * @return List<Stock> companyList - a list of company stocks in format:
     * "String symbol, String companyName, Double price, int id"
     */
    public List<Stock> getCompanyList(){
        List<Stock> companyList = this.loadCompanyList(this.CSVFile);
        return companyList;
    }


    /**
     * Function to save our stocks into repository at runtime
     * @param strings - command line args
     * @throws Exception
     */
    // run() method is invoked with command line args to load data
    @Override
    public void run(String... strings) throws Exception {
        List<Stock>stockList = this.loadCompanyList(CSVFile);
        for (Stock oldStock : stockList) {
            this.repository.save(oldStock);
        }
    }
}
