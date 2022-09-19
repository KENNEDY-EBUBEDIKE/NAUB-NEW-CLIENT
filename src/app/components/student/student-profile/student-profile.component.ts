import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../services/student/student.service";
import {Title} from "@angular/platform-browser";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course/course.service";
// import "../../../../assets/js/serial_script.js"


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})

export class StudentProfileComponent implements OnInit {

  constructor(
    private student_service: StudentService,
    private course_service: CourseService,
    private location: Location,
    private titleService: Title,

  ) {
    this.setTitle(this.title);
  }

  title: string = "NAUB | Student Profile";
  server_url = this.student_service._server_url
  student!: any;
  editStudentProfileForm!:any
  student_id!:any
  responseMessage!: any
  courses!: any
  StudentRegisteredCourses!:any



  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public setResponseMessage(newMessage: string) {
    this.responseMessage = newMessage;
    this.getStudentData();
  }

  public getStudentData(){
    if (history.state.id){
      this.student_id = history.state.id
      window.localStorage.setItem("student_id", this.student_id)
    }else{
      this.student_id = window.localStorage.getItem("student_id")
    }

    this.student_service.getStudent(this.student_id).subscribe(response=>{
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
    this.getStudentData()
    this.getCourses()
    //Initialize Select2 Elements
    // @ts-ignore
    $('.select2').select2()
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
          this.setResponseMessage(response.message)
          // @ts-ignore
          $(".alert-success").show(200).delay(3000).hide(500);
          this.getStudentData()
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
    let formData: any = new FormData()
    formData.append('pk', this.student.id)
    formData.append('photo', <File>event.target.files[0])
    this.student_service.editStudentProfile(formData).subscribe(response=>{
      if (response.success){
        this.getStudentData()
      }
    })
  }

  public triggerUpload(){
    // @ts-ignore
    document.getElementById("photoUpload").click()
  }

  public flagStudent(event:any, reason:any){
    event.preventDefault()
    if(reason === 'selection'){
      // @ts-ignore
      let e = document.getElementById("reason");
      // @ts-ignore
      reason = e.options[e.selectedIndex].value;
    }
    let formData: any = new FormData()
    formData.append('pk', this.student.id)
    formData.append('is_flaged', reason)
    this.student_service.editStudentProfile(formData).subscribe(response=>{
      if (response.success){
        // @ts-ignore
        $('#flagStudentModal').modal('hide');
        this.getStudentData()
      }
    })
  }

  public requestToScanCard(event:any){
    event.preventDefault()
    // start(this.fn.bind(this))
    scanner(this.updateRfidCode.bind(this))
  }


  // @ts-ignore
  public updateRfidCode(value:any){
    let formData: any = new FormData()
    formData.append('pk', this.student.id)
    formData.append('rfid_code', value)
    //@ts-ignore
    this.student_service.update_rfid_code(formData).subscribe(response=>{
      if (response.success){
        this.setResponseMessage(response.message)
        // @ts-ignore
        $(".alert-success").show(200).delay(3000).hide(500);
        // @ts-ignore
        this.getStudentData()
      }else {
        this.setResponseMessage(response.message)
        // @ts-ignore
        $(".alert-danger").show(200).delay(3000).hide(500);
      }
    })
  }

  public getCourses(){
    this.course_service.getAllCourses().subscribe(response=>{
      if(response.success){
        this.courses = response.courses

      }
    })
  }

  public registerCourse(event:any){
    event.preventDefault()
    // @ts-ignore
    let e = document.getElementById("course");
    // @ts-ignore
    let courses = Array.from(e.selectedOptions).map(option => option.value)

    let formData: any = new FormData()
    formData.append('pk', this.student.id)
    formData.append('courses', courses)

    this.student_service.registerCourse(formData).subscribe(response=>{
      this.setResponseMessage(response.message)
      // @ts-ignore
        $('#registerCourseModal').modal('hide');
      if (response.success){
        // @ts-ignore
        $(".alert-success").show(200).delay(3000).hide(500);

      }else {
        // @ts-ignore
        $(".alert-danger").show(200).delay(3000).hide(500);
      }

      })

  }

  public deRegisterCourse(event:any, courseCode:any){
    event.preventDefault()
    console.log(courseCode)

    let formData: any = new FormData()
    formData.append('pk', this.student.id)
    formData.append('course', courseCode)

    this.student_service.deRegisterCourse(formData).subscribe(response=>{
      this.setResponseMessage(response.message)
      if (response.success){
        // @ts-ignore
        $(".alert-success").show(200).delay(3000).hide(500);
      }else {
        // @ts-ignore
        $(".alert-danger").show(200).delay(3000).hide(500);
      }

      })


  }

}

function scanner(fn:any) {
  let port:any, textEncoder:any, writableStreamClosed:any, writer:any;
  connectSerial()
  async function connectSerial() {
    try {
      // @ts-ignore
      // Prompt user to select any serial port.
      port = await navigator.serial.requestPort();
      await port.open({baudRate: "9600"});
      await listenToPort();

      textEncoder = new TextEncoderStream();
      writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

      writer = textEncoder.writable.getWriter();
    } catch (e) {
      alert(e + "Serial Connection Failed");
    }
  }

  let v = "";
  async function listenToPort() {
      const textDecoder = new TextDecoderStream();
      // noinspection JSUnusedLocalSymbols
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      // Listen to data coming from the serial device.
      while (true) {
          let { value, done } = await reader.read();
          if (done) {
              // Allow the serial port to be closed later.
              reader.releaseLock();
              break;
          }

          // @ts-ignore
          let newLine = /\r\n|\r|\n/.exec(value);

          if (newLine){
              v += value;
              v.replace(/\r\n|\n|\r|\s/g, "")
              if (!v.replace(/\r\n|\n|\r|\s/g, "").length) {
                console.log("string only contains whitespace (ie. spaces, tabs or line breaks)");
              }else {
                  if (v.length > 3){
                      fn(v)
                  }
              }
              v = "";
          }else{
              v += value;
          }
      }
  }
}
