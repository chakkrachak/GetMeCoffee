///<reference types="navitia-sdk"/>
///<reference types="navitia-sdk-ux"/>
import {Component, NgZone} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import {NavitiaSDKApi} from "navitia-sdk";
import {HTTP} from "@ionic-native/http";
import {errorObject} from "rxjs/util/errorObject";

declare var NavitiaSDK: NavitiaSDKApi;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    currentAddress: {
        label: string;
        coords: {
            latitude: number;
            longitude: number;
        }
    } = {
        label: "Waiting for location",
        coords: undefined
    };

    constructor(public navCtrl: NavController,
                private platform: Platform,
                private zone: NgZone,
                private geolocation: Geolocation,
                private navitiaHTTP: HTTP
    ) {
        this.platform.ready().then(() => {
            NavitiaSDK.init('9e304161-bb97-4210-b13d-c71eaf58961c');
            this.navitiaHTTP.useBasicAuth('9e304161-bb97-4210-b13d-c71eaf58961c', '');
            this.getGeolocation();
        })
    }

    getGeolocation() {
        this.geolocation.getCurrentPosition({
            timeout: 300000,
            enableHighAccuracy: true,
            maximumAge: 3600
        }).then((resp) => {
            this.reverseGeocode(resp.coords, addressLabel => {
                this.zone.run(() => {
                this.currentAddress = {
                    label: addressLabel,
                    coords: resp.coords
                }
            });
            }, (reason) => {
                alert(JSON.stringify(reason));
            });

        }).catch((error) => {
            alert('Error getting location : ' + JSON.stringify(error));
        });
    }

    reverseGeocode(coords: {latitude: number, longitude: number}, success: (addressLabel: string) => void, error: (errorObject) => void) {
        this.navitiaHTTP.get('https://api.navitia.io/v1/coords/'+ coords.latitude +'%3B' + coords.longitude + '/?', {}, {})
            .then(response => {
                success(JSON.parse(response.data).address.label);
            }, reason => {
                error(errorObject);
            });

    }
}
