package com.ensisa.facture.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ensisa.facture.data.Facture;
import com.ensisa.facture.data.FactureRepository;
import com.ensisa.facture.data.Page;



@Service
public class FactureService {
	@Autowired
	private FactureRepository repository;
	
	public List<Facture> getAllFacture() {
		return this.repository.findAll();
	}
	
	public Facture addPage(Page p, Facture f) {
		f.addPage(p);
		return this.repository.save(f);
	}
	
	public Facture getByNumero(String numero) {
		return this.repository.findByNumero(numero).get(0);//TODO
	}

	public Facture getById(String name) {
		return this.repository.findById(Integer.parseInt(name));
	}
}
