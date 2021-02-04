package com.ensisa.facture.data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
	private PageType type;
	private @OneToMany List<Annotation> annotations;


	protected Page() {
	}

	public Page(String content, PageType type) {
		this.content=content;
		this.type=type;
		this.annotations=new ArrayList<Annotation>();
	}

	@Override
	public String toString() {
		return String.format("Page[id=%d, type='%s', content='%S']", id, type, content);
	}

	public Long getId() {
		return id;
	}

	
	public PageType getType() {
		return type;
	}

	public void setType(PageType type) {
		this.type = type;
	}
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public List<Annotation> getAnnotations() {
		return annotations;
	}
	
	public void addAnnotation(Annotation a) {
		this.annotations.add(a);
	}
}
