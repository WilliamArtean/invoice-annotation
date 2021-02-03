package com.ensisa.facture.data;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, Long>{
	
	List<Page> findByType(PageType type);

	Page findById(long id);
}