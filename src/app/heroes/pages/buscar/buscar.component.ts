import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  terminoBusqueda: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

    // this.heroesService.getHeroes()
    //   .subscribe( heroes => {
    //     this.heroes = heroes
    //   } );
  }

  buscando(){
    console.log(this.terminoBusqueda);

    this.heroesService.getSugerencias(this.terminoBusqueda.trim())
      .subscribe( heroes => {
        console.log(heroes);

        this.heroes = heroes;

        if(heroes === null){

        }
      } );
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ){
    // Validar si es un string vací
    // console.log("event: ", event);
    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;

    this.terminoBusqueda = heroe.superhero;

    this.heroesService.getHeroePorId( heroe.id! )
      .subscribe( heroe => {
        console.log(heroe);
        this.heroeSeleccionado = heroe; 
      } );
  }

}
