import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserDashboardComponent} from "./user-dashboard/user-dashboard.component";
import {UserMainComponent} from "./user-main/user-main.component";
import {UserDeleteComponent} from "./user-delete/user-delete.component";
import {UserPaymentComponent} from "./user-payment/user-payment.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {LearnLessonComponent} from "./learn-lesson/learn-lesson.component";
import {UserQuizComponent} from "./user-quiz/user-quiz.component";

const routes: Routes = [
  {
    path: '',
    component: UserMainComponent, children: [
      {
        path: "",
      component: UserDashboardComponent
      },
      {
        path:"delete",
        component: UserDeleteComponent
      },
      {
        path:"payment",
        component: UserPaymentComponent
      },
      {
        path:"edit",
        component: UserEditComponent
      },
      {
        path:"quiz",
        component:UserQuizComponent
      }
    ]
  },
  {
    path: "learn/:idCourse",
    component: LearnLessonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
