import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../Models/Usuario/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlLogin = "https://szd264mf-5086.usw3.devtunnels.ms/api/Auth/Login"
  constructor(private Http: HttpClient) { }

  Login(userlogin: LoginModel): Observable<string>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.Http.post<string>(this.apiUrlLogin, userlogin, {headers});
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
