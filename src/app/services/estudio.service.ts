import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Interconsulta } from '../models/interconsulta';
import { API_URI } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  constructor( private http:HttpClient) { }
  
  getAll():Observable<any[]>{
    return this.http.get(`${API_URI}/estudios`).pipe(
      map(response=>response as any[])
    );
  }
  get(id: any): Observable<Interconsulta> {
    return this.http.get<Interconsulta>(`${API_URI}/estudio/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_URI}/estudio`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URI}/estudio/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URI}/estudio/${id}`);
  }
}

