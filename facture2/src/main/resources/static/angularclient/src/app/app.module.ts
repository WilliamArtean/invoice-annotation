import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FactureListComponent } from './facture-list/facture-list.component';
import { FactureFormComponent } from './facture-form/facture-form.component';
import { FactureService } from './service/facture.service';

@NgModule({
  declarations: [
    AppComponent,
    FactureListComponent,
    FactureFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FactureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
