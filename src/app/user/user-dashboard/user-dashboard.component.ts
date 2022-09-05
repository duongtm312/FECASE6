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

  // getCompletionProgress(idMyCours:any,idCourse:any){
  //   let completionProgress:any
  //   let totalLesson:any
  //   let lessonLearn:any
  //   this.lessonService.getAllById(idCourse).subscribe((data)=>{
  //     totalLesson = data.length
  //
  //   })
  //  this.myCourseService.getMyCourseLearn(idCourse).subscribe((data) =>{
  //     lessonLearn = data.lessonList.length
  //    completionProgress = lessonLearn/totalLesson
  //
  //    return (completionProgress*100).toString();
  //   })
  // }
  //
  // display(idMyCourse:any,idCourse:any){
  //   document.getElementById('abc')?.setAttribute("aria-valuenow",this.getCompletionProgress(idMyCourse,idCourse))
  // }

}
