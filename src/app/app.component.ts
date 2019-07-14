import { Component } from '@angular/core';
import { INavitem } from './models/navitem'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  public navItems: INavitem[];

  constructor(){
    this.navItems = [{
      href: '/',
      icon: 'home',
      title: 'Inicio'
    }];
  }
  
}
