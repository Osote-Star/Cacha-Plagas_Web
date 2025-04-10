// Esto va en Angular (TypeScript)
import { Component, OnInit } from '@angular/core';
import { GraficaComponent } from './grafica/grafica.component';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrampaModel } from '../../Models/Trampa/trampa-model';
import { CardModule } from 'primeng/card';
import { TrampaService } from '../../services/trampa.service';
import { TrampaPaginadoUserDto } from '../../Models/Trampa/TrampaPaginadoUserDto';
import { JwtPayload } from '../../Models/Usuario/JwtPayload';
import { AuthService } from '../../services/auth.service';
import { EstadisticasMensualesDto } from '../../Models/Trampa/EstadisticasMensualesDto';

interface ModelDictionary {
  [key: string]: string;
}

@Component({
  selector: 'app-estadisticas',
  imports: [GraficaComponent, CommonModule, ButtonModule, SelectModule, DialogModule, FormsModule, ReactiveFormsModule, CardModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
  standalone: true
})
export class EstadisticasComponent implements OnInit {
  role: string = '';
  paginadoYtrampaDto: TrampaPaginadoUserDto = new TrampaPaginadoUserDto();
  esAdmin: boolean = false;
  selectedTrampa: any = null;
  PaginadoRegistros!: number;
  PaginadoPaginas!: number;
  Trampas: TrampaModel[] = [];
  Pagina: number = 1;
  AddTrampForm!: FormGroup;
  ModalVisible: boolean = false;
  tokenDecodificado: JwtPayload | null = null;
  totalTrampas: number = 0;
  capturasPorMes: number[] = new Array(12).fill(0);
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  modelImages: ModelDictionary = {
    'Plaga grande': '/assets/plagagrande.png',
    'Plaga mediana': '../../assets/plagamediana.png',
    'Roedor': 'assets/roedor.png',
  };
  capturasHoy: number = 0;
  capturasSemana: number = 0;
  capturasMes: number = 0;
  zonaMayorCapturas: string = 'Sin datos';

  constructor(
    private formBuilder: FormBuilder,
    private trampaService: TrampaService,
    private authService: AuthService
  ) {
    this.initializeAuthData();
    this.setClaimsUser();
    this.esAdmin = this.role === 'administrador';
  }

  ngOnInit() {
    this.AddTrampForm = this.formBuilder.group({
      IdTrampa: ['', Validators.required],
      Modelo: ['', Validators.required]
    });
    if (this.esAdmin) {
      this.getTrampasCount();
      this.getTrampasHardocodeadas();
    } else {
      this.getTrampas(this.paginadoYtrampaDto);
      this.loadEstadisticasUsuario();
    }
  }

  loadEstadisticasUsuario() {
    const userId = this.tokenDecodificado?.nameid ? parseInt(this.tokenDecodificado.nameid) : 0;
    console.log('UserId usado:', userId);
    if (userId > 0 && !this.esAdmin) {
      this.trampaService.getEstadisticasUsuario(userId).subscribe({
        next: (response: EstadisticasMensualesDto) => {
          console.log('Respuesta de la API:', response);
          this.capturasPorMes = response.capturasPorMes;
          this.capturasHoy = response.capturasHoy;
          this.capturasSemana = response.capturasSemana;
          this.capturasMes = response.capturasMes;
          this.zonaMayorCapturas = response.zonaMayorCapturas;
          console.log('Datos asignados:', {
            capturasPorMes: this.capturasPorMes,
            capturasHoy: this.capturasHoy,
            capturasSemana: this.capturasSemana,
            capturasMes: this.capturasMes,
            zonaMayorCapturas: this.zonaMayorCapturas
          });
        },
        error: (err) => {
          console.error('Error al cargar estadísticas:', err);
          this.capturasPorMes = new Array(12).fill(0);
          this.capturasHoy = 0;
          this.capturasSemana = 0;
          this.capturasMes = 0;
          this.zonaMayorCapturas = 'Sin datos';
        }
      });
    } else {
      console.warn('No se carga estadísticas: usuario no válido o es administrador');
    }
  }

  getTrampasCount() {
    this.trampaService.getTrampaCount().subscribe({
      next: (response) => this.totalTrampas = response,
      error: (err) => console.error('Error al obtener conteo de trampas:', err)
    });
  }

  getTrampasHardocodeadas() {
    this.Trampas = [
      { modelo: 'Plaga grande', imagen: '/assets/plagagrande.png', _id: '0', idTrampa: 0, idUsuario: 0, localizacion: '', estatusTrampa: false, estatusSensor: false, estatusPuerta: false },
      { modelo: 'Plaga mediana', imagen: '/assets/plagamediana.png', _id: '0', idTrampa: 0, idUsuario: 0, localizacion: '', estatusTrampa: false, estatusSensor: false, estatusPuerta: false },
      { modelo: 'Roedor', imagen: '/assets/roedor.png', _id: '0', idTrampa: 0, idUsuario: 0, localizacion: '', estatusTrampa: false, estatusSensor: false, estatusPuerta: false },
    ];
  }

  getTrampas(paginaYuser: TrampaPaginadoUserDto) {
    this.trampaService.getAllTrampasUsuario(paginaYuser).subscribe({
      next: (response) => {
        this.PaginadoPaginas = response.totalPaginas;
        this.PaginadoRegistros = response.totalRegistros;
        this.totalTrampas = response.totalRegistros;
        this.Trampas = response.trampas.map((trampa: TrampaModel) => ({
          ...trampa,
          imagen: this.modelImages[trampa.modelo] || 'Imagen no disponible'
        }));
      },
      error: (err) => console.error('Error al obtener trampas:', err)
    });
  }

  openModal(trampa: any) {
    this.selectedTrampa = trampa;
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
      } catch (error) {
        console.error('Error decoding token:', error);
        this.tokenDecodificado = null;
      }
    }
  }

  private setClaimsUser(): void {
    if (this.tokenDecodificado?.role) {
      this.role = this.tokenDecodificado.role;
    }
    if (this.tokenDecodificado && this.paginadoYtrampaDto) {
      this.paginadoYtrampaDto.usuarioId = Number.parseInt(this.tokenDecodificado.nameid);
    }
  }
}