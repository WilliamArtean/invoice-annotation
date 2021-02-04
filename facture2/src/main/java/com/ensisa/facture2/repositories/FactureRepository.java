package com.ensisa.facture2.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ensisa.facture2.entities.Facture;

@Repository
public interface FactureRepository extends CrudRepository<Facture, Long>{

}
