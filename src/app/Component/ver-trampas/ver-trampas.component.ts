import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TrampaModel } from '../../Models/Trampa/trampa-model';
import { TrampaService } from '../../services/trampa.service';
import { GetTrampaDto } from '../../Models/Trampa/GetTrampaDto';

interface ModelDictionary {
  [key: string]: string;
}

@Component({
    selector: 'app-ver-trampas',
    imports: [CommonModule, ButtonModule, SelectModule, DialogModule, FormsModule, ReactiveFormsModule, CardModule],
    templateUrl: './ver-trampas.component.html',
    styleUrl: './ver-trampas.component.css',
    standalone: true
})
export class VerTrampasComponent{
  PaginadoRegistros!: number;
  PaginadoPaginas!: number;
  PredefinedModels: string[] = ['Rat-Catcher', 'Fly-Catcher', 'Snake-Catcher', 'Spider-Catcher'];
  Trampas: TrampaModel[] = [];
  AddTrampForm!: FormGroup;
  ModalVisible: boolean = false;
  Pagina: number = 1;
  modelDescriptions: ModelDictionary = {
    'Rat-Catcher': 'Una trampa diseñada para capturar ratas de manera eficiente y segura.',
    'Fly-Catcher': 'Dispositivo especializado en atrapar moscas y otros insectos voladores.',
    'Snake-Catcher': 'Herramienta robusta para capturar serpientes sin dañarlas.',
    'Modelo D': 'Trampa versátil de diseño moderno para múltiples tipos de plagas.'
  };

  constructor(private formBuilder: FormBuilder, private trampaService: TrampaService) { }

  ngOnInit() { 
    this.AddTrampForm = this.formBuilder.group({
      IdTrampa: ['', Validators.required],
      Modelo: ['', Validators.required]
    });
    this.getTrampas(this.Pagina)
  }

  getTrampas(pagina: number) {
    this.trampaService.getAllTrampas(pagina).subscribe({
      next: (response) => {
        this.PaginadoPaginas = response.totalPaginas,
        this.PaginadoRegistros = response.totalRegistros,
        this.Trampas = response.trampas.map((trampa: TrampaModel) => ({
          ...trampa,
          description: this.modelDescriptions[trampa.modelo] || 'Descripción no disponible'
        }));
        console.log('Trampas cargadas:', this.Trampas);
      },
      error: (err) => {
        console.error('Error al obtener trampas:', err);
      }
    });
  }


  saveTrampa() {

  }

  openModal() {
    this.ModalVisible = true;
  }

  closeModal() {
    this.ModalVisible = false;
  }
}