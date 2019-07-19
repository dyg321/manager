import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { INavitem } from '../../models/navitem';
import { IUser } from '../../models/user';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: 'organismos.component.html'
})
export class OrganismosComponent  implements OnInit { 

  public organismos: [];
  public loaded: boolean;
  private navItems: INavitem[];

  constructor (
    private router: Router,
    private apiService: ApiService
  ){

    if (!this.apiService.validSession())
      return; 

  }

  ngOnInit(){

    this.navItems = [{
      href: '/inicio/organismos',
      icon: 'home',
      title: 'Inicio'
    }];

    this.apiService.setNavItems(this.navItems);

    const breadcrumb = [{title:'Inicio', href: 'inicio'}, {title:'Organismos'}]
    this.apiService.setBreadcrumb(breadcrumb);

    this.apiService.api({},"getOrganismos").subscribe(res =>{
      this.loaded = true;
      this.organismos = JSON.parse(res.data);
    });
   
  }


}
