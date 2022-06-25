import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {StudentService} from "../../../services/student/student.service";
import {SpinnerService} from "../../../services/spinner/spinner.service";

export interface Faculty {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit, AfterViewChecked {

  constructor(private student_service: StudentService,
              public spinner: SpinnerService,
              private changeDetector: ChangeDetectorRef,) { }

  surname:any = false; first_name:any = false; other_name:any = false;
  email:any = false; phone_number:any = false; matric_number:any = false;
  faculty:any = false; department:any = false; admission_session:any = false;
  level:any = false; gender:any = false; date_of_birth:any = false;photo:any = false;


  faculties: Faculty[] = [
    { value: 'ARTS, MANAGEMENT AND SOCIAL SCIENCE', viewValue: 'ARTS, MANAGEMENT AND SOCIAL SCIENCE' },
    { value: 'ENGINEERING AND TECHNOLOGY', viewValue: 'ENGINEERING AND TECHNOLOGY' },
    { value: 'NATURAL AND APPLIED SCIENCE', viewValue: 'NATURAL AND APPLIED SCIENCE' },
    { value: 'COMPUTING', viewValue: 'COMPUTING' },
    { value: 'ENVIRONMENTAL SCIENCE', viewValue: 'ENVIRONMENTAL SCIENCE' },
  ];

  studentRegistrationForm = new FormGroup({
    surname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    first_name: new FormControl(''),
    other_name: new FormControl(''),

    email: new FormControl(''),
    phone_number: new FormControl(),

    matric_number: new FormControl(''),
    faculty: new FormControl(),
    department: new FormControl(''),
    admission_session: new FormControl(),
    level: new FormControl(),

    gender: new FormControl(),
    date_of_birth: new FormControl(''),
    nationality: new FormControl({value:'', disabled:true}),
    state_of_origin: new FormControl(''),
    lga: new FormControl(''),
    resident_address: new FormControl(''),
    photo: new FormControl()
  });

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

  public registerStudent(){
    if (this.studentRegistrationForm.valid){
      let formData: any = new FormData()
      Object.keys(this.studentRegistrationForm.value).forEach(
        key => formData.append(
          key, this.studentRegistrationForm.value[key]
        )
      );

      this.student_service.registerStudent(formData).subscribe(response=>{
        if(response.success){

          // @ts-ignore
          $('#newUserModal').modal('hide');
        }else {

          Object.keys(response.error).forEach(
            // @ts-ignore
            key =>  this[key] = response.error[key][0]
          );
        }
      })
    }
  }

  public photoUpload(event:any){
    this.studentRegistrationForm.patchValue({photo: <File>event.target.files[0]})
    this.studentRegistrationForm.get('photo')?.updateValueAndValidity()
  }

}
