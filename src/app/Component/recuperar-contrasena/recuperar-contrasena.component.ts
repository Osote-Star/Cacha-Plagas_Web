import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { EnviarCorreoModel } from '../../Models/Usuario/EnviarCorreoModel';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-recuperar-contrasena',
    templateUrl: './recuperar-contrasena.component.html',
    styleUrls: ['./recuperar-contrasena.component.css'],
    standalone: true,
    imports: [FormsModule]
})

export class RecuperarContrasenaComponent {
  correo: EnviarCorreoModel = {
    emailReceptor: '',
    tema: 'Hola, hemos recibido un correo de tu parte el cual es para recuperar contraseña'
  };

  constructor(
    private router: Router,
    private usuarioService: UsuariosService
  ) {}

  // enviarCorreo() {
  //   const email = this.correo.emailReceptor.trim();
  
  //   if (!email) {
  //     alert('Por favor, ingresa un correo válido');
  //     return;
  //   }
  
  //   // Validar dominio
  //   if (!email.endsWith('@gmail.com') && !email.endsWith('@hotmail.com')) {
  //     alert('Solo se permiten correos @gmail.com o @hotmail.com');
  //     return;
  //   }
  
  //   // Asegura que el campo tema esté presente
  //   this.correo.tema = this.correo.tema || 'Recuperación de contraseña';
  
  //   this.usuarioService.EnviarCorreo(this.correo).subscribe({
  //     next: () => {
  //       alert('Correo enviado correctamente');
  //       this.router.navigate(['validar']);
  //     },
  //     error: err => {
  //       if (err.status === 200) {
  //         // Esto pasa cuando Angular malinterpreta una respuesta correcta
  //         alert('Correo enviado correctamente');
  //         this.router.navigate(['validar']);
  //         return;
  //       }
      
  //       const mensaje = typeof err.error === 'object'
  //         ? JSON.stringify(err.error)
  //         : err.error || 'Ocurrió un error al enviar el correo';
  //       alert('Error al enviar: ' + mensaje);
  //     }
  //   });
  // }


  enviarCorreo() {
    const email = this.correo.emailReceptor.trim();
  
    if (!email) {
      alert('Por favor, ingresa un correo válido');
      return;
    }
  
    // Validar dominio
    if (!email.endsWith('@gmail.com') && !email.endsWith('@hotmail.com')) {
      alert('Solo se permiten correos @gmail.com o @hotmail.com');
      return;
    }
  
    // Asegura que el campo tema esté presente
    this.correo.tema = this.correo.tema || 'Recuperación de contraseña';
  
    // Almacenar correo en sessionStorage (temporal)
    sessionStorage.setItem('correoReceptor', this.correo.emailReceptor);
  
    this.usuarioService.EnviarCorreo(this.correo).subscribe({
      next: () => {
        alert('Correo enviado correctamente');
        this.router.navigate(['validar']); // Navegar al componente de validación
      },
      error: err => {
        if (err.status === 200) {
          // Esto pasa cuando Angular malinterpreta una respuesta correcta
          alert('Correo enviado correctamente');
          this.router.navigate(['validar']);
          return;
        }

        const mensaje = typeof err.error === 'object'
          ? JSON.stringify(err.error)
          : err.error || 'Ocurrió un error al enviar el correo';
        alert('Error al enviar: ' + mensaje);
      }
    });
  }
}

