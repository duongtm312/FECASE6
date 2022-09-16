import {Component, OnInit} from '@angular/core';
import {UserMycourseService} from "../service/user-mycourse.service";
import {MyCourse} from "../../model/MyCourse";
import {AdminLessonService} from "../../admin/service/admin-lesson.service";
import {
  logExperimentalWarnings
} from "@angular-devkit/build-angular/src/builders/browser-esbuild/experimental-warnings";
import {ScoreQuizService} from "../../admin/service/score-quiz.service";
import {ScoreQuiz} from "../../model/ScoreQuiz";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  myCourse: MyCourse[] = []
  scoreQuiz: ScoreQuiz[] =[]
  constructor(private myCourseService: UserMycourseService, private scoreQuizService:ScoreQuizService) {
  }

  ngOnInit(): void {
    this.myCourseService.getAllMyCourse().subscribe((data) => {
      this.myCourse = data
    })
    this.myCourseService.checkExpire().subscribe()

  }

  search(input: any){
    let searchMyCourse : MyCourse[] = []
    this.myCourseService.getAllMyCourse().subscribe((data) =>{
      for (const d of data){
        console.log(d.course.nameCourse)
        if (d.course.nameCourse.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D'))){
          searchMyCourse.push(d)
        }
      }
      this.myCourse = searchMyCourse
    })
  }
  sortByExpire(){
    this.myCourseService.checkExpire().subscribe((data) =>{
      console.log(data)
      this.myCourse = data
    })
  }


}
