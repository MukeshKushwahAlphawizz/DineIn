import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-food-order',
  templateUrl: 'food-order.html',
})
export class FoodOrderPage {

  constructor(public navCtrl: NavController,public storage:Storage,
              public navParams: NavParams,
              public user:User,
              public util:UtilProvider,
              public app:App) {

 }

  ionViewDidLoad() {

  }

  feedback_btn(){
    this.navCtrl.push('ReviewsPage');
  }
  order_only(){
    this.navCtrl.push('TabsPage');
  }


}
