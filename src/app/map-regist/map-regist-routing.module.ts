import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapRegistPage } from './map-regist.page';

const routes: Routes = [
  {
    path: '',
    component: MapRegistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRegistPageRoutingModule {}
