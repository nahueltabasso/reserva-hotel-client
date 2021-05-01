import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoHabitacion } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class TipoHabitacionService {

  endpoint = BASE_ENDPOINT;
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoHabitacion[]> {
    return this.http.get<TipoHabitacion[]>(this.endpoint + '/TipoHabitacion');
  }
}
