export class TrampaPaginadoUserDto {
    pagina: number = 1;
    usuarioId: number = 0; // Inicializado con valor por defecto
    
    constructor(usuarioId?: number) {
      if (usuarioId) {
        this.usuarioId = usuarioId;
        this.pagina = 1;
      }
    }
}