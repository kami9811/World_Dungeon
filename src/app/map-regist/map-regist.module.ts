import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapRegistPageRoutingModule } from './map-regist-routing.module';

import { MapRegistPage } from './map-regist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapRegistPageRoutingModule
  ],
  declarations: [MapRegistPage]
})
export class MapRegistPageModule {}
