import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrampaModel } from '../Models/Trampa/trampa-model';
import { VincularTrampaModel } from '../Models/Trampa/VincularTrampaModel';


@Injectable({
  providedIn: 'root'
})
export class TrampaService {

  private apiUrl = 'https://jgqvrw0w-5086.usw3.devtunnels.ms/api/Trampa'

  constructor(private http:HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    //const token = localStorage.getItem('token') || ''; // Obtener el token de localStorage
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJwcnVlYmEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c3VhcmlvIiwiZXhwIjoxNzQ0MDAyODMzfQ.NHtSWIF5OImEYdO5WMXU2L64LbQGeWBF_KgoAuN5jCM'
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Añadir el token al encabezado
    });
  }

  getAllTrampas(pagina: any): Observable<TrampaModel[]> {
    const headers = this.getHeaders();
    return this.http.get<TrampaModel[]>(`${this.apiUrl}/GetAllTrampas/${pagina}`, {headers});
  }
  MostrarEstadistica(id: any): Observable<TrampaModel> {
    return this.http.get<TrampaModel>(`${this.apiUrl}/MostrarEstadistica/${ id }`);
  }
  VincularTrampa(trampa: VincularTrampaModel): Observable<TrampaModel> {
    return this.http.put<TrampaModel>(`${this.apiUrl}/MostrarEstadistica`, trampa);
  }

}