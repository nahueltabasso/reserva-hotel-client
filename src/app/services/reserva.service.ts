import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { Observable } from 'rxjs';
import { Reserva, EstadoReserva } from '../models/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  endpoint = BASE_ENDPOINT;

  constructor(private http: HttpClient) {}

  getAllReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.endpoint + '/Reserva');
  }

  getAllEstados(): Observable<EstadoReserva[]> {
    return this.http.get<EstadoReserva[]>(this.endpoint + '/EstadoReservaList');
  }
}
