import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { User, Api } from '../../providers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from "@ionic/storage";
import { Events } from "ionic-angular/index";


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  value: any = '';
  constructor(public user: User, public api: Api, public viewCtrl: ViewController,  public modalCtrl: ModalController,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.value = navParams.get('Pagename');
  }

  ionViewDidLoad() {
  }

  Reservation(){
    this.navCtrl.push('LoginPage')
    this.viewCtrl.dismiss();
  }
  cancelRide(){
    this.viewCtrl.dismiss();
  }

  feedback_btn(){
    this.navCtrl.push('ReviewsPage');
  }
}
