import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ){}

  ngOnInit(){

    this.apiService.validSession();
    
    this.navItems = [{
      href: '/inicio',
      icon: 'home',
      title: 'Inicio'
    }];

  }

}
