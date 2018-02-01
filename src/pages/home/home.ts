///<reference types="navitia-sdk"/>
///<reference types="navitia-sdk-ux"/>
import {Component, NgZone} from '@angular/core';
import {ModalController, NavController, Platform} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import {NavitiaSDKApi, Place} from "navitia-sdk";
import {HTTP} from "@ionic-native/http";
import {errorObject} from "rxjs/util/errorObject";
import {PlacePickerModalComponent} from "../../components/place-picker-modal/place-picker-modal";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Poi} from "../../models/Poi";

declare var NavitiaSDK: NavitiaSDKApi;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    pois: Array<Poi> = [];

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
                public modalCtrl: ModalController,
                private platform: Platform,
                private zone: NgZone,
                private geolocation: Geolocation,
                private navitiaHTTP: HTTP,
                private http: Http) {
        this.platform.ready().then(() => {
            NavitiaSDK.init('9e304161-bb97-4210-b13d-c71eaf58961c');
            this.navitiaHTTP.useBasicAuth('9e304161-bb97-4210-b13d-c71eaf58961c', '');
            this.getGeolocation((resp) => {
                this.reverseGeocode(resp.coords, coordsResponse => {
                    this.zone.run(() => {
                        this.currentAddress = {
                            label: coordsResponse.address.label,
                            coords: resp.coords
                        }
                    });
                    this.getCoffeeShopsNearby();
                }, (reason) => {
                    alert(JSON.stringify(reason));
                });

            }, (error) => {
                alert('Error getting location : ' + JSON.stringify(error));
            });
        })
    }

    getGeolocation(success: (response: any) => void, error: (errorObject: any) => void) {
        this.geolocation.getCurrentPosition({
            timeout: 300000,
            enableHighAccuracy: true,
            maximumAge: 3600
        }).then((resp) => success(resp)).catch((errorObject) => error(errorObject));
    }

    reverseGeocode(coords: { latitude: number, longitude: number }, success: (coordsResponse: { address: { label: string } }) => void, error: (errorObject) => void) {
        this.navitiaHTTP.get('https://api.navitia.io/v1/coords/' + coords.latitude + '%3B' + coords.longitude + '/?', {}, {})
            .then(response => {
                success(JSON.parse(response.data));
            }, reason => {
                error(errorObject);
            });

    }

    pickPlace() {
        let placePickerModal = this.modalCtrl.create(PlacePickerModalComponent, {NavitiaSDK: NavitiaSDK});
        placePickerModal.onDidDismiss((data: {place: Place}) => {
            if (data.place === undefined) {
                return
            }

            this.zone.run(() => {
                this.currentAddress = {
                    label: data.place[data.place.embedded_type].label,
                    coords: {
                        latitude: Number(data.place[data.place.embedded_type].coord.lat),
                        longitude: Number(data.place[data.place.embedded_type].coord.lon)
                    }
                }
            });
        });
        placePickerModal.present();
    }


    getCoffeeShopsNearby() {
        this.http.get('../../assets/data/pois.json')
            .map(res => res.json())
            .subscribe((jsonPois) => {
                this.pois = [];
                jsonPois.map(rawPoi => new Poi(rawPoi))
                    .filter((poi: Poi) => {
                        return ((poi.coords !== undefined) && (poi.displayInformation !== undefined) && (poi.displayInformation.addressLabel !== undefined));
                    }).map((poi: Poi) => {
                    this.zone.run(() => {
                        this.pois.push(poi);
                    });
                })
            });
    }
}
