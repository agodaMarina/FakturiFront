import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading$ = new BehaviorSubject<boolean>(false); // Variable d'état du loader 

  constructor() { } 

  showLoader() { 
    this.isLoading$.next(true); 
  }

  hideLoader() { 
    this.isLoading$.next(false); 
  }
}
