import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-user-option',
  templateUrl: 'user-option.html',
})
export class UserOptionPage {

  isOption: boolean = false;
  isLanguage: boolean = false;
  isFocus1: boolean = false;
  isFocus2: boolean = false;
  isFocus3: boolean = false;
  constructor(public navCtrl: NavController,
      public storage : Storage,
      public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  home(type){
    if (type=='dine-in'){
      this.isFocus1=true;
    }else if (type=='reservation'){
      this.isFocus2=true;
    } else {
      this.isFocus3 = true;
    }
    this.storage.set('userOption',type).then(()=>{
      this.navCtrl.push('TabsPage');
    })
  }
  select(value){
    this.isOption=false;
    if(value === 'Split Order'){
       this.navCtrl.push('PhoneNoPage');
    }else if(value === 'Open Bill'){
      this.navCtrl.push('SplitBillPage');
    }if (value === 'Pay'){
      this.navCtrl.push('PaymentPage');
    }
  }

  selectLang(lang: string) {
    this.isLanguage=false;
  }
}
