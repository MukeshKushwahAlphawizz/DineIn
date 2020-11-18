import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  userData:any={};
  editForm: FormGroup;
  error_messages: any = {};
  constructor(public navCtrl: NavController,
              public storage:Storage,
              public user:User,
              public util:UtilProvider,
              public formBuilder: FormBuilder,
              public navParams: NavParams) {
    this.setupEditForm()
  }

  ionViewDidEnter() {
    this.getUserData();
  }
  getUserData() {
    this.storage.get('userData').then(user=>{
      this.userData = JSON.parse(user);
      console.log('edit profile userData ===',this.userData);
      this.editForm.controls.fullName.setValue(this.userData.user_fullname);
      this.editForm.controls.email.setValue(this.userData.user_email);
      this.editForm.controls.mobileNumber.setValue(this.userData.user_phone);
    })
  }
  setupEditForm() {
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
      info: [
      ]
    };
    this.editForm = this.formBuilder.group(
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
        info: new FormControl(
          "",
          Validators.compose([
          ])
        )
        },
    );
  }

  editProfile() {
    /*if (this.editForm.value.password !== this.signUpForm.value.confirmPassword){
      this.util.presentToast('Password and Confirm Password are not matched');
      return;
    }*/
    this.util.presentLoader('');
    let formData = new FormData();
    formData.append('user_id',this.userData.user_id);
    formData.append('firstname','');
    formData.append('lastname','');
    // formData.append('user_fullname',this.editForm.value.fullName);
    formData.append('user_email',this.editForm.value.email);
    formData.append('user_phone',this.editForm.value.mobileNumber);
    formData.append('address','');
    formData.append('user_image','');

    this.user.editProfile(formData).subscribe(res=>{
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
}
