import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganismosComponent } from '../organismos/organismos.component';
import { AdquisicionesComponent } from '../adquisiciones/adquisiciones.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'organismos',
    pathMatch: 'full',
  },
  {
    path: 'organismos',
    component: OrganismosComponent
  },{
    path: 'adquisiciones/:alias',
    component: AdquisicionesComponent
  },{
    path: 'adquisiciones/:alias/:vigencia',
    component: AdquisicionesComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule {}
