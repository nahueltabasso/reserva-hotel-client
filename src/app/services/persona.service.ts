import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais, Provincia, Localidad, Persona, Rol } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  endpoint = BASE_ENDPOINT;

  constructor(private http: HttpClient) {}

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.endpoint + '/Pais');
  }

  getProvinciasByPais(idPais: number): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.endpoint + '/ProvinciaByPais?idPais=' + idPais);
  }

  getLocalidadesByProvincia(idProvincia: number): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(this.endpoint + '/LocalidadByProvincia?idProvincia=' + idProvincia);
  }

  getPersonaByDocumento(tipo: string, nro: number): Observable<Persona> {
    return this.http.get<Persona>(this.endpoint + '/PersonaByDocumento?tipoDocumento=' + tipo + '&numeroDocumento=' +  nro);
  }

  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.endpoint + '/Persona');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.endpoint + '/Persona?idPersona=' + id);
  }

  getById(id: number): Observable<Persona> {
    return this.http.get<Persona>(this.endpoint + '/PersonaById?idPersona=' + id);
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.endpoint + '/RolList');
  }

  registrarPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.endpoint + '/Persona', persona);
  }

  actualizarPerfil(id:number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(this.endpoint + '/Persona?idPersona=' + id, persona);
  }
}
