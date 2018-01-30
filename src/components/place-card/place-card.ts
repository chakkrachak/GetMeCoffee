import { Component } from '@angular/core';

/**
 * Generated class for the PlaceCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'place-card',
  templateUrl: 'place-card.html'
})
export class PlaceCardComponent {

  text: string;

  constructor() {
    console.log('Hello PlaceCardComponent Component');
    this.text = 'Hello World';
  }

}
