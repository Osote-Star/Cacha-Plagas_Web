import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../Models/Usuario/LoginModel';
import { TokenModel } from '../../Models/Usuario/TokenModel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule], // Módulos necesarios
  templateUrl: './Login.component.html', // Usa tu HTML existente
  styleUrls: ['./Login.component.css'] // Usa tu CSS existente
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  error: string = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginModel = {
        email: this.loginForm.get('email')?.value,
        contrasena: this.loginForm.get('contrasena')?.value
      };

      this.authService.login(credentials).subscribe({
        next: (tokens: TokenModel) => {
          if (tokens) {
            this.authService.saveTokens(tokens); // Guarda los tokens en localStorage
            this.error = '';
            this.router.navigate(['ver-trampas']); // Redirige después del login
          } else {
            this.error = 'Credenciales inválidas';
          }
        },
        error: (err) => {
          this.error = 'Error al iniciar sesión. Verifica tus credenciales.';
          console.error(err);
        }
      });
    } else {
      this.error = 'Por favor, completa todos los campos correctamente';
    }
  }

  redirigirC(): void {
    console.log("Redirigiendo a recuperar contraseña...");
    this.router.navigate(['recuperar-contrasena']);
  }

  redirigirR(): void {
    console.log("Redirigiendo a registrar...");
    this.router.navigate(['registrar']);
  }
}