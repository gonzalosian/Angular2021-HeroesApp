import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
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
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog ) { }

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
      this.heroesService.actualizarHeroe( this.heroe ).subscribe( heroe => {
        console.log(heroe);
        this.heroe = heroe;
        this.mostrarSnackBar('Se actualizó correctamente.');
      } );
    }else{
      // guardar
      this.heroesService.agregarHeroe( this.heroe ).subscribe( heroe => {
        this.mostrarSnackBar('Se guardó correctamente.');
        this.router.navigate(['/heroes/editar', heroe.id])
      } );
    }
  }

  eliminar(){

    const dialog = this.dialog.open( ConfirmComponent, {
      width: '250px',
      data: {...this.heroe}
    } );

    // TODO: Implementar un switchMap para optmizar
    dialog.afterClosed().subscribe( resp => {
      if( resp ){
        this.heroesService.eliminarHeroe( this.heroe.id! ).subscribe( resp => {
          this.router.navigate(['/heroes']);
        } );
      }
    } )

  }

  mostrarSnackBar( mensaje: string ) {
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }

}
