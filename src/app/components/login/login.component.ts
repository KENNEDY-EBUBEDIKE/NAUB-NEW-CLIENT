import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {SpinnerService} from "../../services/spinner/spinner.service";
import {AuthService} from "../../services/auth/auth.service";
import {TokenStorageService} from "../../services/token-storage/token-storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
  ]
})

export class LoginComponent implements OnInit, AfterViewChecked{

  loginForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
  });

  non_field_error!: any

  constructor(
    private auth_service: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    public spinner: SpinnerService,
    private changeDetector: ChangeDetectorRef) { }

  spinner$ = this.spinner.spinner$;
  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if(this.spinner$){
      this.changeDetector.detectChanges()
    }else {
      this.changeDetector.detectChanges()
    }
  }
  errorEmail!: any
  errorPassword!: any

  login(){
    this.errorPassword = false
    this.errorEmail = false

    let formData: any = new FormData();
    formData.append("email", this.loginForm.value.email)
    formData.append("password", this.loginForm.value.password)

    this.auth_service.login(formData).subscribe(response=>{
      if (response.error?.email){
        this.errorEmail = response.error.email
      }
      if (response.error?.password){
        this.errorPassword =  response.error.password
      }
      if (response.error?.non_field_errors){
        this.non_field_error = response.error.non_field_errors
        // @ts-ignore
        $(".alert").show(200).delay(4500).hide(500);
      }
      if (response.success === true){
        this.tokenStorage.saveToken(response.token)
        this.tokenStorage.saveUser(response.user);
        window.location.reload()
        this.router.navigateByUrl('/base/dashboard')
        .then(r => {
          if (r){
            window.location.reload()
            }
          }
        )
      }
    })
  }
}
