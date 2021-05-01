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

  search(idEstado: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.endpoint + '/ReservasByEstado?idEstado=' + idEstado);
  }

  getById(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(this.endpoint + '/ReservaById?idReserva=' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.endpoint + '/Reserva?idReserva=' + id);
  }

  cancelarReserva(id: number): Observable<String> {
    return this.http.post<String>(this.endpoint + '/CancelarReserva?idReserva=' + id, null);
  }

  registrarNuevaReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.endpoint + '/Reserva', reserva);
  }
}
