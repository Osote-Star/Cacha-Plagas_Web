import { Routes } from '@angular/router';
import { LoginComponent } from './Component/Login/Login.component';
import { RecuperarContrasenaComponent } from './Component/recuperar-contrasena/recuperar-contrasena.component';
import { RegistrarComponent } from './Component/registrar/registrar.component';
import { ValidarComponent } from './Component/validar/validar.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
      { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
      { path: 'registrar', component: RegistrarComponent },
      { path: 'validar', component: ValidarComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
];
