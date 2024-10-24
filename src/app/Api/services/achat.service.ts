import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Achat } from '../models/achat';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AchatService {
  rootUrl: string = "http://localhost:8081/api/v1/achat";

  constructor(private http :HttpClient) { }

  createAchat(achat: Achat, file: File): Observable<Achat> {
    const formData: FormData = new FormData();
    formData.append('achat', new Blob([JSON.stringify(achat)], { type: 'application/json' }));
    formData.append('file', file);

    return this.http.post<Achat>(`${this.rootUrl}/add`, formData);
  }
  getAchats(): Observable<Achat[]> {
    return this.http.get<Achat[]>(`${this.rootUrl}/all`);
  }
  findAchat(id: number): Observable<Achat> {
    return this.http.get<Achat>(`${this.rootUrl}/get/${id}`);
  }
  verifyDateEcheance(achat: Achat): boolean {
    const currentDate: Date = new Date();
    if (!achat.dateEcheance) return false;
    const dateEcheance: Date = new Date(achat.dateEcheance);

    return currentDate.toDateString() === dateEcheance.toDateString();
  }
  update(achat: Achat): Observable<Achat> {
    return this.http.put<Achat>(`${this.rootUrl}/update`, achat);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.rootUrl}/delete/${id}`);
  }
}
