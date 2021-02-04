package com.ensisa.facture.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ensisa.facture.data.Annotation;
import com.ensisa.facture.data.Page;
import com.ensisa.facture.data.PageRepository;
import com.ensisa.facture.data.PageType;




@Service
public class PageService {
	@Autowired
	private PageRepository repository;
	
	public List<Page> getAllPages() {
		return this.repository.findAll();
	}
	
	public Page getByType(PageType type) {
		return this.repository.findByType(type).get(0);//TODO
	}
	
	public Page getById(long id) {
		return this.repository.findById(id);
	}
	
	public Page addAnnotation(Annotation a, Page p) {
		p.addAnnotation(a);
		return this.repository.save(p);
	}
}
