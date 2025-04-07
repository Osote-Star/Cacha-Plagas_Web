import { Component } from '@angular/core';
import { GraficaComponent } from './grafica/grafica.component';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrampaModel } from '../../Models/Trampa/trampa-model';
import { CardModule } from 'primeng/card';
import { AfterViewChecked } from '@angular/core';
import { TrampaService } from '../../services/trampa.service';
import { TrampaPaginadoUserDto } from '../../Models/Trampa/TrampaPaginadoUserDto';


@Component({
  selector: 'app-estadisticas',
  imports: [GraficaComponent, CommonModule,CommonModule, ButtonModule, SelectModule, DialogModule, FormsModule, ReactiveFormsModule, CardModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'], // Corregido
  standalone: true
})
export class EstadisticasComponent {
  paginadoYtrampaDto!: TrampaPaginadoUserDto;
  esAdmin: boolean = false; // Variable para identificar si es admin o usuario
  selectedTrampa: any = null; // Variable para guardar la trampa seleccionada
  PaginadoRegistros!: number;
  PaginadoPaginas!: number;
  Trampas: TrampaModel[] = []; 
  Pagina: number = 1;
  AddTrampForm!: FormGroup;
  ModalVisible: boolean = false;
  
  
  constructor(private formBuilder: FormBuilder, private trampaService: TrampaService) { 
    if (typeof window !== 'undefined' && window.localStorage) {
      const rol = localStorage.getItem('rol');
      this.esAdmin = rol === 'admin';
    }
  }

  ngOnInit() {
    this.AddTrampForm = this.formBuilder.group({
      IdTrampa: ['', Validators.required],
      Modelo: ['', Validators.required]
    });
  }
  
  getTrampas() {
    this.trampaService.getAllTrampasUsuario(this.paginadoYtrampaDto).subscribe({
      next: (response) => {
        this.PaginadoPaginas = response.totalPaginas;
        this.PaginadoRegistros = response.totalRegistros;
        this.Trampas = response.trampas;
        console.log('Trampas cargadas:', this.Trampas);
      },
      error: (err) => {
        console.error('Error al obtener trampas:', err);
      }
    });
}

  saveTrampa() { 
    // Lógica para guardar la trampa
    console.log(this.selectedTrampa); // Muestra el producto seleccionado al guardar
  }

  openModal(product: any) {
    this.selectedTrampa = product; // Asigna el producto seleccionado a la variable
    this.ModalVisible = true; // Muestra el modal
  }

  closeModal() {
    this.ModalVisible = false;
  }
  
}
