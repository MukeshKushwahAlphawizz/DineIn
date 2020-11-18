import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UtilProvider} from "../util/util";
import {User} from "..";


@Injectable()
export class RestaurantListProvider {

  constructor(public http: HttpClient,public util:UtilProvider,public user:User) {
  }

  getAllRestaurants(data:any){
    this.util.presentLoader('');
    return new Promise((resolve, reject) => {
      this.user.getAllRestaurantList(data).subscribe(res=>{
        let resp : any = res;
        if (resp.status){
          resolve(resp);
        }else {
          reject(resp);
        }
        setTimeout(()=>{
          this.util.dismissLoader();
        },500);
      },error => {
        reject(error);
        this.util.dismissLoader();
      });
    })
  }
}
