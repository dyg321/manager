import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../models/user';
import { IResponse } from '../models/response';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
    private jwt: JwtHelperService,
    private toastr: ToastrService
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
        tap((res: IResponse) => {
          
          if (!res.success){
            res.messages.warning.forEach(msg => {
              this.toastr.error(msg);
            });
            throw 'No se ha podido realizar la consulta';

          } 

        }),
        catchError( (error: any) => {
          
          if (error instanceof HttpErrorResponse) {
              if (error.error instanceof ErrorEvent) {
                this.toastr.error('Ha ocurrido un error');
              } else {

                  switch (error.status) {
                      case 0:
                          this.toastr.error('El servidor no está disponible');
                          break;
                      case 401:      //login
                          this.toastr.error('No tiene permisos para acceder');
                          break;
                      case 403:     //forbidden
                          this.toastr.error('No se encuentra el servicio');
                          break;
                  }
              } 
          } else {
              //this.toastr.error('Ha ocurrido un error inesperado');
          }
          return throwError(error);
        })
      );
  }
  
}
