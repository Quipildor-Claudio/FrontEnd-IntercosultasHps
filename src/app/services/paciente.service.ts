import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from '../../../config/config';
import { Observable, map } from 'rxjs';
import { Paciente } from '../models/paciente';
import { PaginatedResponse } from '../models/paginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http:HttpClient) { }
  
  getAll():Observable<any[]>{
    return this.http.get(`${API_URI}/pacientes`).pipe(
      map(response=>response as any[])
    );
  }

  getPacientes(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Paciente>> {
    return this.http.get<PaginatedResponse<Paciente>>(`${API_URI}/pacientes/?page=${page}&limit=${limit}`);
  }

  get(id: any): Observable<Paciente> {
    return this.http.get<Paciente>(`${API_URI}/paciente/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URI}/paciente`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URI}/paciente/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URI}/paciente/${id}`);
  }

  searchPatients(dni: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${API_URI}/searchp?dni=${dni}`);
  }

}
