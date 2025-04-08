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
import { ModeloYPaginadoDto } from '../../Models/Trampa/ModeloYPaginadoDto';
import { EditarTrampaDto } from '../../Models/Trampa/EditarTrampaDto';
import { AgregarTrampa } from '../../Models/Trampa/AgregarTrampa';

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
  agregarTrampa: AgregarTrampa = {idTrampa: 0, modelo: ''};
  selectedTrampa: TrampaModel | null = null; // Add this to track the selected trap
  modeloYPaginadoDto: ModeloYPaginadoDto = new ModeloYPaginadoDto(); // ¡Inicializado aquí!
  trampaHardcoded!: TrampaHardcodeadaDto;
  role: string = '';
  esAdmin: boolean = false; // Variable para identificar si es admin o usuario
  PaginadoRegistros!: number;
  PaginadoPaginas!: number;
  Trampas: TrampaModel[] = []; 
  Pagina: number = 1;
  PredefinedModels: string[] = ['Escoge un modelo', 'Plaga grande', 'Plaga mediana', 'Roedor'];
  EditTrampaModels: string[] = ['Plaga grande', 'Plaga mediana', 'Roedor'];
  selectedModel: string = '';
  AddTrampForm!: FormGroup;
  ModalVisible: boolean = false;
  EditModalVisible: boolean = false;
  EditTrampForm!: FormGroup; // Formulario específico para edición
  editarTrampaDto: EditarTrampaDto = { idTrampa: 0, modelo: '' }; // Inicialización con valores por defecto
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
    // Formulario para agregar
    this.AddTrampForm = this.formBuilder.group({
      IdTrampa: ['', Validators.required],
      Modelo: ['', Validators.required]
    });

    // Formulario para editar
    this.EditTrampForm = this.formBuilder.group({
      Modelo: ['', Validators.required]
    });

    if (this.esAdmin) {
      this.getTrampas(this.Pagina);
    } else {
      this.getTrampasHardocodeadas();
    }
  }
  onModelSelected(event: any) {
    this.selectedModel = event.value; // Actualiza el modelo seleccionado

    if (this.selectedModel === 'Escoge un modelo') {
      // Si selecciona "Escoge un modelo", carga todas las trampas (página 1)
      this.getTrampas(this.Pagina);
    } else {
      // Si selecciona un modelo específico, filtra por ese modelo
      this.modeloYPaginadoDto.modelo = this.selectedModel;
      this.getTrampasFilterByModel(this.modeloYPaginadoDto);
    }
  }
    
    getTrampasFilterByModel(modeloYPagina: ModeloYPaginadoDto) {
      this.trampaService.FiltByModel(modeloYPagina).subscribe({
        next: (response) => {
  
          this.PaginadoPaginas = response.totalPaginas,
          this.PaginadoRegistros = response.totalRegistros,

          this.Trampas = response.trampas.map((trampa: TrampaModel) => ({
            ...trampa,
            imagen: this.modelImages[trampa.modelo] || 'Imagen no disponible'
          }));
          console.log('Trampas cargadas:', this.Trampas);
  
        },
        error: (err) => {
          console.error('Error al obtener trampas:', err);
        }
      });
    }
    
    editTrampa() {
      console.log('Submit disparado'); // Verifica si el método se ejecuta
      console.log('Formulario válido:', this.EditTrampForm.valid);
      console.log('Trampa seleccionada:', this.selectedTrampa);
      console.log('Valores del formulario:', this.EditTrampForm.value);
    
      if (this.EditTrampForm.valid && this.selectedTrampa) {
        this.editarTrampaDto.modelo = this.EditTrampForm.get('Modelo')?.value;
        console.log('Enviando al servicio:', this.editarTrampaDto);
    
        this.trampaService.EditarTrampa(this.editarTrampaDto).subscribe({
          next: (response) => {
            console.log('Trampa editada con éxito:', response);
            this.getTrampas(this.Pagina); // Refresca la lista
            this.closeModalEdit(); // Cierra el modal
          },
          error: (err) => {
            console.error('Error al editar trampa:', err);
            // Opcional: mostrar un mensaje al usuario, e.g., con un toast
          }
        });
      } else {
        console.log('Formulario no válido o no hay trampa seleccionada');
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
    console.log('Submit disparado');
    console.log('Formulario válido:', this.AddTrampForm.valid);
    console.log('Valores del formulario:', this.AddTrampForm.value);

    if (this.AddTrampForm.valid) {
      this.agregarTrampa.idTrampa = this.AddTrampForm.get('IdTrampa')?.value;
      this.agregarTrampa.modelo = this.AddTrampForm.get('Modelo')?.value;
      console.log('Enviando al servicio:', this.agregarTrampa);

      this.trampaService.AgregarTrampa(this.agregarTrampa).subscribe({
        next: (response) => {
          console.log('Trampa agregada con éxito:', response);
          this.getTrampas(this.Pagina);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al agregar trampa:', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  

  openModal() {
    this.ModalVisible = true;
  }
  closeModal() {
    this.ModalVisible = false;
  }

  openModalEdit(trampa?: TrampaModel) {
    if (trampa) {
      this.selectedTrampa = trampa;
      this.editarTrampaDto = { idTrampa: trampa.idTrampa, modelo: trampa.modelo }; // Carga inicial
      this.EditTrampForm.patchValue({
        Modelo: trampa.modelo
      });
    }
    this.EditModalVisible = true;
  }

  closeModalEdit() {
    this.EditModalVisible = false;
    this.EditTrampForm.reset(); // Opcional: limpiar el formulario al cerrar
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


