import { TrampaModel } from '../Trampa/trampa-model';

export interface UsuarioModel {
  _id: string;
  IDUsuario: number;
  Email: string;
  Contrasena: string;
  Rol: string;
  Trampas: TrampaModel[];
}