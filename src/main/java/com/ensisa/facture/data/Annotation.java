package com.ensisa.facture.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Annotation {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private int posX;
	private int posY;
	private AnnotationType type;

	protected Annotation() {
	}

	public Annotation(int posX, int posY, AnnotationType type) {
		this.posX = posX;
		this.posY = posY;
		this.type=type;
	}

	@Override
	public String toString() {
		return String.format("Annotation[id=%d, posX='%s', posY='%s', type='%s']", id, posX, posY, type);
	}

	public Long getId() {
		return id;
	}

	public int getPosX() {
		return posX;
	}

	public int getPosY() {
		return posY;
	}

	public void setPosX(int posX) {
		this.posX = posX;
	}

	public void setPosY(int posY) {
		this.posY = posY;
	}
	
	public AnnotationType getType() {
		return type;
	}

	public void setType(AnnotationType type) {
		this.type = type;
	}
}
