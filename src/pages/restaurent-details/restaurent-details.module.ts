import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurentDetailsPage } from './restaurent-details';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    RestaurentDetailsPage,
  ],
    imports: [
        IonicPageModule.forChild(RestaurentDetailsPage),
        StarRatingModule,
    ],
})
export class RestaurentDetailsPageModule {}
