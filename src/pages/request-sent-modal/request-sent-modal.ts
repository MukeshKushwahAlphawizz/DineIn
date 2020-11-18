import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewController} from "ionic-angular/index";

/**
 * Generated class for the RequestSentModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-sent-modal',
  templateUrl: 'request-sent-modal.html',
})
export class RequestSentModalPage {

  constructor(public navCtrl: NavController,
              public view:ViewController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  back() {
    this.view.dismiss();
  }
}
