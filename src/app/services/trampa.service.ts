import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrampaModel } from '../Models/Trampa/trampa-model';
import { VincularTrampaModel } from '../Models/Trampa/VincularTrampaModel';
import { GetTrampaDto } from '../Models/Trampa/GetTrampaDto';
import { TrampaPaginadoUserDto } from '../Models/Trampa/TrampaPaginadoUserDto';


@Injectable({
  providedIn: 'root'
})
export class TrampaService {

  private apiUrl = 'https://localhost:44322/api/Trampa';

  constructor(private http:HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || ''; // Obtener el token de localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Añadir el token al encabezado
    });
  }

  getAllTrampas(pagina: any): Observable<GetTrampaDto> {
    const headers = this.getHeaders();
    return this.http.get<GetTrampaDto>(`${this.apiUrl}/GetAllTrampas/${pagina}`, {headers});
  }

  getAllTrampasUsuario(atributos: TrampaPaginadoUserDto): Observable<GetTrampaDto> {
    const headers = this.getHeaders();
    return this.http.post<GetTrampaDto>(`${this.apiUrl}/GetAllTrampasUsuario`, atributos, {headers});
  } 
  
  MostrarEstadistica(id: any): Observable<TrampaModel> {
    return this.http.get<TrampaModel>(`${this.apiUrl}/MostrarEstadistica/${ id }`);
  }
  AgregarTrampa(trampa: VincularTrampaModel): Observable<TrampaModel> {
    return this.http.put<TrampaModel>(`${this.apiUrl}/MostrarEstadistica`, trampa);
  }

}