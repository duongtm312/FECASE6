import { Component, OnInit } from '@angular/core';
import {AdminCourseService} from "../../admin/service/admin-course.service";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../model/Course";
import {Lesson} from "../../model/Lesson";
import {AdminLessonService} from "../../admin/service/admin-lesson.service";
import {UserMycourseService} from "../service/user-mycourse.service";
import {CourceService} from "../service/cource.service";

@Component({
  selector: 'app-learn-lesson',
  templateUrl: './learn-lesson.component.html',
  styleUrls: ['./learn-lesson.component.css']
})
export class LearnLessonComponent implements OnInit {
  idCourse:any;
  course!:Course;
  lesson:Lesson[]=[]
  constructor(private route: ActivatedRoute, private courseService: CourceService,private lessonService:AdminLessonService) { }

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
    })
  }

  }


