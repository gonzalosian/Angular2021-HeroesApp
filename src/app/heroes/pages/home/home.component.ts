import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {

  // usuarioLogueado: string | undefined;

  get auth(){
    return this.authService.auth;
  }

  constructor( private router: Router,
              private authService: AuthService ) { }

  ngOnInit(): void {
    // this.usuarioLogueado = this.authService.auth?.usuario;
  }

  logout(){
    // Ir al back
    // tener en un servicio el usuario logueado
    this.router.navigate( ['./auth/login'] );
  }

}
