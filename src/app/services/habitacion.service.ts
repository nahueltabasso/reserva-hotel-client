import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  endpoint = BASE_ENDPOINT;

  constructor(private http: HttpClient) {}

  searchHabitacionesDisponibles(idTipo: number, fechaDesde: Date): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.endpoint + '/HabitacionesDisponibles?idTipoHabitacion=' + idTipo + '&fechaDesde=' + fechaDesde);
  }
}
