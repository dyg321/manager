import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { INavitem } from '../../models/navitem';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: 'inicio.component.html'
})
export class InicioComponent  implements OnInit { 

  public navItems: INavitem[];

  constructor (
    private router: Router,
    private apiService: ApiService
  ){

    
<<<<<<< HEAD
    if (!this.apiService.validSession())
      return; 
    
=======
    if(this.apiService.validSession())
      return;
>>>>>>> userdata

   

  }

  ngOnInit(){

    this.navItems = [{
      href: '/inicio',
      icon: 'home',
      title: 'Inicio'
    }];
<<<<<<< HEAD
    
=======
>>>>>>> userdata
   
  }

  logout(){

    this.router.navigate(['/login']);
    localStorage.clear();
    this.apiService.api({},"logout").subscribe();
    return;
  }

}
