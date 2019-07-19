import { Injectable  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, takeUntil  } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../models/user';
import { IResponse } from '../models/response';
import { Observable, throwError, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { INavitem } from '../models/navitem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private body: HttpParams;
  private options: object;
  private url: string; 
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  protected navItems: INavitem[];
  protected breadcrumb: INavitem[];

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


  setBreadcrumb(items: INavitem[]): void {
    this.breadcrumb = items;
  }
  setNavItems(items: INavitem[]): void {
    this.navItems = items;
  }
  

  validSession(): boolean {

    const token = localStorage.getItem("token");
    
    if (!token || this.jwt.isTokenExpired(token) ){
      
      if (token && this.jwt.isTokenExpired(token)) 
        this.toastr.warning("Se ha cerrado la sesión");

      localStorage.clear();
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

        takeUntil(this.ngUnsubscribe),

        tap((res: IResponse) => {
          
          if (!res.success){

            if (res.messages != null ) {

              if (res.messages.error != null){
                res.messages.error.forEach(msg => {
                  this.toastr.error(msg);
                });
              }
              if (res.messages.warning != null){
                res.messages.warning.forEach(msg => {
                  this.toastr.warning(msg);
                });
              }
              if(res.messages.info != null){
                res.messages.info.forEach(msg => {
                  this.toastr.info(msg);
                });
              }
              
               
            } else {
              this.toastr.error(res.message);
            }
            
            if (res.message == 'logout'){
              localStorage.clear();

              this.router.navigate(['/login']);
              // This aborts all HTTP requests.
              this.ngUnsubscribe.next();
              // This completes the subject properlly.
              // this.ngUnsubscribe.complete();
            }

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
                      case 403:     
                          this.toastr.error('No se encuentra el servicio');
                          break;
                      case 500:     
                          this.toastr.error('Error interno del servidor');
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
