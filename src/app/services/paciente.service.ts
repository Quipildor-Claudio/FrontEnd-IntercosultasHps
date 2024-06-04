import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from '../../../config/config';
import { Observable, map } from 'rxjs';

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

}