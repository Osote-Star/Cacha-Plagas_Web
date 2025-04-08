import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Importamos FormBuilder y FormGroup
import { UsuariosService } from '../../services/usuarios.service';
import { CambiarContrasenaModel } from '../../Models/Usuario/CambiarContrasenaModel';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiarcontrasena.component.html',
  styleUrls: ['./cambiarcontrasena.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule] // Aseguramos que ReactiveFormsModule esté disponible
})

export class CambiarContrasenaComponent implements OnInit {

  cambiarContrasenaForm!: FormGroup;  // Definimos el formulario reactivo

  cambiarContrasena: CambiarContrasenaModel = {
    email: '',  // Asegúrate de tener el campo 'email'
    contrasena: ''
  };

  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
    private fb: FormBuilder  // Inyectamos FormBuilder
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario con validaciones
    this.cambiarContrasenaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Validamos que el email sea válido
      contrasena: ['', [Validators.required, Validators.minLength(3)]],  // Validamos que la contraseña tenga al menos 6 caracteres
    });
  }

  cambiarContrasenaFunc() {
    if (this.cambiarContrasenaForm.invalid) {
      alert('Por favor, ingresa todos los campos correctamente');
      return;
    }

    // Obtener el correo y la nueva contraseña del formulario
    const email = this.cambiarContrasenaForm.get('email')?.value;
    const contrasena = this.cambiarContrasenaForm.get('contrasena')?.value;

    if (!email || !contrasena) {
      alert('El correo y la contraseña son obligatorios.');
      return;
    }

    // Asignamos el correo y la nueva contraseña al objeto cambiarContrasena
    this.cambiarContrasena.email = email;
    this.cambiarContrasena.contrasena = contrasena;

    // Llamada al servicio para cambiar la contraseña
    this.usuarioService.cambiarContrasena(this.cambiarContrasena).subscribe({
      next: _res => {
        alert('Contraseña cambiada exitosamente');
        this.router.navigate(['/login']);  // Redirigir al login después de cambiar la contraseña
      },
      error: err => {
        console.error('Error al cambiar la contraseña', err);
        alert('Error: ' + (err.error || 'Error al cambiar la contraseña'));
      }
    });
  }
}