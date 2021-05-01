import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salon } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  endpoint = BASE_ENDPOINT;

  constructor(private http: HttpClient) {}

  getAllDisponibles(fechaDesde: Date): Observable<Salon[]> {
    return this.http.get<Salon[]>(this.endpoint + '/Salon?fechaDesde=');
  }
}
