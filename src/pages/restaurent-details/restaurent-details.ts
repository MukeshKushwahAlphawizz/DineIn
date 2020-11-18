import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";

/**
 * Generated class for the RestaurentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurent-details',
  templateUrl: 'restaurent-details.html',
})
export class RestaurentDetailsPage {

  restaurantData:any={};

  constructor(public navCtrl: NavController,public storage:Storage,
              public navParams: NavParams,
              public user:User,
              public util:UtilProvider) {
    // this.restaurantData = JSON.parse(navParams.data.restaurantData);
  }

  ionViewDidLoad() {
    // this.getMenuList();
  }

  table_book(){
    this.navCtrl.push('TableReservationPage');
  }
  feedback_btn(){
    this.navCtrl.push('ReviewsPage');
  }
  getMenuList() {
    this.util.presentLoader('');
    let formData = new FormData();
    formData.append('restaurant_id',this.restaurantData.restaurant_id);
    formData.append('lat',this.restaurantData.lat);
    formData.append('lang',this.restaurantData.long);

    let data = {
      "restaurant_id":"10",
      "lat":"22.724355",
      "lang":"75.8577258"
    }
    this.user.getMenuList(formData).subscribe(res=>{
      let resp:any = res;
      if (resp.status){

      }else {
        this.util.presentLoader(resp.message);
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
