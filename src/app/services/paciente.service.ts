import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from '../../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http:HttpClient) { }
  
  getAll():Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/pacientes');
  }


}
