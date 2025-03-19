import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrampaModel } from '../Models/Trampa/trampa-model';
import { VincularTrampaModel } from '../Models/Trampa/VincularTrampaModel';


@Injectable({
  providedIn: 'root'
})
export class TrampaServicesService {

  private apiUrl = 'https://localhost:44322/api/Trampa'

  constructor(private http:HttpClient) {
  }

  getTareas(): Observable<TrampaModel[]> {
    return this.http.get<TrampaModel[]>(this.apiUrl);
  }
  MostrarEstadistica(id: any): Observable<TrampaModel> {
    return this.http.get<TrampaModel>(`${this.apiUrl}/MostrarEstadistica/${ id }`);
  }
  VincularTrampa(trampa: VincularTrampaModel): Observable<TrampaModel> {
    return this.http.put<TrampaModel>(`${this.apiUrl}/MostrarEstadistica`, trampa);
  }

}
