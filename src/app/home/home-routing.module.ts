import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowhomeComponent} from "./showhome/showhome.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";

const routes: Routes = [
  {
  path: '',
  component: ShowhomeComponent,
},
  {
    path:"course-detail-home/:idCourse",
    component: CourseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
