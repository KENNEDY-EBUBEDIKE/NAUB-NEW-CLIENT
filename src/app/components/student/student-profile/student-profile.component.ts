import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../services/student/student.service";
import {Title} from "@angular/platform-browser";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  constructor(
    private student_service: StudentService,
    private location: Location,
    private titleService: Title
  ) {
    this.setTitle(this.title);
  }

  title: string = "NAUB | Student Profile";
  server_url = this.student_service._server_url
  student!: any;



  editStudentProfileForm!:any

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getStudentData(){
    this.student_service.getStudent(history.state.id).subscribe(response=>{
      if(response.success){
        this.student = response.student
        this.editStudentProfileForm = new FormGroup({
          pk: new FormControl({value:this.student?.id?this.student.id:'', disabled:false}),
          surname: new FormControl({value:this.student?.surname?this.student.surname:'', disabled:false}, Validators.compose([Validators.required, Validators.minLength(3)])),
          first_name: new FormControl({value:this.student?.first_name?this.student.first_name:'', disabled:false}),
          other_name: new FormControl({value:this.student?.other_name?this.student.other_name:'', disabled:false}),

          email: new FormControl({value:this.student?.email?this.student.email:'', disabled:false}),
          phone_number: new FormControl({value:this.student?.phone_number?this.student.phone_number:'', disabled:false}),

          matric_number: new FormControl({value:this.student?.matric_number?this.student.matric_number:'', disabled:true}),
          faculty: new FormControl({value:this.student?.faculty?this.student.faculty:'', disabled:false}),
          department: new FormControl({value:this.student?.department?this.student.department:'', disabled:false}),
          admission_session: new FormControl({value:this.student?.admission_session?this.student.admission_session:'', disabled:false}),
          level: new FormControl({value:this.student?.level?this.student.level:'', disabled:false}),

          gender: new FormControl({value:this.student?.gender?this.student.gender:'', disabled:false}),
          date_of_birth: new FormControl({value:this.student?.date_of_birth?this.student.date_of_birth:'', disabled:false}),
          nationality: new FormControl({value:this.student?.nationality?this.student.nationality:'', disabled:false}),
          state_of_origin: new FormControl({value:this.student?.state_of_origin?this.student.state_of_origin:'', disabled:false}),
          lga: new FormControl({value:this.student?.lga?this.student.lga:'', disabled:false}),
          resident_address: new FormControl({value:this.student?.resident_address?this.student.resident_address:'', disabled:false}),
        });
      }
    })
  }

  ngOnInit(): void {
    console.log(this.location.getState())
    this.getStudentData()
  }

  public editStudentProfile(){
    if (this.editStudentProfileForm.valid){
      let formData: any = new FormData()
      Object.keys(this.editStudentProfileForm.value).forEach(
        key => formData.append(
          key, this.editStudentProfileForm.value[key]
        )
      );

      this.student_service.editStudentProfile(formData).subscribe(response=>{
        if(response.success){

          this.getStudentData()
        }else {
          console.log(response.error)
          Object.keys(response.error).forEach(
            // @ts-ignore
            key =>  this[key] = response.error[key][0]
          );
        }
      })
    }
  }

  public photoUpload(event:any){
    let formData: any = new FormData()
    formData.append('pk', this.student.id)
    formData.append('photo', <File>event.target.files[0])
    this.student_service.editStudentProfile(formData).subscribe(response=>{
      console.log(response)
      this.getStudentData()
    })
    // this.editStudentProfileForm.patchValue({photo: <File>event.target.files[0]})
    // this.editStudentProfileForm.get('photo')?.updateValueAndValidity()
  }

  public triggerUpload(){
    // @ts-ignore
    document.getElementById("photoUpload").click()
  }

}
