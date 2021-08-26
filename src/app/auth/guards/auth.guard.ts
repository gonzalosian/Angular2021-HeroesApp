import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authService: AuthService,
              private router: Router ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
                                .pipe(
                                  tap( estaAutenticado => {
                                    console.log( 'Pasa por el canActivate');
                                    if( !estaAutenticado ){
                                      this.router.navigate(['./auth/login'])
                                    }
                                  } )
                                );

      // if( this.authService.auth.id ){
      //   return true;
      // }

      // console.log('Bloqueado por el Auth Guard - canActivate');
      // // esto fue un adicional mio
      // this.router.navigate( ['./auth'] );
      // return false;

  }

  // No dejar unicamente el canLoad, porque si el módulo ya fue cargado, podrán ingresar igual.
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      // console.log( 'canLoad: ', true );
      // console.log( 'route: ', route );
      // console.log( 'segments: ', segments );

      return this.authService.verificaAutenticacion()
                                .pipe(
                                  tap( estaAutenticado => {
                                    console.log( 'Pasa por el canLoad');
                                    if( !estaAutenticado ){
                                      this.router.navigate(['./auth/login'])
                                    }
                                  } )
                                );

      // if( this.authService.auth.id ){
      //   return true;
      // } else {
      //   console.log('Bloqueado por el Auth Guard - canLoad');
      //   // esto fue un adicional mio
      //   this.router.navigate( ['./auth'] );
      //   return false;
      // }
      
  }
}
