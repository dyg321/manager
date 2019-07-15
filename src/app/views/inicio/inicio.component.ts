import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { INavitem } from '../../models/navitem';
import { IUser } from '../../models/user';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: 'inicio.component.html'
})
export class InicioComponent  implements OnInit { 

  public navItems: INavitem[];
  public loggedUser: IUser[];

  constructor (
    private router: Router,
    private apiService: ApiService
  ){

    if (!this.apiService.validSession())
      return; 

  }

  ngOnInit(){

    this.navItems = [{
      href: '/inicio',
      icon: 'home',
      title: 'Inicio'
    }];

    this.apiService.api({},"getUserData").subscribe(res =>{
      
      this.loggedUser = JSON.parse(res.data);;
    });
   
  }

  logout(){

    localStorage.clear();
    this.router.navigate(['/login']);
    this.apiService.api({},"logout").subscribe();
    return;
  }

}
