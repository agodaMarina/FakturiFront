import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateRequest } from '../models/authenticate-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { ChangePasswordRequest } from '../models/change-password-request';
import { RegistrationRequest } from '../models/registration-request';
import { UpdateProfilRequest } from '../models/update-profil-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/v1/auth';


  constructor(private http: HttpClient) { } 

  register(registrationData: RegistrationRequest): Observable<any> {
    const url = `${this.apiUrl}/register`; 
    return this.http.post(url, registrationData);
  }

  login(credentials: AuthenticateRequest): Observable<AuthenticationResponse> {
    const url = `${this.apiUrl}/login`; 
    return this.http.post<AuthenticationResponse>(url, credentials);
  }

  changePassword(changePasswordRequest: ChangePasswordRequest) :Observable<any>{
    const url = `${this.apiUrl}/change-password`;
    return this.http.put(url, changePasswordRequest);
  }
  
  activateAccount(token: string): Observable<any> { 
    const url = `${this.apiUrl}/activate_account?token=${token}`;
    return this.http.get(url);  
  }

  getProfile() :Observable<any>{
    const url = `${this.apiUrl}/profile`;
    return this.http.get(url);
  }

  updateProfile(updateProfilRequest: UpdateProfilRequest):Observable<any>{
    const url = `${this.apiUrl}/updateProfile`;
    return this.http.put(url, updateProfilRequest);
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`; 
    return this.http.get(url);
  } 

}
