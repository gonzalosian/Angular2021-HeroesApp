import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    // "import" devuelve una promesa, por lo que cuando se cague, devuelve el "AuthModule"
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ),
    canLoad: [ AuthGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    // component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  // declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot( routes ) // la definimos como ruta principal
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
