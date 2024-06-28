import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URI } from '../../../config/config';
import { Medico } from '../models/medico';
import { PaginatedResponse } from '../models/paginatedResponse';
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
  getMedicos(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Medico>> {
    return this.http.get<PaginatedResponse<Medico>>(`${API_URI}/medicos/?page=${page}&limit=${limit}`);
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
  searchMedicoByDni(cuil:any):Observable<Medico[]>{
    return this.http.get<Medico[]>(`${API_URI}/searchm?cuil=${cuil}`);
  }

}
