import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<ng-progress></ng-progress><router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
 
  constructor(
    private router: Router,
  ){}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  
}
