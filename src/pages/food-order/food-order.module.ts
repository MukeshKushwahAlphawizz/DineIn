import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodOrderPage } from './food-order';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    FoodOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodOrderPage),
    StarRatingModule,
  ],
})
export class FoodOrderPageModule {}
