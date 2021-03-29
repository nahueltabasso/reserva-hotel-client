import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { BASE_ENDPOINT } from '../config/app';
import { Persona } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  endpoint = BASE_ENDPOINT;

  constructor(private http: HttpClient,
              private storage: TokenStorageService) {}

  login(personaLoginDTO: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.endpoint + '/Login', personaLoginDTO);
  }

  registracion(personaRegistroDTO: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.endpoint + '/Persona', personaRegistroDTO)
  }

  logout(): Observable<string> {
    return this.http.post<string>(this.endpoint + '/Logout', null);
  }

  isAuthenticated(): boolean {
    const token = this.storage.getToken();
    if (token) return true;
    return false;
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(this.endpoint + '/SolicitarCambioContraseña?email=' + email, null);
  }

  resetPassword(token: string, newPass: string): Observable<any> {
    return this.http.post<any>(this.endpoint + '/ModificarContraseña?token=' + token + '&newPass=' + newPass, null);
  }
}
