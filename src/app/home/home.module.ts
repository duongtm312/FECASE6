import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ShowhomeComponent } from './showhome/showhome.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';


@NgModule({
  declarations: [
    ShowhomeComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
