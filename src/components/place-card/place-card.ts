import {Component, Input} from '@angular/core';
import {Poi} from "../../models/Poi";

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

    _poi: Poi;
    @Input()
    set poi(poi) {
        this._poi = poi;
    }
    get poi(): Poi {
        return this._poi;
    }

    constructor() {
    }

}
