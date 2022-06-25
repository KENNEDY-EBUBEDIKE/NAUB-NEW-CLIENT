import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import {BaseComponent} from "./components/base/base.component";
// import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {StudentComponent} from "./components/student/student.component";
import {BaseComponent} from "./components/base/base.component";
import {LoginComponent} from "./components/login/login.component";
import {StudentProfileComponent} from "./components/student/student-profile/student-profile.component";

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
        path: 'student-profile',
        component: StudentProfileComponent,
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  },



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
