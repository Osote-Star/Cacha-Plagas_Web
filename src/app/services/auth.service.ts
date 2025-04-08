import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../Models/Usuario/LoginModel';
import { TokenModel } from '../Models/Usuario/TokenModel';
import { jwtDecode  } from 'jwt-decode'
import { JwtPayload } from '../Models/Usuario/JwtPayload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jgqvrw0w-5086.usw3.devtunnels.ms/api/Auth'; // Reemplaza con la URL de tu API

  constructor() {}

  login(credentials: LoginModel): Observable<TokenModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TokenModel>(`${this.apiUrl}/Login`, credentials, { headers });
  }

  refreshToken(tokenDto: TokenModel): Observable<TokenModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TokenModel>(`${this.apiUrl}/refresh-token`, tokenDto, { headers });
  }
  
  getDecodedAccessToken(token: string): JwtPayload | null {
    try {
        const decoded = jwtDecode<any>(token); // Decodificar como any primero
        
        // Mapear los claims con nombres largos a la interfaz JwtPayload
        const payload: JwtPayload = {
            nameid: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            exp: decoded.exp
        };
        
        return payload;
    } catch (error) {
        return null;
    }
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

  logout() {

    // Limpiar tokens del almacenamiento
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  estaAutenticado(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }
}