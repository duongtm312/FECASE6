import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserMycourseService} from "../service/user-mycourse.service";
import {ScoreQuizService} from "../../admin/service/score-quiz.service";
import {CourceService} from "../service/cource.service";
import {ScoreQuiz} from "../../model/ScoreQuiz";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
idCourse:any
  course:any
  idQuiz:any
  scoreQuiz:ScoreQuiz[]=[]
  hightScore:any
  date!: string | null
  pipe = new DatePipe('en-US')
  constructor(private route: ActivatedRoute, private myCourseService:UserMycourseService,
              private scoreQuizService: ScoreQuizService,private courseService:CourceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.idCourse = data.get("idCourse")
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
        this.idQuiz = data.quiz.idQuiz
        this.scoreQuizService.getAllUser(this.idQuiz).subscribe((data) => {
          this.scoreQuiz = data
          let max:number = data[0]?.score
          let date:Date = data[0]?.date
          for (let i = 0; i < data.length; i++) {
            if(data[i].score > max){
              max = data[i].score
              date = data[i].date
            }
          }
          this.hightScore = max
          this.date = this.pipe.transform(date,'yyyy-MM-dd')
        })
      })
    })
  }
}
