import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewsPage } from './reviews';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    ReviewsPage,
  ],
    imports: [
        IonicPageModule.forChild(ReviewsPage),
        StarRatingModule,
    ],
})
export class ReviewsPageModule {}
