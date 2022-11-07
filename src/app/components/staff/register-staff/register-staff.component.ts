import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {StaffService} from "../../../services/staff/staff.service";
import {SpinnerService} from "../../../services/spinner/spinner.service";
import {Faculty} from "../../student/register-student/register-student.component";

@Component({
  selector: 'app-register-staff',
  templateUrl: './register-staff.component.html',
  styleUrls: ['./register-staff.component.css']
})
export class RegisterStaffComponent implements OnInit, AfterViewChecked {

  constructor(private staff_service: StaffService,
              public spinner: SpinnerService,
              private changeDetector: ChangeDetectorRef,) { }

  surname:any = false; first_name:any = false; other_name:any = false;
  email:any = false; phone_number:any = false; staff_id:any = false;
  unit:any = false; department:any = false; admission_session:any = false;
  level:any = false; gender:any = false; date_of_birth:any = false;photo:any = false;


  faculties: Faculty[] = [
    { value: 'ARTS, MANAGEMENT AND SOCIAL SCIENCE', viewValue: 'ARTS, MANAGEMENT AND SOCIAL SCIENCE' },
    { value: 'ENGINEERING AND TECHNOLOGY', viewValue: 'ENGINEERING AND TECHNOLOGY' },
    { value: 'NATURAL AND APPLIED SCIENCE', viewValue: 'NATURAL AND APPLIED SCIENCE' },
    { value: 'COMPUTING', viewValue: 'COMPUTING' },
    { value: 'ENVIRONMENTAL SCIENCE', viewValue: 'ENVIRONMENTAL SCIENCE' },
  ];

  staffRegistrationForm = new FormGroup({
    surname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    first_name: new FormControl(''),
    other_name: new FormControl(''),

    email: new FormControl(''),
    phone_number: new FormControl(),

    staff_id: new FormControl(''),
    unit: new FormControl(),
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

  public registerStaff(){
    if (this.staffRegistrationForm.valid){
      let formData: any = new FormData()
      Object.keys(this.staffRegistrationForm.value).forEach(
        key => formData.append(
          key, this.staffRegistrationForm.value[key]
        )
      );

      this.staff_service.registerStaff(formData).subscribe(response=>{
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
    this.staffRegistrationForm.patchValue({photo: <File>event.target.files[0]})
    this.staffRegistrationForm.get('photo')?.updateValueAndValidity()
  }

}
