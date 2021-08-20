import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 10px
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute,
               private heroesService: HeroesService,
               private router: Router ) { }

  ngOnInit(): void {
    /**
     * El "switchMap" recibe un callback que retorna un observable. Ese nuevo obs es el que se va a 
     * subscribir para hacer la emisión en la salida. Si "params" emite un nuevo valor, entra al switchMap
     * y sale un nuevo obs y el switchMap se subscribe directamente a él, pero mantiene un único
     * observable activo y subscrito, por lo que él anterior se completa.
     */
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId(id) )
      )
      .subscribe( heroe => {this.heroe = heroe; console.log(this.heroe)} )
  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
  }

  // cargarHeroe( id: string ){
  //   console.log(id);
  // }  

}
