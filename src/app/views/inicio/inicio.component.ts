import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { INavitem } from '../../models/navitem';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: 'inicio.component.html'
})
export class InicioComponent  implements OnInit { 

  public navItems: INavitem[];
  private activatedRoute: ActivatedRoute;

  constructor (
    private router: Router,
    private apiService: ApiService,
    activatedRoute: ActivatedRoute
  ){

    this.activatedRoute = activatedRoute;
    
    this.apiService.validSession();

    this.navItems = [{
      href: '/inicio',
      icon: 'home',
      title: 'Inicio'
    }];


  }

  ngOnInit(){

    
    
   
  }

  logout(){

    this.router.navigate(['/login']);
    localStorage.clear();
    this.apiService.api({},"logout").subscribe();
    
  }

}
