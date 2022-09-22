import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentComponent } from './components/student/student.component';

import {CustomHttpInterceptor} from "./custom-http-interceptor";
import {BaseService} from "./services/base/base.service";
import {SpinnerService} from "./services/spinner/spinner.service";
import {AuthService} from "./services/auth/auth.service";
import {StudentService} from "./services/student/student.service";
import { RegisterStudentComponent } from './components/student/register-student/register-student.component';
import {CommonModule} from "@angular/common";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { CourseComponent } from './components/course/course.component';
import {CourseService} from "./services/course/course.service";
import { SecurityComponent } from './components/security/security.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    SpinnerComponent,
    LoginComponent,
    SpinnerComponent,
    DashboardComponent,
    StudentComponent,
    RegisterStudentComponent,
    StudentProfileComponent,
    CourseComponent,
    SecurityComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    BaseService,
    SpinnerService,
    AuthService,
    StudentService,
    CourseService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
