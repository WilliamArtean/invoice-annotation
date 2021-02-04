import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FactureListComponent } from './facture-list/facture-list.component';
import { FactureFormComponent } from './facture-form/facture-form.component';

const routes: Routes = [
  { path: 'factures', component: FactureListComponent },
  { path: 'addfacture', component: FactureFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
