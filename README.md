# invoice-annotation
Web application to create annotation on an invoice. The annotations are meant to tell a Tesseract application where the different fields of the invoice are, and their types.

Lancement du projet :
- Importer le projet sous Eclipse IDE
- Lancer le projet via la classe ProjetFactureApplication
- Se connecter à http://localhost:8080/factures

Afficher une facture :
- Cliquer sur un des numéros de facture pour l'ouvrir (http://localhost:8080/facture?name=INV1000 , http://localhost:8080/facture?name=INV1001 ou http://localhost:8080/facture?name=INV1002 sont créés)
- Cliquer sur File pour ouvrir la facture
- La 3e facture est composée de plusieurs pages, des boutons pour changer de pages apparaissent.

La branche main est la plus aboutie et contient l'application s'éxecutant au sein du serveur Springboot
La branche angular-tree contient le début de l'intégration de l'arbre en Angular (la branche main contient un build de ce projet Angular, mais il n'est pas exécutable par le serveur Springboot). La partie de l'arbre se trouve dans invoice-annotation/annotation-angular/src/app/tree.
La branche angular-balanche contient la tentative pour intégrer une application Angular dans Springboot.
