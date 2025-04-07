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
  PredefinedModels: string[] = ['Rat-Catcher', 'Fly-Catcher', 'Snake-Catcher', 'Modelo D'];
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
    this.trampaService.getAllTrampas(pagina).subscribe((data) => {
      // Mapeamos los datos para agregar la descripción
      this.Trampas = data.map((trampa: TrampaModel) => ({
        ...trampa,
        description: this.modelDescriptions[trampa.Modelo] || 'Descripción no disponible'
      }));
      console.log(this.Trampas); // Verifica los datos con descripciones
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