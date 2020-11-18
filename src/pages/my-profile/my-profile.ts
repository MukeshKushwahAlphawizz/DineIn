import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  userData:any={};
  constructor(public navCtrl: NavController,public storage:Storage,public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.getUserData();
  }
  getUserData() {
    this.storage.get('userData').then(user=>{
      this.userData = JSON.parse(user);
    });
  }
  edit_prfl(){
    this.navCtrl.push('EditProfilePage');
  }
  Privacy(){
    this.navCtrl.push('PrivacyPage');
  }
  Setting(){
    this.navCtrl.push('SettingPage');
  }
  notifications() {
    this.navCtrl.setRoot('NotificationPage');
  }
}
