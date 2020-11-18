import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    MapPage,
  ],
    imports: [
        IonicPageModule.forChild(MapPage),
        StarRatingModule,
    ],
})
export class MapPageModule {}
