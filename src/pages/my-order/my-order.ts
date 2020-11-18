import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrderPage');
  }
  open_table(){
    this.navCtrl.push('OpenTablePage');
  }
  feedback_btn(){
    this.navCtrl.push('ReviewsPage');
  }
  resto_dtls(){
    this.navCtrl.push('FoodOrderPage');
  }
}
