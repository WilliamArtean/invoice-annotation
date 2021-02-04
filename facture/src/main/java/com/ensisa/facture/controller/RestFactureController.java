package com.ensisa.facture.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ensisa.facture.data.Facture;
import com.ensisa.facture.data.FactureRepository;
import com.ensisa.facture.service.AnnotationService;
import com.ensisa.facture.service.FactureService;
import com.ensisa.facture.service.PageService;

 
@RestController
public class RestFactureController {
	
	@Autowired
	private FactureService factureService;
	
	@Autowired
	private AnnotationService annotationService;
	
	@Autowired
	private PageService pageService;
	
	@Autowired
	private FactureRepository factureRepository;
	
	@GetMapping(value = "/facture/{numero}")
	public Facture getFacture(@PathVariable ("numero") String numero) {
		System.out.println("get facture recu : "+numero);
		Facture facture = factureService.getByNumero(numero);
		return facture;
	}
	
	@PostMapping(value = "/facture/{numero}/save")
	public Facture saveFacture(@PathVariable ("numero") String numero, @RequestBody Facture facture) {
		System.out.println("post facture recu : "+numero);
		factureRepository.save(facture);
		return facture;
	}
	
	static private class ImgPath{
		public String path;
	}
	//INUTILiSE
	@GetMapping(value = "/facture/getimg")
	  public ImgPath getPage() {
		System.out.println("get img recu");
		ImgPath img=new ImgPath();
		img.path="INV1001.png";
		return img;
	  }
	
}