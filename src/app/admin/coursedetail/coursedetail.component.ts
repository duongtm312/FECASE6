import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";
import {AdminCourseService} from "../service/admin-course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../model/Course";
import {Rating} from "../../model/Rating";
import {AdminCommentService} from "../service/admin-comment.service";
import {Lesson} from "../../model/Lesson";
import {AdminLessonService} from "../service/admin-lesson.service";
import {Bill} from "../../model/Bill";
import {AdminBillService} from "../service/admin-bill.service";

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {
  idCourse:any;
  course!:Course;
  rating:any[]=[]
  lesson:Lesson[]=[]
  totalCourseEarning:any
  enrollment:any
  constructor(private script: ScriptService, private courseService: AdminCourseService,private route: ActivatedRoute,private ratingService:AdminCommentService,private lessonService:AdminLessonService,private router: Router,private billService:AdminBillService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions',).then(data => {
    }).catch(error => console.log(error));
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.findById(this.idCourse).subscribe((data)=>{
        this.course = data
        this.enrollment = data.enrolled
      })
      this.ratingService.getAllById(this.idCourse).subscribe((data)=>{
        this.rating=data
      })
      this.lessonService.getAllById(this.idCourse).subscribe((data)=>{
        this.lesson=data
      })
    })
    this.billService.getAllByIdCourse(this.idCourse).subscribe((data)=>{
      this.totalCourseEarning = 0
      for (let i = 0; i < data.length; i++) {
        this.totalCourseEarning += data[i].totalBill
      }
    })
  }
  counter(i: number) {
    return new Array(i);
  }
  approval(id:number){
    this.ratingService.approval(id).subscribe(()=>{
      this.ratingService.getAllById(this.idCourse).subscribe((data)=>{
        this.rating=data
      })
    })
  }
  disable(id:number){
    this.ratingService.disable(id).subscribe(()=>{
      this.ratingService.getAllById(this.idCourse).subscribe((data)=>{
        this.rating=data
      })
    })

  }
  deleteRating(id:number){
    this.ratingService.delete(id).subscribe()
  }
  deleteLesson(id:number){

    this.lessonService.delete(id).subscribe(
      ()=>{
        this.lessonService.getAllById(this.idCourse).subscribe((data)=>{
          this.lesson=data
        })
      }
    )
  }
}
