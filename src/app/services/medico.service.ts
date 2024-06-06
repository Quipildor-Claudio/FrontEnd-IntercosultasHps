import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URI } from '../../../config/config';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  constructor(private http:HttpClient) { }
  
  getAll():Observable<any[]>{
    return this.http.get(`${API_URI}/medicos`).pipe(
      map(response=>response as any[])
    );
  }
  get(id: any): Observable<Medico> {
    return this.http.get<Medico>(`${API_URI}/medico/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URI}/medico`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URI}/medico/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URI}/medico/${id}`);
  }

}
