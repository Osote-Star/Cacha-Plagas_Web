export class ModeloYPaginadoDto{
    pagina: number = 1;
    modelo: string = ''; // Inicializado con valor por defecto
    
    constructor(modelo?: string) {
      if (modelo) {
        this.modelo = modelo;
        this.pagina = 1;
      }
    }
}