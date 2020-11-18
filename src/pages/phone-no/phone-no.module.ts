import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneNoPage } from './phone-no';

@NgModule({
  declarations: [
    PhoneNoPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneNoPage),
  ],
})
export class PhoneNoPageModule {}
