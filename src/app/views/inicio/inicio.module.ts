// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { OrganismosComponent } from '../organismos/organismos.component';

// Components Routing
import { InicioRoutingModule } from './inicio-routing.module';
import { AdquisicionesComponent } from '../adquisiciones/adquisiciones.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InicioRoutingModule
  ],
  declarations: [
    OrganismosComponent,
    AdquisicionesComponent
  ]
})
export class InicioModule  { 

  
}
