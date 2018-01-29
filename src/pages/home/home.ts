///<reference types="navitia-sdk"/>
///<reference types="navitia-sdk-ux"/>
import {Component, NgZone} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import {NavitiaSDKApi} from "navitia-sdk";

declare var NavitiaSDK: NavitiaSDKApi;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    currentAddress: {
        label: string;
        coords: {
            lat: number;
            lon: number;
        }
    } = {
        label: "Waiting for location",
        coords: undefined
    };

    constructor(public navCtrl: NavController, private platform: Platform, private zone: NgZone, private geolocation: Geolocation) {
        this.platform.ready().then(() => {
            NavitiaSDK.init('9e304161-bb97-4210-b13d-c71eaf58961c');
            this.getGeolocation();
        })
    }

    getGeolocation() {
        this.geolocation.getCurrentPosition({
            timeout: 300000,
            enableHighAccuracy: true,
            maximumAge: 3600
        }).then((resp) => {
            this.zone.run(() => {
                this.currentAddress = {
                    label: resp.coords.latitude + ' ' + resp.coords.longitude,
                    coords: {
                        lat: resp.coords.latitude,
                        lon: resp.coords.longitude
                    }
                }
            });
        }).catch((error) => {
            alert('Error getting location : ' + JSON.stringify(error));
        });
    }
}
