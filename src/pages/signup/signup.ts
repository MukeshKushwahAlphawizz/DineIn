import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signUpForm: FormGroup;
  error_messages: any = {};
  firebaseToken: any = '';
  constructor(public navCtrl: NavController,
              public user:User,
              public storage:Storage,
              public formBuilder: FormBuilder,
              public util:UtilProvider,
              public navParams: NavParams) {
    this.setupSignUpForm();
  }

  ionViewDidLoad() {

  }

  signUp() {
    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword){
      this.util.presentToast('Password and Confirm Password are not matched');
      return;
    }
    this.util.presentLoader('');
    let formData = new FormData();
    formData.append('user_fullname',this.signUpForm.value.fullName);
    formData.append('user_email',this.signUpForm.value.email);
    formData.append('user_phone',this.signUpForm.value.mobileNumber);
    formData.append('user_password',this.signUpForm.value.password);
    formData.append('firebaseToken',this.firebaseToken);

    this.user.signup(formData).subscribe(res=>{
      let resp :any = res;
      this.util.presentAlert('',resp.message);
      if (resp.status){
        this.storage.set('userData',JSON.stringify(resp.data)).then(()=>{
          this.navCtrl.pop();
        });
      }
      setTimeout(()=>{
        this.util.dismissLoader();
      },500);
    },error => {
      console.error(error);
      this.util.dismissLoader();
    })
  }

  setupSignUpForm() {
    this.error_messages = {
      fullName: [
        { type: "required", message: 'Full name is required' },
        { type: "pattern", message: '*Enter valid name' },
      ],
      email: [
        { type: "required", message: 'Email is required' },
        { type: "pattern", message: '*Enter valid email' },
      ],
      mobileNumber: [
        { type: "required", message: 'Mobile number is required' },
        { type: "minlength", message: '*Minimum length should be 10' },
        { type: "maxlength", message: '*Maximum length should be 12' }
      ],
      password: [
        { type: "required", message: 'Password is required' },
        { type: "minlength", message: '*Minimum length should be 8' },
        { type: "maxlength", message: '*Maximum length should be 12' }
      ],
      confirmPassword: [
        { type: "required", message: 'Confirm Password is required' },
        { type: "minlength", message: "Minimun length should be 8" },
        { type: "maxlength", message: "Maximum length should be 12" }
      ]
    };
    this.signUpForm = this.formBuilder.group(
      {
        fullName: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z ]*')
          ])
        ),
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          ])
        ),
        mobileNumber: new FormControl(
          "", Validators.compose([Validators.required,
            Validators.minLength(10),
            Validators.maxLength(12)
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12)
          ])
        ),
        confirmPassword: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12)
          ])
        )},
    );
  }

  back() {
    this.navCtrl.pop();
  }
}
