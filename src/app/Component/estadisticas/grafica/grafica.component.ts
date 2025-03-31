import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-grafica',
  standalone: true,
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements AfterViewInit, OnChanges {
  @Input() data: number[] = [2, 3, 4, 4, 7, 3, 9];
  @Input() labels: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  @Input() isModalVisible: boolean = false; // Opcional, solo para el modal

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  public chart: Chart | undefined;

  ngAfterViewInit(): void {
    this.initializeChart(); // Intentamos inicializar siempre que el componente esté en el DOM
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isModalVisible'] && this.isModalVisible && this.chartCanvas) {
      this.initializeChart(); // Re-inicializamos si el modal se abre
    } else if (this.chart && (changes['data'] || changes['labels'])) {
      this.updateChart(); // Actualizamos si cambian los datos o etiquetas
    }
  }

  initializeChart(): void {
    const canvas = this.chartCanvas?.nativeElement;
    if (canvas) {
      if (this.chart) {
        this.chart.destroy(); // Destruimos la gráfica anterior si existe
      }

      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Capturas',
            data: this.data,
            backgroundColor: [
              'rgb(20, 192, 155)', 'rgb(19, 138, 35)', 'rgb(83, 226, 47)', 'rgb(245, 255, 105)',
              'rgb(8, 51, 129)', 'rgb(247, 215, 37)', 'rgb(240, 161, 42)'
            ],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.data;
      this.chart.update();
    }
  }
}