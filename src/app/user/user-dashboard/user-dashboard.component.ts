import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {UserMycourseService} from "../service/user-mycourse.service";
import {MyCourse} from "../../model/MyCourse";
import {AdminLessonService} from "../../admin/service/admin-lesson.service";
import {
  logExperimentalWarnings
} from "@angular-devkit/build-angular/src/builders/browser-esbuild/experimental-warnings";
import {ScoreQuizService} from "../../admin/service/score-quiz.service";
import {ScoreQuiz} from "../../model/ScoreQuiz";
import {CertificateService} from "../service/certificate.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {
  myCourse: MyCourse[] = []
  g: any
  totalCourse: any
  completeLesson: any
  certificate:any

  constructor(private myCourseService: UserMycourseService, private scoreQuizService: ScoreQuizService,
              private lessonService: AdminLessonService, private cerService: CertificateService) {
  }

  ngOnInit(): void {
    this.myCourseService.getAllMyCourse().subscribe((data) => {
      this.myCourse = data
      console.log("init")
      console.log(this.totalCourse)
      this.totalCourse.setAttribute("data-purecounter-end", data.length.toString())
      let complete:number = 0
      for (const mc of data) {
        complete += mc.lessonList.length
      }
      this.completeLesson.setAttribute("data-purecounter-end", complete.toString())

    })
    this.myCourseService.checkExpire().subscribe()
  }

  ngAfterViewInit(): void {

    this.totalCourse = document.getElementById("totalCourse")
    console.log("view")
    console.log(this.totalCourse)
    this.completeLesson =  document.getElementById("completeLesson")

  }


  search(input: any) {
    let searchMyCourse: MyCourse[] = []
    this.myCourseService.getAllMyCourse().subscribe((data) => {
      for (const d of data) {
        if (d.course.nameCourse.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D'))) {
          searchMyCourse.push(d)
        }
      }
      this.myCourse = searchMyCourse
    })
  }

  findExpired() {
    this.myCourseService.findExpired().subscribe((data) => {
      console.log(data)
      this.myCourse = data
    })
  }

  findExpire() {
    this.myCourseService.findExpire().subscribe((data) => {
      console.log(data)
      this.myCourse = data
    })
  }


}
