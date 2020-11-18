import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestSentModalPage } from './request-sent-modal';

@NgModule({
  declarations: [
    RequestSentModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestSentModalPage),
  ],
})
export class RequestSentModalPageModule {}
