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

// Spring's @Component annotation lets @SpringBootAppliaction automatically pick up the component
// and the component is automatically created upon execution of program
// CommandLineRunner is implemented so that it gets run after all the beans are created and registered
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
    // method to load our stocks from a CSV file
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

    public List<Stock> getCompanyList(){
        List<Stock> companyList = this.loadCompanyList(this.CSVFile);
        return companyList;
    }



    // run() method is invoked with command line args to load data
    @Override
    public void run(String... strings) throws Exception {
        List<Stock>stockList = this.loadCompanyList(CSVFile);
        for (Stock oldStock : stockList)
            this.repository.save(oldStock);
    }
}
