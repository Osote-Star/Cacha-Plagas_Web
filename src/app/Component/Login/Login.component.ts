import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../Models/Usuario/LoginModel';

@Component({
    selector: 'app-Login',
    templateUrl: './Login.component.html',
    styleUrls: ['./Login.component.css'],
    standalone: true
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    error: string = '';

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginModel = this.loginForm.value;
      this.authService.Login(credentials).subscribe({
        next: (token) => {
          if (token) {
            this.authService.setToken(token);
            this.router.navigate(['ver-trampas']); // Redirige a donde quieras después del login
          } else {
            this.error = 'Credenciales inválidas';
          }
        },
        error: (err) => {
          this.error = 'Error al iniciar sesión';
          console.error(err);
        }
      });
    } else {
      this.error = 'Por favor, completa todos los campos correctamente';
    }
  }
  
  redirigirC() {
    console.log("Redirigiendo...");
    this.router.navigate(['recuperar-contrasena']);
  }

  redirigirR() {
    console.log("Redirigiendo...");
    this.router.navigate(['registrar']);
  }

}


