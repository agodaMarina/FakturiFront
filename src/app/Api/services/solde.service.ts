import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solde } from '../models/solde';
import { Historique } from '../models/historique';

@Injectable({
  providedIn: 'root'
})
export class SoldeService {

  root:string = 'http://localhost:8081/api/v1/solde';
  
  constructor(private http:HttpClient) { }
  getAll():Observable<Solde[]>{
    return this.http.get<Solde[]>(this.root+'/list');
  }
  getSoldeActuel():Observable<Solde>{
    return this.http.get<Solde>(this.root+'/get');

  }
  addNewSolde(solde:Solde):Observable<Solde>{
    return this.http.post<Solde>(this.root+'/create',solde); 
  }
  getHistorique(): Observable<Historique[]> {
    return this.http.get<Historique[]>(`${this.root}/getHistorique`);
  }
updateSolde(solde: Solde, montant: number): Observable<Solde> {
  return this.http.post<Solde>(`${this.root}/update?montant=${montant}`, solde);
}

}