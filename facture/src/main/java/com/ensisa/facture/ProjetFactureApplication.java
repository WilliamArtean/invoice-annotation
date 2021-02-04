package com.ensisa.facture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ensisa.facture.data.Annotation;
import com.ensisa.facture.data.AnnotationRepository;
import com.ensisa.facture.data.Facture;
import com.ensisa.facture.data.FactureRepository;
import com.ensisa.facture.data.Page;
import com.ensisa.facture.data.PageRepository;
import com.ensisa.facture.data.PageType;
import com.ensisa.facture.data.AnnotationType;

@SpringBootApplication
public class ProjetFactureApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjetFactureApplication.class, args);
	}

	private static final Logger log = LoggerFactory.getLogger(ProjetFactureApplication.class);

	@Bean
	public CommandLineRunner demo(FactureRepository repository, AnnotationRepository arepository, PageRepository prepository) {
		return (args) -> {
			// save a few factures
			Facture inv1000=new Facture("INV1000");
			Facture inv1001=new Facture("INV1001");
			Facture inv1002=new Facture("INV1002");
			repository.save(inv1000);
			repository.save(inv1001);
			repository.save(inv1002);

			// save a few annotations
			Annotation a1 = new Annotation(10, 20, AnnotationType.POI);
			Annotation a2 = new Annotation(20, 30, AnnotationType.ROI);
			Annotation a3 = new Annotation(30, 40, AnnotationType.OOI);
			arepository.save(a1);
			arepository.save(a2);
			arepository.save(a3);

			// save a few pages
			Page inv1000p = new Page("INV1000.png", PageType.PNG);
			Page inv1001p = new Page("INV1001.png", PageType.PNG);
			Page inv1002p1 = new Page("INV1002-1.png", PageType.PNG);
			Page inv1002p2 = new Page("INV1002-2.png", PageType.PNG);
			prepository.save(inv1000p);
			prepository.save(inv1001p);
			prepository.save(inv1002p1);
			prepository.save(inv1002p2);
			
			//add annotations to their page
			inv1000p.addAnnotation(a1);
			inv1001p.addAnnotation(a2);
			inv1002p2.addAnnotation(a3);
			prepository.save(inv1000p);
			prepository.save(inv1001p);
			prepository.save(inv1002p1);
			prepository.save(inv1002p2);

			//add pages to their invoice
			inv1000.addPage(inv1000p);
			inv1001.addPage(inv1001p);
			inv1002.addPage(inv1002p1);
			inv1002.addPage(inv1002p2);
			repository.save(inv1000);
			repository.save(inv1001);
			repository.save(inv1002);
			
			log.info("");

			// fetch all factures
			log.info("Factures found with findAll():");
			log.info("-------------------------------");
			for (Facture facture : repository.findAll()) {
				log.info(facture.toString());
			}
			log.info("");

//			// fetch an individual facture by ID
//			Facture facture = repository.findById(1L);
//			log.info("Facture found with findById(1L):");
//			log.info("--------------------------------");
//			log.info(facture.toString());
//			log.info("");
//
//			// fetch factures by numero
//			log.info("Facture found with findByNumero(\"INV1000\"):");
//			log.info("--------------------------------------------");
//			repository.findByNumero("INV1000").forEach(num -> {
//				log.info(num.toString());
//			});
//
//			log.info("");
//
//			// fetch all annotations
//			log.info("Annotations found with findAll():");
//			log.info("-------------------------------");
//			for (Annotation a : arepository.findAll()) {
//				log.info(a.toString());
//			}
//			log.info("");
//
//			// fetch an individual annotation by ID
//			Annotation a = arepository.findById(6L);
//			log.info("Annotation found with findById(6L):");
//			log.info("--------------------------------");
//			log.info(a.toString());
//			log.info("");
//
//			// fetch annotations by type
//			log.info("Annotation found with findByType('ROI'):");
//			log.info("--------------------------------------------");
//			arepository.findByType(AnnotationType.ROI).forEach(roi -> {
//				log.info(roi.toString());
//			});
//			log.info("");
		};
	}
}
