package com.ensisa.facture.data;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long>{
	
	List<Facture> findByNumero(String numero);

	Facture findById(long id);
}
