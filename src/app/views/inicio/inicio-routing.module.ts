import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganismosComponent } from '../organismos/organismos.component';


const routes: Routes = [
  {
    path: '',
    component: OrganismosComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule {}
