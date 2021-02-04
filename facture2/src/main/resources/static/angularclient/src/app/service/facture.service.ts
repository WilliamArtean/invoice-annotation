import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facture } from '../model/facture';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FactureService {

  private facturesUrl: string;

  constructor(private http: HttpClient) {
    this.facturesUrl = 'http://localhost:8080/factures';
  }

  public findAll(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.facturesUrl);
  }

  public save(facture: Facture) {
    return this.http.post<Facture>(this.facturesUrl, facture);
  }
}
