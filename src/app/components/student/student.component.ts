import {Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {StudentService} from "../../services/student/student.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner/spinner.service";

// @ts-ignore
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: [
    './student.component.css',
    "../../../assets/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css",
  ]
})

export class StudentComponent implements OnInit, AfterViewChecked {

  constructor(
    private router: Router,
    private student_service: StudentService,
    private titleService: Title,
    public spinner: SpinnerService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.student_service.Refreshrequired.subscribe(response=>{
      this.getStudents();
    });
  }

  title: string = "NAUB | Students Database";
  students!: any
  spinner$ = this.spinner.spinner$;

  ngOnInit(): void {
    this.setTitle(this.title);
    this.getStudents();
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


  public getStudents(){
    this.student_service.getAllStudents().subscribe(response=>{
      if(response.success){
        this.students = response.students
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
