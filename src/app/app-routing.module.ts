import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserLoginComponent} from "./auth/user-login/user-login.component";
import {UserRegisterComponent} from "./auth/user-register/user-register.component";
import {CoursedetailComponent} from "./admin/coursedetail/coursedetail.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {path:"login",
  component: UserLoginComponent },
  {
    path:"register",
    component: UserRegisterComponent
  },
  {
    path: "course-detail/:idCourse",
    component:CoursedetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
