import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from '../service/facture.service';
import { Facture } from '../model/facture';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent {

  facture: Facture;

  constructor(
    private route: ActivatedRoute,
      private router: Router,
        private factureService: FactureService) {
    this.facture = new Facture();
  }

  onSubmit() {
    this.factureService.save(this.facture).subscribe(result => this.gotoFactureList());
  }

  gotoFactureList() {
    this.router.navigate(['/factures']);
  }
}
