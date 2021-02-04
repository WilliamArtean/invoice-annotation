package com.ensisa.facture2;

import java.time.LocalDateTime;
import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ensisa.facture2.entities.Facture;
import com.ensisa.facture2.repositories.FactureRepository;

@SpringBootApplication
public class Facture2Application {

	public static void main(String[] args) {
		SpringApplication.run(Facture2Application.class, args);
	}
	
	@Bean
    CommandLineRunner init(FactureRepository factureRepository) {
        return args -> {
            Stream.of("INV1000", "INV1001", "INV1002", "INV1003", "INV1004").forEach(number -> {
                Facture facture = new Facture(number, LocalDateTime.now().toString());
                factureRepository.save(facture);
            });
            factureRepository.findAll().forEach(System.out::println);
        };
    }

}
