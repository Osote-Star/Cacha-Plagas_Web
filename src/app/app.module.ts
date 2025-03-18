import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ComponentModule } from './Component/component.module';
import { ComponentRoutingModule } from './Component/component-routing.module';
import { LoginComponent } from './Component/Login/Login.component';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        RouterModule.forRoot([      // Definir rutas aquí
            { path: 'login', component: LoginComponent }
          ]),
        ComponentModule,
        ComponentRoutingModule,
        AppComponent
    ],
    providers: [],
})
export class AppModule { }