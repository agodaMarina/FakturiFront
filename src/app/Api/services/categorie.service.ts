import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
    rootUrl: string = "http://localhost:8081/api/v1/categorie";

  constructor(private http:HttpClient) { }

    createCategorie(categorie: Categorie): Observable<Categorie> {
        return this.http.post<Categorie>(`${this.rootUrl}/add`, categorie);
    }

    getCategories(): Observable<Categorie[]> {
        return this.http.get<Categorie[]>(`${this.rootUrl}/all`);
    }

    findCategorie(id: number): Observable<Categorie> {
        return this.http.get<Categorie>(`${this.rootUrl}/get/${id}`);
    }

    update(categorie: Categorie): Observable<Categorie> {
        return this.http.put<Categorie>(`${this.rootUrl}/update`, categorie);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.rootUrl}/delete/${id}`);
    }
}
