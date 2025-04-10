// Esto va en Angular (TypeScript)
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
  @Input() data: number[] = new Array(12).fill(0);
  @Input() labels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  @Input() isModalVisible: boolean = false;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  public chart: Chart | undefined;

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit - Data:', this.data);
    this.initializeChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges - Data recibido:', this.data);
    if (changes['data'] && this.data) {
      this.updateChart();
    }
    if (changes['isModalVisible'] && this.isModalVisible) {
      this.initializeChart();
    }
  }

  initializeChart(): void {
    const canvas = this.chartCanvas?.nativeElement;
    if (canvas) {
      if (this.chart) {
        this.chart.destroy();
      }
      console.log('Inicializando gráfica con data:', this.data);
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Capturas por mes',
            data: this.data,
            backgroundColor: [
              'rgb(20, 192, 155)', 'rgb(19, 138, 35)', 'rgb(83, 226, 47)', 'rgb(245, 255, 105)',
              'rgb(8, 51, 129)', 'rgb(247, 215, 37)', 'rgb(240, 161, 42)',
              'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)',
              'rgb(75, 192, 192)', 'rgb(153, 102, 255)'
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
      console.log('Actualizando gráfica con data:', this.data);
      this.chart.data.datasets[0].data = this.data;
      this.chart.update();
    } else {
      this.initializeChart();
    }
  }
}