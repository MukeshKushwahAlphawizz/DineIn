import { Component } from '@angular/core';
import { IonicPage, NavController,Platform } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../providers";
import {Storage} from "@ionic/storage";
import {UtilProvider} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  error_messages : any = {};
  firebaseToken: any = '';
  constructor(public navCtrl: NavController,
              public user : User,
              public platform : Platform,
              public util : UtilProvider,
              public storage : Storage,
              public formBuilder: FormBuilder) {
    this.setupLoginFormData();
  }

  setupLoginFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: 'Email is required' },
        { type: "pattern", message: 'Please enter valid email' }
      ],

      password: [
        { type: "required", message: 'Password is required' }
      ],
    };
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
      },
    );
  }

  ionViewDidLoad() {
  }

  signIn() {
    this.util.presentLoader('');
    let formData = new FormData();
    formData.append('user_email',this.loginForm.value.email);
    formData.append('user_password',this.loginForm.value.password);
    formData.append('firebaseToken',this.firebaseToken);
    this.user.login(formData).subscribe(res=>{
      let response : any = res;
      if (response.status){
        this.storage.set('userData',JSON.stringify(response.data));
        setTimeout(()=>{
          this.util.dismissLoader();
          this.navCtrl.push('TableBookingPage');
        },500)
      }else {
        this.util.dismissLoader();
        this.util.presentToast(response.message);
      }
    },error => {
      console.error(error);
      this.util.dismissLoader();
      this.util.presentToast(error.error.message);
    })
  }

  signUp(){
    this.navCtrl.push('SignupPage');
  }
  Forgot_pass(){
    this.navCtrl.push('ForgotPasswordPage');
  }

  back() {
    this.navCtrl.pop();
  }
}
