package com.ensisa.facture2.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Facture {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private final String number;
    private final String date;
    
    public Facture() {
        this.number = "";
        this.date = "";
    }
    
    public Facture(String number, String date) {
        this.number = number;
        this.date = date;
    }

    public long getId() {
        return id;
    }
    
    public String getNumber() {
        return number;
    }

    public String getDate() {
        return date;
    }
    
    @Override
    public String toString() {
        return "Facture{" + "id=" + id + ", number=" + number + ", date=" + date + '}';
    }
}
