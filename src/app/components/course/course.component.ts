import {Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner/spinner.service";


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewChecked {

  constructor(
    private router: Router,
    private course_service: CourseService,
    private titleService: Title,
    public spinner: SpinnerService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.course_service.Refreshrequired.subscribe(response=>{
      this.getCourses();
    });
  }

  title: string = "NAUB | Courses Database";
  courses!: any
  spinner$ = this.spinner.spinner$;

  ngOnInit(): void {
    this.getCourses();
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

  public getCourses(){
    this.course_service.getAllCourses().subscribe(response=>{
      if(response.success){
        this.courses = response.courses
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
