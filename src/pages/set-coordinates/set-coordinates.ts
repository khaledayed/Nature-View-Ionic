import { Component, OnInit } from '@angular/core';
import { LoadingController, NavParams, ToastController, ViewController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'page-set-coordinates',
  templateUrl: 'set-coordinates.html',
})
export class SetCoordinatesPage implements OnInit {

  latitude: number;
  longitude: number;
  marker: {
    latitude: number,
    longitude: number,
    draggable: true
  };

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {}

  ngOnInit() {
    let receivedLatitude = this.navParams.get('latitude');
    let receivedLongitude = this.navParams.get('longitude');
    if (receivedLatitude) {
      this.latitude = receivedLatitude;
      this.longitude = receivedLongitude;
      this.marker = {
        latitude: receivedLatitude,
        longitude: receivedLongitude,
        draggable: true
      }
    } else {
      this.latitude = 57.28;
      this.longitude = -2.58;
    }
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

  onSave() {
    this.viewCtrl.dismiss({
      latitude: this.marker.latitude,
      longitude: this.marker.longitude
    });
  }

  onMapClicked($event) {
    this.marker = {
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true
    };
  }

  onLocateMe() {
    let loader = this.loadingCtrl.create({
      content: 'Recherche de votre position…'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        loader.dismiss();
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.marker = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude,
          draggable: true
        }
      }).catch(
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

}