import {Component, Inject, OnInit} from '@angular/core';
import {AdminCourseService} from "../../admin/service/admin-course.service";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../model/Course";
import {Lesson} from "../../model/Lesson";
import {AdminLessonService} from "../../admin/service/admin-lesson.service";
import {UserMycourseService} from "../service/user-mycourse.service";
import {CourceService} from "../service/cource.service";
import {DOCUMENT} from "@angular/common";
import {LessonLearned} from "../../model/LessonLearned";

@Component({
  selector: 'app-learn-lesson',
  templateUrl: './learn-lesson.component.html',
  styleUrls: ['./learn-lesson.component.css']
})
export class LearnLessonComponent implements OnInit {
  idCourse:any;
  course!:Course;
  lesson:Lesson[]=[]
  myCourse:any
  idMyCourse:any
  constructor(private route: ActivatedRoute, private courseService: CourceService,private lessonService:AdminLessonService
  ,private myCourseService: UserMycourseService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      console.log(this.idCourse)
      this.courseService.findById(this.idCourse).subscribe((data)=>{
        this.course = data
      })
      this.lessonService.getAllById(this.idCourse).subscribe((data)=>{
        this.lesson=data
      })
      this.myCourseService.getMyCourseLearn(this.idCourse).subscribe((data) =>{
        this.myCourse = data
        this.idMyCourse = data.idMyCourse
        console.log(data)
      })
    })
  }
  learn(link:any){
    document.getElementById('video')?.setAttribute("src",link);
  }
  checkLessonLearn(nameLesson:any): boolean {
    for (let i = 0; i < this.myCourse.lessonList.length; i++) {
      if(this.myCourse.lessonList[i].nameLesson == nameLesson){ return true
      break}
    } return false
  }

  lessonLearned(idLesson:any){
    let lessonLearned:LessonLearned = new LessonLearned(this.idMyCourse,idLesson)
    this.myCourseService.lessonLearned(lessonLearned).subscribe(data=>{
      console.log(data)
    })
  }
  }


