import { CapturaModel } from '../Captura/captura-model';

// Esto va en Angular (TypeScript)
export class TrampaModel {
  _id: string = '';
  idTrampa: number = 0;
  idUsuario: number = 0;
  modelo: string = '';
  localizacion: string = '';
  estatusTrampa: boolean = false;
  estatusSensor: boolean = false;
  estatusPuerta: boolean = false;
  imagen?: string;
  description?: string;
}