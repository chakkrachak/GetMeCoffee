import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Geolocation} from '@ionic-native/geolocation';
import {GoogleMaps} from '@ionic-native/google-maps';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {HTTP} from "@ionic-native/http";
import {PlacePickerModalComponent} from "../components/place-picker-modal/place-picker-modal";
import {PlaceCardComponent} from "../components/place-card/place-card";
import {HttpModule} from "@angular/http";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        PlacePickerModalComponent,
        PlaceCardComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        PlacePickerModalComponent,
        PlaceCardComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        GoogleMaps,
        HTTP,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
