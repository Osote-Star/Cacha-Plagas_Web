import { Component } from '@angular/core';
import { GraficaComponent } from './grafica/grafica.component';


@Component({
  selector: 'app-estadisticas',
  imports: [GraficaComponent],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css',
  standalone: true
})
export class EstadisticasComponent {

}
