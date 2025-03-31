import { Routes } from '@angular/router';
import { LoginComponent } from './Component/Login/Login.component';
import { RecuperarContrasenaComponent } from './Component/recuperar-contrasena/recuperar-contrasena.component';
import { RegistrarComponent } from './Component/registrar/registrar.component';
import { ValidarComponent } from './Component/validar/validar.component';
import { VerTrampasComponent } from './Component/ver-trampas/ver-trampas.component';
import { EstadisticasComponent } from './Component/estadisticas/estadisticas.component';


export const routes: Routes = [
  { path: 'ver-trampas', component: VerTrampasComponent },
      { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
      { path: 'registrar', component: RegistrarComponent },
      { path: 'validar', component: ValidarComponent },
      { path: 'estadisticas', component: EstadisticasComponent },

      { path: '', redirectTo: '/login', pathMatch: 'full' }
];
