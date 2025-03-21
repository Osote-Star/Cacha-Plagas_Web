import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  redirigir(){
    console.log("Redirigiendo...");
    this.router.navigate(['validar']);
  }
}