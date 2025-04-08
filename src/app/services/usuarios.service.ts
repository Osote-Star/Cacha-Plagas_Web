import { Injectable } from '@angular/core';
import { RecuperarContrasenaModel } from '../Models/Usuario/RecuperarContrasenaModel';
import { UsuarioModel } from '../Models/Usuario/usuario-model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgregarUsuarioModel } from '../Models/Usuario/AgregarUsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'https://jgqvrw0w-5086.usw3.devtunnels.ms/api/Usuarios'

  constructor(private http:HttpClient) {
  }

  CambiarContrasena(contrasena: string): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.apiUrl}/MostrarEstadistica`, contrasena);
  }

  AgregarUsuario(user: AgregarUsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.apiUrl}/AgregarUsuario`, user);
  }

  
}