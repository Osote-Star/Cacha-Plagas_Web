import { Routes } from '@angular/router';
import { AgregarTrampaComponent } from './Component/agregar-trampa/agregar-trampa.component'; // ✅ Archivo correcto
import { VerTrampasComponent } from './Component/ver-trampas/ver-trampas.component';
import { LoginComponent } from './Component/login/login.component';
import { EstadisticasComponent } from './Component/estadisticas/estadisticas.component';


export const routes: Routes = [
  { path: 'Login', component: LoginComponent }, // Página principal
    { path: 'VerTrampas', component: VerTrampasComponent },
    { path: 'VerEstadisticas', component: EstadisticasComponent },
    { path: '**', redirectTo: '/Login', pathMatch: 'full' } // Redirigir rutas no encontradas a la página principal
  ];
  