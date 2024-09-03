import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer, switchMap } from 'rxjs';
import { Rapport } from '../models/rapport';
import { Historique } from '../models/historique';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private apiUrl = 'http://localhost:8081/api/v1/rapport';  

    constructor(private http: HttpClient) { } 

    getMonthlyReportData(year: number, month: number): Observable<Rapport> { 
        return this.http.get<Rapport>(`${this.apiUrl}/reports/monthly/${year}/${month}`);
    }  

    // Fonction pour récupérer les données du rapport en temps réel 
    getRealtimeMonthlyReportData(year: number, month: number): Observable<Rapport> {
      // Récupérer les données toutes les 5 secondes 
      return timer(0, 100000).pipe(
        switchMap(() => this.getMonthlyReportData(year, month)) 
      );
    }

    getHistorique(): Observable<Historique[]> {
      return this.http.get<Historique[]>(`${this.apiUrl}/historique`);
    }

}
