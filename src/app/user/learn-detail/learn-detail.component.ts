import { Component, OnInit } from '@angular/core';
import {CourceService} from "../service/cource.service";
import {LessonService} from "../service/lessonService";
import {ActivatedRoute} from "@angular/router";
import {Lesson} from "../../model/Lesson";
import {UserMycourseService} from "../service/user-mycourse.service";

@Component({
  selector: 'app-learn-detail',
  templateUrl: './learn-detail.component.html',
  styleUrls: ['./learn-detail.component.css']
})
export class LearnDetailComponent implements OnInit {
  idCourse:any
  course:any
  lessons: Lesson[] = []
  myCourse:any
  idMyCourse:any
  completionProgress:any
  constructor(private courseService:CourceService,private lessonService:LessonService,
              private route: ActivatedRoute, private myCourseService:UserMycourseService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data)=>{
      this.idCourse = data.get("idCourse")
      this.courseService.findById(this.idCourse).subscribe((data)=>{
        this.course = data
        data.imgCourse
        this.lessonService.getAllById(this.idCourse).subscribe((data)=>{
          this.lessons = data
          this.myCourseService.getMyCourseLearn(this.idCourse).subscribe((data) => {
            this.myCourse = data
            this.idMyCourse = data.idMyCourse
            this.completionProgress = data.lessonList.length
          })
        })
      })
    })
  }
  checkLessonLearn(nameLesson: any): boolean {
    for (let i = 0; i < this.myCourse.lessonList.length; i++) {
      if (this.myCourse.lessonList[i].nameLesson == nameLesson) {
        return true
        break
      }
    }
    return false
  }

}
