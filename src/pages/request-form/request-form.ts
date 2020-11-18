import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ModalController} from "ionic-angular/index";


@IonicPage()
@Component({
  selector: 'page-request-form',
  templateUrl: 'request-form.html',
})
export class RequestFormPage {

  constructor(public navCtrl: NavController,
              public modal:ModalController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  requestSent() {
    let modal = this.modal.create('RequestSentModalPage');
    modal.present();
    modal.onDidDismiss(data=>{
      this.navCtrl.popToRoot();
    })
  }
}
