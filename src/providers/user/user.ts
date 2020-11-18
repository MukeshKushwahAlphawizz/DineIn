import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class User {

  restaurantList:string = 'Products/GetAllRestaurantNew';
  registration:string = 'Authentication/registration';
  menu:string = 'Products/GetMenuItemsBySubcategoryId';
  loginUrl:string = 'Authentication/login';
  forgotPasswordUrl:string = 'Authentication/forgotPassword';
  changePasswordUrl:string = 'Authentication/changePassword';
  editProfileUrl:string = 'Authentication/editProfile';

  constructor(public api: Api) { }

  login(accountInfo: any) {
    let seq = this.api.post(this.loginUrl, accountInfo).share();
    return seq;
  }

  signup(accountInfo: any) {
    let seq = this.api.post(this.registration, accountInfo).share();
    return seq;
  }
  forgotPassword(data: any) {
    let seq = this.api.post(this.forgotPasswordUrl, data).share();
    return seq;
  }

  getAllRestaurantList(data: any) {
    let seq = this.api.post(this.restaurantList, data).share();
    return seq;
  }
  getMenuList(data: any) {
    let seq = this.api.post(this.menu, data).share();
    return seq;
  }
  editProfile(data: any) {
    let seq = this.api.post(this.editProfileUrl, data).share();
    return seq;
  }

}
