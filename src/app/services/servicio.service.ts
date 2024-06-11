import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URI } from '../../../config/config';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get(`${API_URI}/servicios`).pipe(
      map(response => response as any[])
    );
  }
  get(id: any): Observable<Servicio> {
    return this.http.get<Servicio>(`${API_URI}/servicio/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URI}/servicio`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URI}/servicio/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URI}/servicio/${id}`);
  }
}
