// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { OrganismosComponent } from '../organismos/organismos.component';

// Components Routing
import { InicioRoutingModule } from './inicio-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InicioRoutingModule
  ],
  declarations: [
    OrganismosComponent
  ]
})
export class InicioModule  { 

  
}
