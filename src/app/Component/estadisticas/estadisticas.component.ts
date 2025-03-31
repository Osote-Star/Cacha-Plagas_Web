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


@Component({
  selector: 'app-estadisticas',
  imports: [GraficaComponent, CommonModule,CommonModule, ButtonModule, SelectModule, DialogModule, FormsModule, ReactiveFormsModule, CardModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'], // Corregido
  standalone: true
})
export class EstadisticasComponent {
  esAdmin: boolean = false; // Variable para identificar si es admin o usuario
  selectedTrampa: any = null; // Variable para guardar la trampa seleccionada

  // Datos de las trampas que se utilizarán en el frontend
  products = Array(8).fill({
    id: '9347',
    name: 'RAT-TRAP',
    description: 'Especializada en ratas, esta trampa es simple y efectiva, cumple su objetivo gracias a su tamaño y materiales resistentes.',
    imageUrl: '/assets/Trampa.png'
  });

  AddTrampForm!: FormGroup;
  ModalVisible: boolean = false;
  
  
  constructor(private formBuilder: FormBuilder) { 
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