import { TrampaModel } from '../Trampa/trampa-model';

export interface UsuarioModel {
  _id: string;
  idUsuario: number;
  email: string;
  contrasena: string;
  rol: string;
  trampas: TrampaModel[];
}