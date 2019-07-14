import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private body: HttpParams;
  private options: object;

  constructor (
    private router: Router,
    private http: HttpClient
  ){

    this.options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

  }

  validSession(){

    if (!localStorage.getItem("token")){
      this.router.navigate(['/login']); 
      return;
    } 
 
    return this.http.post('', this.body, this.options)
    .pipe(
      tap(res => {
        console.log(res);
      })
    );

    console.log("hola mundo");

  }
  
}
