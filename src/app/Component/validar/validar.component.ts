import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidarCodigoModel } from '../../Models/Usuario/ValidarCodigoModel';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validar-codigo',
  standalone: true,
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ValidarCodigoComponent implements OnInit {
  validacion: ValidarCodigoModel = {
    emailReceptor: '',
    codigo: ''
  };

  ngOnInit(): void {
    // Recuperar el correo almacenado
    const correoAlmacenado = sessionStorage.getItem('correoReceptor');
    if (correoAlmacenado) {
      this.validacion.emailReceptor = correoAlmacenado;
    } else {
      // Si no se encuentra el correo, redirigir al usuario a la pantalla de recuperación
      this.router.navigate(['cambiarcontrasena']);
    }
  }


  constructor(private usuarioService: UsuariosService, private router: Router) {}

  validarCodigo() {
    if (!this.validacion.codigo) {
      alert('Por favor, ingresa un código válido');
      return;
    }

    this.usuarioService.ValidarCodigoCorreo(this.validacion).subscribe({
      next: res => {
        alert(res); // "Código válido."
        this.router.navigate(['/cambiarcontrasena']); // Navegar al componente para cambiar la contraseña
      },
      error: err => {
        if (err.status === 200) {
          // Esto pasa cuando Angular malinterpreta una respuesta correcta
          alert('Correo enviado correctamente');
          this.router.navigate(['cambiarcontrasena']);
          return;
        }
        const mensaje = typeof err.error === 'object'
          ? JSON.stringify(err.error)
          : err.error || 'Error al validar el código';
        alert('Error: ' + mensaje);
      }
    });
  }
}