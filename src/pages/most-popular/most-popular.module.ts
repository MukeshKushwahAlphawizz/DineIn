import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostPopularPage } from './most-popular';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    MostPopularPage,
  ],
    imports: [
        IonicPageModule.forChild(MostPopularPage),
        StarRatingModule,
    ],
})
export class MostPopularPageModule {}
