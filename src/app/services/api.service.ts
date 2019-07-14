import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private body: HttpParams;
  private options: object;
  private url: string; 

  constructor (
    private router: Router,
    private http: HttpClient,
    private jwt: JwtHelperService
  ){

    this.options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    this.url = 'http://localhost/joomla/index.php?option=com_me';
    
    

  }

  validSession(): boolean {

    const token = localStorage.getItem("token");
    if (!token || this.jwt.isTokenExpired(token) ){
      this.router.navigate(['/login']); 
      return false;
    } 

    return true;

  }

  api(data: any, task: string) {

    data.task = task;
    this.body = new HttpParams({ fromObject: data });
    return this.http.post(this.url, this.body, this.options)
      .pipe(
        tap(res => {
          console.log(res);
        })
      );
  }
  
}
