import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { IUser } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit  { 

  @ViewChildren('input') vc;
  loginForm: FormGroup;
  submitted: boolean;
  ready: boolean;
  loader: number;
  data: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { 

    this.submitted = false;
    this.ready = false;
    this.loader = 0;
  }
 
  ngAfterViewInit() {            
    this.vc.first.nativeElement.focus();
  }
  ngOnInit() {

    if (this.apiService.validSession())
      this.router.navigate(['/inicio']); 

    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return false;
    }

    this.ready = true;
    this.data = {username: this.f.username.value, password: this.f.password.value};
    const task = "autenticar";
    this.apiService.api(this.data, task).subscribe(res => {
      
      this.ready = false;
    })
  }
}
