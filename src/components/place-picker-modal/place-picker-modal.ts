import { Component } from '@angular/core';

/**
 * Generated class for the PlacePickerModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'place-picker-modal',
  templateUrl: 'place-picker-modal.html'
})
export class PlacePickerModalComponent {

  text: string;

  constructor() {
    console.log('Hello PlacePickerModalComponent Component');
    this.text = 'Hello World';
  }

}
