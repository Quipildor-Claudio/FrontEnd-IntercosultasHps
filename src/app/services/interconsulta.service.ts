import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URI } from '../../../config/config';
import { Interconsulta } from '../models/interconsulta';
interface InterconsultaResponse {
  items: Interconsulta[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
@Injectable({
  providedIn: 'root'
})
export class InterconsultaService {

  constructor(private http:HttpClient) { }
<<<<<<< Updated upstream

  getAll():Observable<any[]>{
    return this.http.get(`${API_URI}/interconsultas`).pipe(
      map(response=>response as any[])
=======
  
  getAll():Observable<Interconsulta[]>{
    return this.http.get<InterconsultaResponse>(`${API_URI}/interconsultas`).pipe(
      map(response=>response.items)
>>>>>>> Stashed changes
    );
  }
  get(id: any): Observable<Interconsulta> {
    return this.http.get<Interconsulta>(`${API_URI}/interconsulta/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URI}/interconsulta`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URI}/interconsulta/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URI}/interconsulta/${id}`);
  }
}
