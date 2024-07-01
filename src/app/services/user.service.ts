import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/paginatedResponse';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../../../config/config';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http:HttpClient) { }

  getPacientes(page: number = 1, limit: number = 10): Observable<PaginatedResponse<User>> {
    return this.http.get<PaginatedResponse<User>>(`${API_URI}/users/?page=${page}&limit=${limit}`);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URI}/user/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URI}/user/${id}`);
  }
}
