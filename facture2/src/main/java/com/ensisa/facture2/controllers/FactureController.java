package com.ensisa.facture2.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ensisa.facture2.entities.Facture;
import com.ensisa.facture2.repositories.FactureRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FactureController {
	
    private final FactureRepository factureRepository;


	public FactureController(FactureRepository factureRepository) {
        this.factureRepository = factureRepository;
    }
    

    @GetMapping("/factures")
    public List<Facture> getFactures() {
        return (List<Facture>) factureRepository.findAll();
    }

    @PostMapping("/factures")
    void addFacture(@RequestBody Facture facture) {
        factureRepository.save(facture);
    }
}
