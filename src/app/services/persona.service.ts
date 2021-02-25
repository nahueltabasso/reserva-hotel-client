import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais, Provincia, Localidad } from '../models/model';

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
}
