import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { InicioComponent } from './views/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./views/inicio/inicio.module').then(m => m.InicioModule)
      }
    ]
    
  },{
    path: 'login',
    component: LoginComponent
  }
  ,{ path:  '', redirectTo:  'inicio', pathMatch:  'full' }
  ,{ path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
