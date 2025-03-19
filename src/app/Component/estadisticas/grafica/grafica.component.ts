import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-grafica',
  standalone: true,
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent {

  public config: any = {
    type: 'bar',
    data: {
      labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
      datasets: [{
        label: 'Capturas',
        data: [2, 3, 4, 4, 7, 3, 9 ],
        backgroundColor: [
          'rgb(187, 33, 79)', 'rgb(138, 17, 108)', 'rgb(74, 5, 92)', 'rgb(8, 51, 129)', 
          'rgb(20, 192, 155)', 'rgb(19, 138, 35)', 'rgb(83, 226, 47)', 'rgb(245, 255, 105)', 
          'rgb(247, 215, 37)', 'rgb(240, 161, 42)', 'rgb(202, 102, 9)', 'rgb(194, 16, 16)'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,  // Hacer que el gráfico se ajuste al tamaño del contenedor
      maintainAspectRatio: false,  // Permite que el gráfico ocupe el tamaño completo disponible
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  chart: any;

  ngOnInit(): void {
    this.chart = new Chart('chart', this.config);
  }
}
