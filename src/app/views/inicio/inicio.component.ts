import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router  } from '@angular/router';
=======
import { Router, ActivatedRoute  } from '@angular/router';
>>>>>>> userdata
import { INavitem } from '../../models/navitem';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: 'inicio.component.html'
})
export class InicioComponent  implements OnInit { 

  public navItems: INavitem[];
<<<<<<< HEAD

  constructor (
    private router: Router,
    private apiService: ApiService
  ){

    
    if (!this.apiService.validSession())
      return; 
    


  }

  ngOnInit(){

=======
  private activatedRoute: ActivatedRoute;

  constructor (
    private router: Router,
    private apiService: ApiService,
    activatedRoute: ActivatedRoute
  ){

    this.activatedRoute = activatedRoute;
    
    this.apiService.validSession();

>>>>>>> userdata
    this.navItems = [{
      href: '/inicio',
      icon: 'home',
      title: 'Inicio'
    }];
<<<<<<< HEAD
=======


  }

  ngOnInit(){

    
>>>>>>> userdata
    
   
  }

  logout(){

    this.router.navigate(['/login']);
    localStorage.clear();
    this.apiService.api({},"logout").subscribe();
    return;
  }

}
