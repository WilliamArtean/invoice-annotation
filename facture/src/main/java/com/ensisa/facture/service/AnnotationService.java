package com.ensisa.facture.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ensisa.facture.data.Annotation;
import com.ensisa.facture.data.AnnotationRepository;
import com.ensisa.facture.data.AnnotationType;




@Service
public class AnnotationService {
	@Autowired
	private AnnotationRepository repository;
	
	public List<Annotation> getAllAnnotation() {
		return this.repository.findAll();
	}
	
	public Annotation getByType(AnnotationType type) {
		return this.repository.findByType(type).get(0);//TODO
	}
	
	public Annotation getById(long id) {
		return this.repository.findById(id);
	}
}
