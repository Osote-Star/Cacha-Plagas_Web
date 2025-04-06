import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, RouterModule, NavigationEnd } from '@angular/router'
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { routes } from './app.routes';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements AfterViewInit, OnDestroy {
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {
    this.router.resetConfig(routes); // Aplica las rutas desde app.route.ts
  }
  title = 'Cacha-Plagas_Web';

  ngAfterViewInit() {
    // Esperar un poco para que el DOM esté completamente renderizado
    setTimeout(() => {
      this.setupNavHighlight();
    }, 0);
  }

  ngOnDestroy() {
    // Desuscribirse para evitar memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  esInterfazEspecial(): boolean {
    const currentUrl = this.router.url.toLowerCase(); // Normaliza a minúsculas
    return currentUrl === '/login' || currentUrl === '/registrar' || 
           currentUrl === '/recuperar-contrasena' || currentUrl === '/validar';
  }

  private setupNavHighlight() {
    // Verificar la ruta actual al inicio
    this.updateNavHighlight(this.router.url);

    // Suscribirse a los cambios de ruta
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateNavHighlight(event.url);
    });
  }


  private updateNavHighlight(url: string) {
    const trampasTab = document.getElementById('trampas-tab');
    const estadisticasTab = document.getElementById('estadisticas-tab');
    const gradienteTab = document.getElementById('gradiente-tab');

    if (!trampasTab || !estadisticasTab || !gradienteTab) {
      return;
    }

    // Limpiar clases existentes
    trampasTab.classList.remove('trampas-active');
    estadisticasTab.classList.remove('trampas-estadistica-active');
    estadisticasTab.classList.remove('estadisticas-active');
    trampasTab.classList.remove('estadisticas-trampa-active');
    gradienteTab.classList.remove('estadisticas-gradiente-active');

    // Agregar clase según la ruta actual
    if (url.includes('/ver-trampas')) {

      trampasTab.classList.add('trampas-active');
      estadisticasTab.classList.add('trampas-estadistica-active');

    } 
    else if (url.includes('/estadisticas')) {
     
      estadisticasTab.classList.add('estadisticas-active');
      trampasTab.classList.add('estadisticas-trampa-active');
      gradienteTab.classList.add('estadisticas-gradiente-active');

    }
  }
}