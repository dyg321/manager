import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INavitem } from '../../models/navitem';
import { IUser } from '../../models/user';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: 'adquisiciones.component.html'
})
export class AdquisicionesComponent  implements OnInit { 

  public data: {plan:{}, adquisiciones:[], organismo:{}};
  public loaded: boolean;
  public vigencia: string;
  public alias: string;
  private navItems: INavitem[];

  constructor (
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
  ){

    if (!this.apiService.validSession())
      return; 

    this.vigencia = this.route.snapshot.paramMap.get('vigencia');
    this.alias = this.route.snapshot.paramMap.get('alias');

  }

  ngOnInit(){

    this.navItems = [{
      href: '/inicio/organismos',
      icon: 'home',
      title: 'Inicio'
    },{
      href: '/inicio/adquisiciones/'+this.alias,
      icon: 'home',
      title: 'Adquisiciones'
    }
  ];

    this.apiService.setNavItems(this.navItems);
    const breadcrumb = [{title:'Inicio', href: 'inicio'},{title:'Adquisiciones'}]
    this.apiService.setBreadcrumb(breadcrumb);

    this.apiService.api({
      organismo_alias:this.alias,
      vigencia: this.vigencia
    },"getAdquisiciones").subscribe(res =>{
      this.loaded = true;
      this.data = JSON.parse(res.data);
    });
   
  }


}
