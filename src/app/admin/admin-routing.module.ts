import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminDashbroadComponent} from "./admin-dashbroad/admin-dashbroad.component";
import {CourseCategoryComponent} from "./course-category/course-category.component";
import {CoursedetailComponent} from "./coursedetail/coursedetail.component";
import {CreateCourseComponent} from "./create-course/create-course.component";
import {AdminCourseEditComponent} from "./admin-course-edit/admin-course-edit.component";
import {CreateLessonComponent} from "./create-lesson/create-lesson.component";
import {AdminLessonEditComponent} from "./admin-lesson-edit/admin-lesson-edit.component";
import {AdminRatingComponent} from "./admin-rating/admin-rating.component";
import {AdminInstructorComponent} from "./admin-instructor/admin-instructor.component";
import {AdminEarningComponent} from "./admin-earning/admin-earning.component";

const routes: Routes = [
  {
    path: '',
    component: AdminDashbroadComponent,
  },
  {
    path: 'courseCategory',
    component: CourseCategoryComponent,
  },{
    path: 'courseDetail/:idCourse',
    component: CoursedetailComponent,
  },{
  path:'createCourse',
    component:CreateCourseComponent
  },{
    path:'editCourse/:idCourse',
    component:AdminCourseEditComponent
  },{
    path:'createLesson/:idCourse',
    component:CreateLessonComponent
  },{
    path:'editLesson/:idLesson',
    component:AdminLessonEditComponent
  },{
    path:'allRating',
    component:AdminRatingComponent
  }
  ,{
    path:'instructor',
    component:AdminInstructorComponent
  },
  {path:"earning",
  component:AdminEarningComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
