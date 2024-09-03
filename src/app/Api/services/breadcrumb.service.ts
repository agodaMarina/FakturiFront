import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbItem } from '../models/breadcrumbitem';



@Injectable({ providedIn: 'root' }) 
export class BreadcrumbService {

  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]); 
  breadcrumbs$ = this.breadcrumbsSubject.asObservable(); 

  private textSubject = new BehaviorSubject<string>(''); // <-- Ajout du sujet pour le texte
  text$ = this.textSubject.asObservable(); 

  updateBreadcrumbs(breadcrumbs: BreadcrumbItem[]) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }

  updateText(text: string) {
    this.textSubject.next(text);                     // <-- Méthode pour mettre à jour le texte
  }
}