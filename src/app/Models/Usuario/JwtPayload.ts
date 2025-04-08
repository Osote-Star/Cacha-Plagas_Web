export interface JwtPayload {
    nameid: string; // ID del usuario (ClaimTypes.NameIdentifier)
    email: string;  // Correo (ClaimTypes.Email)
    role: string;   // Rol (ClaimTypes.Role)
    exp: number;    // Expiración
  }