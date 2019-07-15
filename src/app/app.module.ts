import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgProgressModule } from '@ngx-progressbar/core';
import { ɵa } from '@ngx-progressbar/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';

import { ApiService } from './services/api.service';
import { InicioComponent } from './views/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        whitelistedDomains: ['localhost'],
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem('token');
        }
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    NgProgressModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
    ,RouterModule
  ],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: ɵa, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
