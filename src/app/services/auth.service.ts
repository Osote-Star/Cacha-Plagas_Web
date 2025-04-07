import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../Models/Usuario/LoginModel';
import { TokenModel } from '../Models/Usuario/TokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:44322/api/Auth'; // Reemplaza con la URL de tu API

  constructor() {}

  login(credentials: LoginModel): Observable<TokenModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TokenModel>(`${this.apiUrl}/Login`, credentials, { headers });
  }

  refreshToken(tokenDto: TokenModel): Observable<TokenModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TokenModel>(`${this.apiUrl}/refresh-token`, tokenDto, { headers });
  }

  // Método para guardar tokens en localStorage (o donde prefieras)
  saveTokens(tokens: TokenModel): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  // Método para obtener el access token
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Método para obtener el refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // Método para limpiar tokens (logout)
  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}