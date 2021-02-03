package com.ensisa.facture.controller;

import java.util.List;
import java.util.logging.Level;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ensisa.facture.data.Annotation;
import com.ensisa.facture.data.AnnotationType;
import com.ensisa.facture.data.Facture;
import com.ensisa.facture.data.FactureRepository;
import com.ensisa.facture.data.Page;
import com.ensisa.facture.data.PageType;
import com.ensisa.facture.service.AnnotationService;
import com.ensisa.facture.service.FactureService;
import com.ensisa.facture.service.PageService;
import com.sun.istack.logging.Logger;



@Controller
public class FactureController {
	
	@Autowired
	private FactureService factureService;
	
	@Autowired
	private AnnotationService annotationService;
	
	@Autowired
	private PageService pageService;
	
    //private final FactureRepository factureRepository;
	
	@GetMapping("/index")
	public String index( Model model) {
		return "index";
	}
	
	@GetMapping("/facture")
	public String facture(@RequestParam(name="name", required=false, defaultValue="INV001") String name, Model model) {
		model.addAttribute("name", name);
		Facture facture = factureService.getByNumero(name);
		//String img = facture.getPages().get(0).getContent();
		model.addAttribute("facture",facture);
		return "facture";
	}
	
	@GetMapping("/factures")
	public String FacturesPage(Model model) {
        List<Facture> factures = this.factureService.getAllFacture();
		model.addAttribute("factures", factures);
		return "factures";
	}
	
	@GetMapping("/factures/add")
	public String TestAjout(Model model) {
		try {
	        Facture facture = factureService.getByNumero("INV002");
			Annotation a = annotationService.getByType(AnnotationType.POI);
			Page p = pageService.getByType(PageType.PNG);
			
			pageService.addAnnotation(a, p);
			pageService.addAnnotation(annotationService.getById(7), p);
			factureService.addPage(p, facture);
			factureService.addPage(pageService.getById(10), facture);	
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return "error";
		}
		return "redirect:/factures";
	}
	
	@GetMapping("/facture/add/annotation")
	public String redirectAddAnnotation() {
		return "addAnnotation";
	}
	
	@PostMapping("/facture/add/annotation")
	public String addAnnotation() {
		try {
	        Facture facture = factureService.getByNumero("INV002");
			Annotation a = annotationService.getByType(AnnotationType.POI);
			//factureService.addAnnotation(a, facture);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			//Shoud be redirecting to an error page
		}
		return "redirect:/factures";
	}
}
