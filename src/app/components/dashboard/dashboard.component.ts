import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage/token-storage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    const current_user = this.tokenStorage.getAuthUser()
    console.log(current_user)
  }

}
