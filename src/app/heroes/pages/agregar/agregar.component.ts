import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

  constructor( private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router ) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') )
      return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId( id ) )
      )
      .subscribe( heroe => this.heroe = heroe );

  }

  guardar(){
    if(this.heroe.superhero.trim().length===0) 
      return;
    
    if( this.heroe.id ){
      // editar
      this.heroesService.actualizarHeroe( this.heroe ).subscribe( console.log );
    }else{
      // guardar
      this.heroesService.agregarHeroe( this.heroe ).subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
      } );
    }
  }

  eliminar(){

    this.heroesService.eliminarHeroe( this.heroe.id! ).subscribe( resp => {
      this.router.navigate(['/heroes']);
    } )
  }

}
