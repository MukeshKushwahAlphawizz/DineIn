import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {User} from "../../providers";
import {ImgBaseUrl, UtilProvider} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pageNumber:any=1;
  pageSize:any=10;
  lat:any='22.7195687';
  lng:any='75.8577258';
  type:any='popular';//popular/recent/nearby
  restaurantList:any = [];
  isListEmpty: boolean = false;
  baseUrl: any=ImgBaseUrl;
  userData:any='';
    constructor(public navCtrl: NavController,
                public user:User,
                public util:UtilProvider,
                public storage:Storage,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public app:App) {
    }
    ionViewDidLoad() {
      this.getUserData();
      this.pageNumber = 1;
      this.getAllRestaurantList('popular',this.pageNumber,true).then(()=>{}).catch(()=>{});
    }
    dine_in_btn() {
      this.navCtrl.push('SplitBillPage');
    }
    notifications() {
      this.navCtrl.push('NotificationPage');
    }
    map() {
      let modal = this.modalCtrl.create('MapPage');
      modal.present();
    }
    back() {
      this.app.getRootNav().setRoot('UserOptionPage');
    }
    mostPopular() {
      setTimeout(()=>{
        this.navCtrl.push('MostPopularPage');
      },50);
    }
    openDetails(item:any) {
      this.storage.get('userOption').then(type=>{
        if(type === 'reservation'){
          this.app.getRootNav().push('RestaurentDetailsPage');
        }else if(type ==='dine-in'){
          if (this.userData && this.userData !==''){
            this.navCtrl.push('TableBookingPage');
            // this.app.getRootNav().push('RestaurentDetailsPage',{restaurantData:JSON.stringify(item)});
          }else {
            let profileModal = this.modalCtrl.create('ModalPage', { Pagename: 'resarvetion_model' });
            profileModal.present();
          }
        }if(type === 'on-the-run'){
          this.navCtrl.push('FoodOrderPage');
        }
      })

    }
    goBack() {
      this.navCtrl.pop();
    }

  getAllRestaurantList(type,pageNumber,isShowLoader) {
      return new Promise((resolve, reject) => {
        this.type = type;
        this.pageNumber= pageNumber;
        if (isShowLoader){
          this.util.presentLoader('');
        }
        let formData = new FormData();
        formData.append('pageNumber',this.pageNumber);
        formData.append('pageSize',this.pageSize);
        formData.append('lat',this.lat);
        formData.append('lang',this.lng);
        formData.append('type',this.type);
        this.user.getAllRestaurantList(formData).subscribe(res=>{
          let resp : any = res;
          if (resp.status){
            if (this.pageNumber === 1){
              this.restaurantList = resp.data;
            }else {
              this.restaurantList = [...this.restaurantList, ...resp.data];
            }
            this.restaurantList.length>0?this.isListEmpty=false:this.isListEmpty=true;
            this.pageNumber++;
          }else {
            this.util.presentToast(resp.message);
          }
          resolve();
          if (isShowLoader){
            setTimeout(()=>{
              this.util.dismissLoader();
            },500);
          }
        },error => {
          reject();
          this.util.dismissLoader();
          this.restaurantList.length>0?this.isListEmpty=false:this.isListEmpty=true;
        });
      });
  }

  doRefresh(refresher) {
      this.pageNumber = 1
    this.getAllRestaurantList(this.type,this.pageNumber,false).then(()=>{
      setTimeout(() => {
        refresher.complete();
      }, 500);
    }).catch(()=>{
      refresher.complete();
    });
  }

  doInfinite(infiniteScroll) {
    this.getAllRestaurantList(this.type,this.pageNumber,false).then(()=>{
      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    }).catch(()=>{
      infiniteScroll.complete();
    });
  }

  getUserData() {
      this.storage.get('userData').then(userData=>{
        this.userData = JSON.parse(userData);
        console.log(this.userData);
      })
  }
}

