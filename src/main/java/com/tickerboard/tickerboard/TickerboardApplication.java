package com.tickerboard.tickerboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class TickerboardApplication {

	public static void main(String[] args) {

		SpringApplication.run(TickerboardApplication.class, args);
	}

}
