import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TableBookingPage } from './table-booking';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    TableBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(TableBookingPage),
    StarRatingModule,
  ],
})
export class TableBookingPageModule {}
