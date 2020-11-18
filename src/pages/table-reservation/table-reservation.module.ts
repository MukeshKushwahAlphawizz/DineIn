import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TableReservationPage } from './table-reservation';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    TableReservationPage,
  ],
    imports: [
        IonicPageModule.forChild(TableReservationPage),
        StarRatingModule,
    ],
})
export class TableReservationPageModule {}
