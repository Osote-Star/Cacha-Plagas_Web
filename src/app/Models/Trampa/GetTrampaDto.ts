import { TrampaModel } from "./trampa-model";

export interface GetTrampaDto {
    trampas: TrampaModel[];
    totalRegistros: number;
    totalPaginas: number;
  }