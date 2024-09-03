import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vente } from '../models/vente';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private apiUrl = 'http://localhost:8081/api/v1/revenu';

  constructor(private http: HttpClient) { }

  validateVente(vente: Vente): Observable<Vente> {
    return this.http.post<Vente>(`${this.apiUrl}/add`, vente);
  }

  getAllVentes(): Observable<Vente[]> {
    return this.http.get<Vente[]>(`${this.apiUrl}/all`);
  }

  getVenteById(id: number): Observable<Vente> {
    return this.http.get<Vente>(`${this.apiUrl}/get/${id}`);
  }

  deleteVente(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
  }

  updateVente(vente: Vente): Observable<Vente> {
    return this.http.put<Vente>(`${this.apiUrl}/update`, vente);
  }
}
