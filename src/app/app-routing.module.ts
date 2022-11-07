import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import {BaseComponent} from "./components/base/base.component";
// import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {StudentComponent} from "./components/student/student.component";
import {BaseComponent} from "./components/base/base.component";
import {LoginComponent} from "./components/login/login.component";
import {StudentProfileComponent} from "./components/student/student-profile/student-profile.component";
import {CourseComponent} from "./components/course/course.component";
import {SecurityComponent} from "./components/security/security.component";
import {StaffComponent} from "./components/staff/staff.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'base/dashboard',
    pathMatch: 'full'
  },

  {
    path: 'base',
    component: BaseComponent,
    children: [
      {
        path: 'students-database',
        component: StudentComponent
      },

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'courses-database',
        component: CourseComponent
      },

      {
        path: 'student-profile',
        component: StudentProfileComponent,
      },
      {
        path: 'staff-database',
        component: StaffComponent,
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'security-scan',
    component: SecurityComponent
  },



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
