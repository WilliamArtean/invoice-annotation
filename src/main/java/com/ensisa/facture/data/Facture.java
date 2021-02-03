package com.ensisa.facture.data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Facture {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private LocalDateTime date;
	private String numero;
	private @OneToMany List<Page> pages;
	

	protected Facture() {
	}

	public Facture(String numero) {
		this.numero = numero;
		this.date=LocalDateTime.now();
		this.pages=new ArrayList<Page>();
	}

	@Override
	public String toString() {
		return String.format("Facture[id=%d, numero='%s', date='%s']", id, numero, date);
	}

	public Long getId() {
		return id;
	}
	
	public LocalDateTime getDate() {
		return this.date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}


	public List<Page> getPages() {
		return pages;
	}
	
	public void addPage(Page p) {
		this.pages.add(p);
	}

}
