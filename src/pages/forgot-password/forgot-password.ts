import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  email: string = '';
  constructor(public navCtrl: NavController,
              public util: UtilProvider,
              public user: User,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  back() {
    this.navCtrl.pop();
  }

  send() {
    if (this.email.trim() === '') {
      this.util.presentToast('Please enter email');
      return;
    }
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email.trim())) {
      this.util.presentLoader('');
      let formData = new FormData();
      formData.append('user_email',this.email);

      this.user.forgotPassword(formData).subscribe((resp) => {
        let response :any= resp;
        if (response.status){
          this.util.presentToast(response.message);
          this.navCtrl.pop();
        }else {
          this.util.presentToast(response.message);
        }
        setTimeout(()=>{
          this.util.dismissLoader();
        },500);
      }, (err) => {
        console.error('ERROR :', err);
        this.util.presentToast(err.error.message);
      });
    }else {
      this.util.presentToast('Please enter valid email');
    }
  }
}
