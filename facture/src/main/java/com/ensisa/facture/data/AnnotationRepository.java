package com.ensisa.facture.data;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnotationRepository extends JpaRepository<Annotation, Long>{
	
	List<Annotation> findByType(AnnotationType type);

	Annotation findById(long id);
}
