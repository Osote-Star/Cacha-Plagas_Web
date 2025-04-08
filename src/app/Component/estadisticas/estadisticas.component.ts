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
import { JwtPayload } from '../../Models/Usuario/JwtPayload';
import { AuthService } from '../../services/auth.service';

interface ModelDictionary {
  [key: string]: string;
}

@Component({
  selector: 'app-estadisticas',
  imports: [GraficaComponent, CommonModule,CommonModule, ButtonModule, SelectModule, DialogModule, FormsModule, ReactiveFormsModule, CardModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'], // Corregido
  standalone: true
})
export class EstadisticasComponent {
  role: string = '';
  paginadoYtrampaDto: TrampaPaginadoUserDto = new TrampaPaginadoUserDto(); // ¡Inicializado aquí!
  esAdmin: boolean = false; // Variable para identificar si es admin o usuario
  selectedTrampa: any = null; // Variable para guardar la trampa seleccionada
  PaginadoRegistros!: number;
  PaginadoPaginas!: number;
  Trampas: TrampaModel[] = []; 
  Pagina: number = 1;
  AddTrampForm!: FormGroup;
  ModalVisible: boolean = false;
  tokenDecodificado: JwtPayload | null = null;
  totalTrampas: number = 0; // Total de trampas (nuevo)
  modelImages: ModelDictionary = {
    'Plaga grande': '/assets/plagagrande.png',
    'Plaga mediana': '../../assets/plagamediana.png',
    'Roedor': 'assets/roedor.png',
  };

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
    if(this.esAdmin)
    {
      this.getTrampasCount();''
      this.getTrampasHardocodeadas();   
    }
    else
    {
      this.getTrampas(this.paginadoYtrampaDto);
    }
  }

  getTrampasCount(){
    this.trampaService.getTrampaCount().subscribe({
      next: (response) =>{
        this.totalTrampas = response;
      }
    });
    console.log(this.totalTrampas)
  }

  getTrampasHardocodeadas() {
    this.Trampas = [
      {
        modelo: 'Plaga grande',
        imagen: '/assets/plagagrande.png',
        _id: '0',
        idTrampa: 0,
        idUsuario: 0,
        localizacion: '',
        estatusTrampa: false,
        estatusSensor: false,
        estatusPuerta: false
      },
      {
        modelo: 'Plaga mediana',
        imagen: '/assets/plagamediana.png',
        _id: '0',
        idTrampa: 0,
        idUsuario: 0,
        localizacion: '',
        estatusTrampa: false,
        estatusSensor: false,
        estatusPuerta: false
      },
      {
        modelo: 'Roedor',
        imagen: '/assets/roedor.png',
        _id: '0',
        idTrampa: 0,
        idUsuario: 0,
        localizacion: '',
        estatusTrampa: false,
        estatusSensor: false,
        estatusPuerta: false,
      }
    ];
  }

  getTrampas(paginaYuser: TrampaPaginadoUserDto) {
    this.trampaService.getAllTrampasUsuario(paginaYuser).subscribe({
      next: (response) => {

        this.PaginadoPaginas = response.totalPaginas,
        this.PaginadoRegistros = response.totalRegistros,
        this.totalTrampas = response.totalRegistros,

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
  
  saveTrampa() { 
    // Lógica para guardar la trampa
    console.log(this.selectedTrampa); // Muestra el producto seleccionado al guardar
  }

  openModal(trampas: any) {
    this.selectedTrampa = trampas; // Asigna el producto seleccionado a la variable
    this.ModalVisible = true; // Muestra el modal
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
    // Si necesitas el userId para paginadoYtrampaDto
    if (this.tokenDecodificado && this.paginadoYtrampaDto) {
      this.paginadoYtrampaDto.usuarioId = Number.parseInt(this.tokenDecodificado.nameid); // Asume que userId está en el token
    }
    
    console.log(this.paginadoYtrampaDto.pagina);
    console.log(this.paginadoYtrampaDto.usuarioId);
  }
  
}
