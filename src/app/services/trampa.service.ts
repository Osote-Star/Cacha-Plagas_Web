import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrampaModel } from '../Models/Trampa/trampa-model';
import { VincularTrampaModel } from '../Models/Trampa/VincularTrampaModel';
import { GetTrampaDto } from '../Models/Trampa/GetTrampaDto';
import { TrampaPaginadoUserDto } from '../Models/Trampa/TrampaPaginadoUserDto';
import { ModeloYPaginadoDto } from '../Models/Trampa/ModeloYPaginadoDto';
import { EditarTrampaDto } from '../Models/Trampa/EditarTrampaDto';
import { AgregarTrampa } from '../Models/Trampa/AgregarTrampa';


@Injectable({
  providedIn: 'root'
})
export class TrampaService {

  private apiUrl = 'https://jgqvrw0w-5086.usw3.devtunnels.ms/api/Trampa';

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

  getTrampaCount(): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.apiUrl}/MostrarConteoTrampas`, {headers});
  }

  EditarTrampa(trampa: EditarTrampaDto): Observable<TrampaModel> {
    const headers = this.getHeaders();
    return this.http.post<TrampaModel>(`${this.apiUrl}/EditarTrampa`, trampa, {headers});
  }

  FiltByModel(atributos: ModeloYPaginadoDto): Observable<GetTrampaDto>{
    const headers = this.getHeaders();
    return this.http.post<GetTrampaDto>(`${this.apiUrl}/FiltrarPorModelo`, atributos, {headers});
  }
  MostrarEstadistica(id: any): Observable<TrampaModel> {
    return this.http.get<TrampaModel>(`${this.apiUrl}/MostrarEstadistica/${ id }`);
  }
  AgregarTrampa(trampa: AgregarTrampa): Observable<TrampaModel> {
    const headers = this.getHeaders();
    return this.http.post<TrampaModel>(`${this.apiUrl}/AgregarTrampa`, trampa, {headers});
  }

}