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
import { JwtPayload } from '../../Models/Usuario/JwtPayload';
import { AuthService } from '../../services/auth.service';
import { TrampaHardcodeadaDto } from '../../Models/Trampa/TrampaHardcodeadaDto';

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
  trampaHardcoded!: TrampaHardcodeadaDto;
  role: string = '';
  esAdmin: boolean = false; // Variable para identificar si es admin o usuario
  PaginadoRegistros!: number;
  PaginadoPaginas!: number;
  Trampas: TrampaModel[] = []; 
  Pagina: number = 1;
  PredefinedModels: string[] = ['Plaga grande', 'Plaga mediana', 'Roedor'];
  AddTrampForm!: FormGroup;
  ModalVisible: boolean = false;
  modelDescriptions: ModelDictionary = {
    'Plaga grande': 'Una trampa diseñada para capturar plagas grandes.',
    'Plaga mediana': 'Dispositivo especializado en atrapar moscas y otros insectos voladores.',
    'Roedor': 'Una trampa diseñada para capturar ratas de manera eficiente y segura.',
  };
  modelImages: ModelDictionary = {
    'Plaga grande': '/assets/plagagrande.png',
    'Plaga mediana': '/assets/plagamediana.png',
    'Roedor': '/assets/roedor.png',
  };
  tokenDecodificado: JwtPayload | null = null;

  constructor(private formBuilder: FormBuilder, private trampaService: TrampaService, private authService: AuthService) { 
    this.initializeAuthData();
    this.setClaimsUser();
    if (typeof window !== 'undefined' && window.localStorage) {
      const role = (this.role || '');
      this.esAdmin = role === 'administrador';
    }
  }

  ngOnInit() { 
    this.AddTrampForm = this.formBuilder.group({
      IdTrampa: ['', Validators.required],
      Modelo: ['', Validators.required]
    });
    if(this.esAdmin){
        this.getTrampas(this.Pagina)
    }
    else{
      this.getTrampasHardocodeadas()
    }
  }
    
  getTrampasHardocodeadas() {
    this.Trampas = [
      {
        modelo: 'Plaga grande',
        description: 'Trampa especializada para plagas de gran tamaño',
        imagen: '/assets/plagagrande.png',
        _id: '',
        idTrampa: 0,
        idUsuario: 0,
        localizacion: '',
        estatusTrampa: false,
        estatusSensor: false,
        estatusPuerta: false
      },
      {
        modelo: 'Plaga mediana',
        description: 'Trampa adhesiva para plagas medianas con atrayente orgánico',
        imagen: '/assets/plagamediana.png',
        _id: '',
        idTrampa: 0,
        idUsuario: 0,
        localizacion: '',
        estatusTrampa: false,
        estatusSensor: false,
        estatusPuerta: false
      },
      {
        modelo: 'Roedor',
        description: 'Trampa de resorte para roedores con mecanismo seguro',
        imagen: '/assets/roedor.png',
        _id: '',
        idTrampa: 0,
        idUsuario: 0,
        localizacion: '',
        estatusTrampa: false,
        estatusSensor: false,
        estatusPuerta: false
      }
    ];
  }
  getTrampas(pagina: number) {
    this.trampaService.getAllTrampas(pagina).subscribe({
      next: (response) => {
        this.PaginadoPaginas = response.totalPaginas;
        this.PaginadoRegistros = response.totalRegistros;

        this.Trampas = response.trampas.map((trampa: TrampaModel) => {
          // Asignación base común (imagen + descripción si no es admin)
          const trampaMapeada = {
            ...trampa,
            imagen: this.modelImages[trampa.modelo] || 'Imagen no disponible'
          };
          return trampaMapeada;
        });

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

  private initializeAuthData(): void {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      try {
        this.tokenDecodificado = this.authService.getDecodedAccessToken(accessToken);
        
        // Verificar si el token está expirado
        //if (this.tokenDecodificado && this.isTokenExpired(this.tokenDecodificado)) {
          //console.warn('Token has expired');
          //this.tokenDecodificado = null;
          //}
          
        } catch (error) {
          console.error('Error decoding token:', error);
          this.tokenDecodificado = null;
        }
      }
    }
    
    private setClaimsUser(): void {
      if (this.tokenDecodificado !== null && this.tokenDecodificado.role !== undefined) {
      this.role = this.tokenDecodificado.role;
    }
    console.log('token')
    console.log(this.tokenDecodificado);
    console.log('token rol')
    console.log(this.tokenDecodificado?.role);
    console.log('rol')
    console.log(this.role);
  }
  
}


