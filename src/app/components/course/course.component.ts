import {Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner/spinner.service";


export interface Faculty {
  value: string;
  viewValue: string;
}

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
  ) {}

  err_course_code:any = false; err_course_title:any = false; err_credit_unit:any = false;
  err_course_type:any = false; err_course_faculty:any = false; err_course_department:any = false;


  title: string = "NAUB | Courses Database";
  courses!: any
  spinner$ = this.spinner.spinner$;
  responseMessage!:any
  courseInView!:any

  faculties: Faculty[] = [
    { value: 'ARTS, MANAGEMENT AND SOCIAL SCIENCE', viewValue: 'ARTS, MANAGEMENT AND SOCIAL SCIENCE' },
    { value: 'ENGINEERING AND TECHNOLOGY', viewValue: 'ENGINEERING AND TECHNOLOGY' },
    { value: 'NATURAL AND APPLIED SCIENCE', viewValue: 'NATURAL AND APPLIED SCIENCE' },
    { value: 'COMPUTING', viewValue: 'COMPUTING' },
    { value: 'ENVIRONMENTAL SCIENCE', viewValue: 'ENVIRONMENTAL SCIENCE' },
    { value: 'GENERAL STUDIES', viewValue: 'GENERAL STUDIES' },
  ];

  courseEditForm = new FormGroup({
    course_title: new FormControl(this.courseInView?.course_title?this.courseInView.course_title: ''),
    course_code: new FormControl(this.courseInView?.course_code?this.courseInView.course_code: '', Validators.compose([Validators.required, Validators.minLength(3)])),
    credit_unit: new FormControl(this.courseInView?.credit_unit?this.courseInView.credit_unit: ''),
    course_type: new FormControl(this.courseInView?.course_type?this.courseInView.course_type: ''),
    course_faculty: new FormControl(this.courseInView?.course_faculty?this.courseInView.course_faculty: ''),
    course_department: new FormControl(this.courseInView?.course_department?this.courseInView.course_department: ''),
  });

  courseAddForm = new FormGroup({
    course_title: new FormControl(''),
    course_code: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    credit_unit: new FormControl(),
    course_type: new FormControl(),
    course_faculty: new FormControl(''),
    course_department: new FormControl(),
  });

  ngOnInit(): void {
    this.setTitle(this.title)
    this.getCourses();
    //Initialize Select2 Elements
    // @ts-ignore
    $('.select2').select2()
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


  public addNewCourse(){
    if (this.courseAddForm.valid){
      let formData: any = new FormData()
      Object.keys(this.courseAddForm.value).forEach(
        key => formData.append(
          key, this.courseAddForm.value[key]
        )
      );

      this.course_service.addNewCourse(formData).subscribe(response=>{
        if(response.success){

          this.responseMessage = response.message
          // @ts-ignore
          $('#newCourseModal').modal('hide');
          this.getCourses()
          // @ts-ignore
          $(".alert-success").show(200).delay(3000).hide(500);

        }else {

          Object.keys(response.error).forEach(
            // @ts-ignore
            key =>  this['err_' + key] = response.error[key][0]
          );
        }
      })
    }
  }

  public getCourseInfo(course_id:any, event:any){
    event.preventDefault()
    this.course_service.getCourseInfo(course_id).subscribe(response=>{
      this.courseInView = response.course
      this.courseEditForm = new FormGroup({
        course_title: new FormControl(this.courseInView?.course_title?this.courseInView.course_title: ''),
        course_code: new FormControl(this.courseInView?.course_code?this.courseInView.course_code: '', Validators.compose([Validators.required, Validators.minLength(3)])),
        credit_unit: new FormControl(this.courseInView?.credit_unit?this.courseInView.credit_unit: ''),
        course_type: new FormControl(this.courseInView?.course_type?this.courseInView.course_type: ''),
        course_faculty: new FormControl(this.courseInView?.course_faculty?this.courseInView.course_faculty: ''),
        course_department: new FormControl(this.courseInView?.course_department?this.courseInView.course_department: ''),
      });
    })
  }

  public deleteCourseHelper(course_id:any){
    // @ts-ignore
      $("#c_id").html(course_id);
  }

  public deleteCourse(){
    // @ts-ignore
    let course_id = $("#c_id").html();
    this.course_service.deleteCourse(course_id).subscribe(response=>{
      // @ts-ignore
      $('#confirmDeleteModal').modal('hide');
      this.responseMessage = response.message
      this.getCourses()
      // @ts-ignore
      $(".alert-success").show(200).delay(3000).hide(500);
    })
  }

  public editCourse(course_id:any){
    if (this.courseEditForm.valid){
      let formData: any = new FormData()
      Object.keys(this.courseEditForm.value).forEach(
        key => formData.append(
          key, this.courseEditForm.value[key]
        )
      );

      this.course_service.editCourse(formData, course_id).subscribe(response=>{
        if(response.success){
          this.responseMessage = response.message
          // @ts-ignore
          $('#editCourseModal').modal('hide');
          this.getCourses()
          // @ts-ignore
          $(".alert-success").show(200).delay(3000).hide(500);
        }else {
          Object.keys(response.error).forEach(
            // @ts-ignore
            key =>  this['err_' + key] = response.error[key][0]
          );
        }
      })
    }
  }

}
