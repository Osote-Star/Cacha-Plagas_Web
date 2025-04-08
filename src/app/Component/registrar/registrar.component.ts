import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgregarUsuarioModel } from '../../Models/Usuario/AgregarUsuarioModel';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-registrar',
    templateUrl: './registrar.component.html',
    styleUrls: ['./registrar.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class RegistrarComponent implements OnInit {

  usuario: AgregarUsuarioModel = {
    email: '',
    contrasena: ''
  };
  
  constructor( private router: Router, private usuarioService: UsuariosService) { }

  ngOnInit() {
  }

  redirigir(){
    console.log("Redirigiendo...");
    this.router.navigate(['login']);
  }

  AgregarUsuario(usuario: AgregarUsuarioModel){
    const{email, contrasena} = this.usuario;

    if(!email || !contrasena) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if(!email.endsWith('@gmail.com')){
      alert('es necesario ser un correo de "@gmail"')
      return;
    }
    this.usuarioService.AgregarUsuario(usuario).subscribe({
      next: (respuesta) => {
        console.log('Usuario Registrado correctamente', respuesta);
        //para redirigir
        this.redirigir();
      },
      error: (error) => {
        console.error('Error al registrar el usuario', error);
      }
    })
  }

  
}
