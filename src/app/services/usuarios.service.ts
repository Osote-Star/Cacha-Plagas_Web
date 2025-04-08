import { Injectable } from '@angular/core';
import { RecuperarContrasenaModel } from '../Models/Usuario/RecuperarContrasenaModel';
import { UsuarioModel } from '../Models/Usuario/usuario-model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgregarUsuarioModel } from '../Models/Usuario/AgregarUsuarioModel';
import { EnviarCorreoModel } from '../Models/Usuario/EnviarCorreoModel';
import { ValidarCodigoModel } from '../Models/Usuario/ValidarCodigoModel';
import { CambiarContrasenaModel } from '../Models/Usuario/CambiarContrasenaModel';

 

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'https://localhost:44322/api/Usuarios';
  private apiUrlEmail = 'https://localhost:44322/api/Emails';

  constructor(private http:HttpClient) {
  }


  AgregarUsuario(user: AgregarUsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.apiUrl}/AgregarUsuario`, user);
  }

  
  EnviarCorreo(email: EnviarCorreoModel): Observable<any> {
    return this.http.post<string>(`${this.apiUrlEmail}`, email);
  }

  ValidarCodigoCorreo(model: ValidarCodigoModel): Observable<string> {
    return this.http.post<string>(`${this.apiUrlEmail}/validar`, model);
  }

  cambiarContrasena(cambiarContrasena: CambiarContrasenaModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/CambiarContrasena`, cambiarContrasena);
  }
}