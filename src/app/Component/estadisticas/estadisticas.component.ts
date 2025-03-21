import { Component } from '@angular/core';
import { GraficaComponent } from './grafica/grafica.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  imports: [GraficaComponent, CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'], // Corregido
  standalone: true
})
export class EstadisticasComponent {
  esAdmin: boolean = false; // Variable para identificar si es admin o usuario

  // Datos de las trampas que se utilizarán en el frontend
  products = Array(8).fill({
    id: '9347',
    name: 'RAT-TRAP',
    description: 'Especializada en ratas, esta trampa es simple y efectiva, cumple su objetivo gracias a su tamaño y materiales resistentes.',
    imageUrl: '/assets/Trampa.png'
  });

  constructor() {
    // Verifica si estamos en un entorno de navegador antes de acceder a localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const rol = localStorage.getItem('rol'); // Supongamos que el rol se guarda en localStorage
      if (rol === 'admin') {
        this.esAdmin = true; // Comprobamos si es admin
      } else {
        this.esAdmin = false; // Asumimos que es usuario si no es admin
      }
    }

    
  }
  
}
