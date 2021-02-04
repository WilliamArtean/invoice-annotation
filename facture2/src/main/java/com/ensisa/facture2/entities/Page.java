package com.ensisa.facture2.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class Page {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String content;


	protected Page() {
	}

	public Page(String content) {
		this.content=content;
	}

	@Override
	public String toString() {
		return String.format("Page[id=%d, content='%S']", id, content);
	}

	public Long getId() {
		return id;
	}

	
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
