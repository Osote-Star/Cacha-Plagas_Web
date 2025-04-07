import { Routes } from '@angular/router';
import { LoginComponent } from './Component/Login/Login.component';
import { RecuperarContrasenaComponent } from './Component/recuperar-contrasena/recuperar-contrasena.component';
import { RegistrarComponent } from './Component/registrar/registrar.component';
import { ValidarComponent } from './Component/validar/validar.component';
import { VerTrampasComponent } from './Component/ver-trampas/ver-trampas.component';
import { EstadisticasComponent } from './Component/estadisticas/estadisticas.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';



export const routes: Routes = [
      { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige la ruta vacía a /login
      { path: 'login', loadComponent: () => import('./Component/Login/Login.component').then(m => m.LoginComponent), canActivate: [LoginGuard]},
      { path: 'ver-trampas', loadComponent: () => import('./Component/ver-trampas/ver-trampas.component').then(m => m.VerTrampasComponent),canActivate: [AuthGuard] },
      { path: 'estadisticas', loadComponent: () => import('./Component/estadisticas/estadisticas.component').then(m => m.EstadisticasComponent),canActivate: [AuthGuard] },
      { path: 'recuperar-contrasena',component: RecuperarContrasenaComponent },
      { path: 'registrar', component: RegistrarComponent },
      { path: 'validar', component: ValidarComponent },
      { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
