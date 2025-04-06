import { Injectable } from '@angular/core';
import { RecuperarContrasenaModel } from '../Models/Usuario/RecuperarContrasenaModel';
import { UsuarioModel } from '../Models/Usuario/usuario-model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'https://localhost:44322/api/Usuario'

  constructor(private http:HttpClient) {
  }

  CambiarContrasena(contrasena: string): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.apiUrl}/MostrarEstadistica`, contrasena);
  }

  
}