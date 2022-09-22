import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {scanner} from "../student/student-profile/student-profile.component"
import {SecurityService} from "../../services/security/security.service";
import {SpinnerService} from "../../services/spinner/spinner.service";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit, AfterViewChecked {

  constructor(private titleService: Title,
              private securityService: SecurityService,
              public spinner: SpinnerService,
              private changeDetector: ChangeDetectorRef,) {
    this.setTitle(this.title)
  }

  title: string = "NAUB | Security Scan";
  spinner$ = this.spinner.spinner$;
  profile!: any;
  server_url = this.securityService._server_url
  card_owner!:any;

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if(this.spinner$){
      this.changeDetector.detectChanges()
    }else {
      this.changeDetector.detectChanges()
    }
  }

  public requestToScanCard(event:any){
    event.preventDefault()
    // @ts-ignore
    $("#scanBtn").hide();
    scanner(this.securityScan.bind(this))
  }

  public securityScan(value:any){
    let formData: any = new FormData()
    formData.append('rfid_code', value)

    this.securityService.securityScan(formData).subscribe(response=>{
      if (response.success){
        this.card_owner = response.student
        // @ts-ignore
        $("#photo").attr('src', this.server_url + this.card_owner.photo);

      }else {
        console.log(response.message)
      }
    })
  }
}
