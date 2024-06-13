import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from '../../../config/config';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(credentials: { username: string; password: string }) {
    return this.http.post(`${API_URI}/login`, credentials, {
      withCredentials: true,
    });
  }

  signUp(credentials: { username: string; password: string }) {
    return this.http.post(`${API_URI}/register`, credentials, {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post(`${API_URI}/logout`, {});
  }

  isAuthenticated() {
    return this.http.get('/is-authenticated');
  }


  isAuthorized(): boolean {
    if (sessionStorage.getItem('key') != null) {
      return true;
    }
    return false;
  }

}
