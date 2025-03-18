import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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


