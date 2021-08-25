import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../interfaces/auth.interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  // get auth(){
  //   return {...this._auth};
  // }
  get auth(): Auth {
    return {...this._auth!};
  }

  constructor( private http: HttpClient ) { }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
              .pipe(
                tap( resp => this._auth = resp )
              );
  }
}
