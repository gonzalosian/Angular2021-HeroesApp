import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  // styleUrls: ['./heroe-tarjeta.component.css']
  styles: [`
    mat-card{
      margin-top: 20px
    }
  `]
})
export class HeroeTarjetaComponent {

  // Con "heroe!" le decimos a TS que confié en nosotros sobre el contenido de "heroe"
  @Input() heroe!: Heroe;

}
