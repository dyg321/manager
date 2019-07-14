import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor (
    private router: Router,
    private http: HttpClient
  ){}

  validSession(){

    if (!localStorage.getItem("token")){
      this.router.navigate(['/login']); 
      return;
    } 

    

  }
  
}
