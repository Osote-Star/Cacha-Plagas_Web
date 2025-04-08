import { CapturaModel } from '../Captura/captura-model';

export interface TrampaModel {
  _id: string;
  idTrampa: number;
  idUsuario: number;
  imagen?: string;
  modelo: string;
  localizacion: string;
  estatusTrampa: boolean;
  estatusSensor: boolean;
  estatusPuerta: boolean;
  capturas?: CapturaModel[];
  description?: string; // Agregamos la propiedad opcional
}