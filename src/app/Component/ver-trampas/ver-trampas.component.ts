import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrampaModel } from '../../Models/Trampa/trampa-model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-ver-trampas',
  imports: [CommonModule, ButtonModule, SelectModule, DialogModule, FormsModule, ReactiveFormsModule, CardModule],
  standalone: true,
  templateUrl: './ver-trampas.component.html',
  styleUrl: './ver-trampas.component.css'
})
export class VerTrampasComponent {
  Trampa: TrampaModel[] = [];
  predefinedModels: string[] = ['Modelo A', 'Modelo B', 'Modelo C', 'Modelo D']; 
  AddTrampForm!: FormGroup;
  ModalVisible: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.AddTrampForm = this.formBuilder.group({
      IdTrampa: ['', Validators.required],
      Modelo: ['', Validators.required]
    });
  }

  products = Array(8).fill({
    id: '9347',
    name: 'RAT-TRAP',
    description: 'Especializada en ratas, esta trampa es simple y efectiva, cumple su objetivo gracias a su tamaño y materiales resistentes.',
    imageUrl: '/assets/Trampa.png'
  });

  saveTrampa() {

  }

  openModal() {
    this.ModalVisible = true;
  }

  closeModal() {
    this.ModalVisible = false;
  }
}