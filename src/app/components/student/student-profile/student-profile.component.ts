import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../services/student/student.service";
import {Title} from "@angular/platform-browser";
import {Location} from "@angular/common";

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
  student!: any;

  ngOnInit(): void {
    console.log(this.location.getState())
    this.getStudentData()
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getStudentData(){
    this.student_service.getStudent(history.state.id).subscribe(response=>{
      if(response.success){
        this.student = response.student
        console.log(this.student)
      }
    })
  }

}
