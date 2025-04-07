import { CapturaModel } from '../Captura/captura-model';

export interface TrampaModel {
  _id: string;
  IDTrampa: number;
  IDUsuario: number;
  Imagen: string;
  Modelo: string;
  Localizacion: string;
  EstatusTrampa: boolean;
  EstatusSensor: boolean;
  EstatusPuerta: boolean;
  Capturas?: CapturaModel[];
  description?: string; // Agregamos la propiedad opcional
}