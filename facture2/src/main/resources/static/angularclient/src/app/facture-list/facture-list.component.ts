import { Component, OnInit } from '@angular/core';
import { Facture } from '../model/facture';
import { FactureService } from '../service/facture.service';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {

  factures: Facture[];

  constructor(private factureService: FactureService) {
  }

  ngOnInit() {
    this.factureService.findAll().subscribe(data => {
      this.factures = data;
    });
  }

  selectedFacture: Facture;
  onSelect(facture: Facture): void {
    this.selectedFacture = facture;
  }
}
