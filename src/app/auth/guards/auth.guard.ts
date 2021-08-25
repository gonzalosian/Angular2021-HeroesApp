import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor( private authService: AuthService,
              private router: Router ){

  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  // No dejar unicamente el canLoad, porque si el módulo ya fue cargado, podrán ingresar igual.
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      console.log( 'canLoad: ', true );
      console.log( 'route: ', route );
      console.log( 'segments: ', segments );

      if( this.authService.auth.id ){
        return true;
      } else {
        console.log('Bloqueado por el Auth Guard');
        // esto fue un adicional mio
        this.router.navigate( ['./auth'] );
        return false;
      }
      
  }
}
