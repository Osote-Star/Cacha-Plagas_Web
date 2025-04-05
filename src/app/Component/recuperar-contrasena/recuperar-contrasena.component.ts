import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recuperar-contrasena',
    templateUrl: './recuperar-contrasena.component.html',
    styleUrls: ['./recuperar-contrasena.component.css'],
    standalone: true
})
export class RecuperarContrasenaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirigir(){
    console.log("Redirigiendo...");
    this.router.navigate(['validar']);
  }
}
