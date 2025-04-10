// Esto va en Angular (TypeScript)
export class EstadisticasMensualesDto {
    capturasPorMes: number[] = new Array(12).fill(0);
    año: number = 0;
    capturasHoy: number = 0;         // Nuevo
    capturasSemana: number = 0;      // Nuevo
    capturasMes: number = 0;         // Nuevo
    zonaMayorCapturas: string = 'Sin datos'; // Nuevo
  }