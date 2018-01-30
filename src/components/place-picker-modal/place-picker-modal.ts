///<reference types="navitia-sdk"/>
import {Component, NgZone} from '@angular/core';
import {NavitiaSDKApi, Place} from "navitia-sdk";
import {NavParams, ViewController} from "ionic-angular";

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
    places: Array<Place> = [];
    navitiaSDK: NavitiaSDKApi;
    userEntry: string;

    constructor(
        private viewController: ViewController,
        params: NavParams,
        private zone: NgZone) {
        this.navitiaSDK = params.get('NavitiaSDK');
    }

    fillSuggestions() {
        if (this.userEntry === undefined || this.userEntry.length === 0) {
            this.places = [];
            return;
        }

        this.navitiaSDK.places.placesRequestBuilder()
            .withQ(this.userEntry)
            .get(response => {
                this.zone.run(() => {
                    this.places = response.places;
                });
            }, errorMessage => {
                alert(errorMessage);
            })
    }

    selectPlace(place: Place) {
        this.viewController.dismiss({place: place});
    }

    cancel() {
        this.viewController.dismiss({place: undefined});
    }
}
