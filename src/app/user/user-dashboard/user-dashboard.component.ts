import { Component, OnInit } from '@angular/core';
import {UserMycourseService} from "../service/user-mycourse.service";
import {MyCourse} from "../../model/MyCourse";
import {AdminLessonService} from "../../admin/service/admin-lesson.service";
import {
  logExperimentalWarnings
} from "@angular-devkit/build-angular/src/builders/browser-esbuild/experimental-warnings";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  myCourse: MyCourse[] = []
  constructor(private myCourseService:UserMycourseService,private lessonService:AdminLessonService) { }

  ngOnInit(): void {
    this.myCourseService.getAllMyCourse().subscribe((data) =>{
      this.myCourse = data
      console.log(data)
    })

  }

}
