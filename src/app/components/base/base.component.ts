import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import {SpinnerService} from "../../services/spinner/spinner.service";
import {TokenStorageService} from "../../services/token-storage/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit, AfterViewChecked {
  is_authenticated!: boolean
  current_user: any = this.tokenStorage.getAuthUser()

  constructor(public spinner: SpinnerService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private changeDetector: ChangeDetectorRef) { }

  spinner$ = this.spinner.spinner$;

  ngOnInit(): void {
    this.is_authenticated = !!this.tokenStorage.getToken();
    if(!this.is_authenticated){
      this.router.navigate(['/login'])
    }
  }


  ngAfterViewChecked(): void {
    if(this.spinner$){
      this.changeDetector.detectChanges()
    }else {
      this.changeDetector.detectChanges()
    }
  }


  logOutUser(): void{
    this.tokenStorage.signOut()
    window.sessionStorage.clear();
    this.is_authenticated = false
  }

}


