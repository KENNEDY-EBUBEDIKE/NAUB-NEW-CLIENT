import {Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {StaffService} from "../../services/staff/staff.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner/spinner.service";


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit, AfterViewChecked {

  constructor(
    private router: Router,
    private staff_service: StaffService,
    private titleService: Title,
    public spinner: SpinnerService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.staff_service.RefreshRequired.subscribe(response=>{
      this.getAllStaff();
    });
  }

  title: string = "NAUB | Staff Database";
  allStaff!: any
  spinner$ = this.spinner.spinner$;

  ngOnInit(): void {
    this.setTitle(this.title);
    this.getAllStaff();
  }

  ngAfterViewChecked(): void {
    if(this.spinner$){
      this.changeDetector.detectChanges()
    }else {
      this.changeDetector.detectChanges()
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


  public getAllStaff(){
    this.staff_service.getAllStaff().subscribe(response=>{
      if(response.success){
        this.allStaff = response.all_staff
        // @ts-ignore
        $(function () {

          // @ts-ignore
          $('#example1').DataTable()

          // @ts-ignore
          $('#example2').DataTable({
            'paging'      : true,
            'lengthChange': false,
            'searching'   : false,
            'ordering'    : true,
            'info'        : true,
            'autoWidth'   : false
          })
        })
      }
    })
  }

}

