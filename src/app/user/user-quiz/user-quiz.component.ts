import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminCommentService} from "../../admin/service/admin-comment.service";
import {Question} from "../../model/Question";
import {AdminCourseService} from "../../admin/service/admin-course.service";
import {Course} from "../../model/Course";
import {QuestionService} from "../../admin/service/question.service";
import {QuizService} from "../../admin/service/quiz.service";
import {ScoreQuizService} from "../../admin/service/score-quiz.service";
import {interval} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.css']
})
export class UserQuizComponent implements OnInit {
  questionList: Question[] = []
  currentQuestion: number = 0;
  points: number = 0
  idCourse: any
  idQuiz: any
  course!: Course
  isQuizCompleted: boolean = false
  time: number = 0
  interval$: any;
  answer: string = ""
  check: boolean = true
  correctAnswer=0;
  inCorrectAnswer=0;

  constructor(private script: ScriptService, private router: Router, private route: ActivatedRoute,
              private courseService: AdminCourseService, private questionService: QuestionService, private quizService: QuizService, private scoreQuizService: ScoreQuizService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions', 'stepperJs', "stepperScc").then(data => {
    }).catch(error => console.log(error));
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
        this.idQuiz = this.course.quiz.idQuiz
        this.time = this.course.quiz.timeQuiz * 60
        this.questionService.getAllById(this.course.quiz.idQuiz).subscribe(data => {
          this.questionList = data
        })
      })
    })
    this.startCounter()
  }

  nextQuestion() {
    if (this.answer == this.questionList[this.currentQuestion].answer) {
      this.points=this.points+10/this.questionList.length
      this.correctAnswer++
    }else {
      this.inCorrectAnswer++
    }
    if (this.currentQuestion + 1 < this.questionList.length) {
      this.currentQuestion++
    } else {
      this.isQuizCompleted = true
      this.saveScore()
      this.time = 0
    }
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.time--;
        if (this.time === 0) {
          this.saveScore()
          this.isQuizCompleted = true
          this.interval$.unsubscribe()
        }
      });
  }

  setAnswer(answer: string) {
    this.answer = answer
  }

  saveScore() {
    let score = {
      idScore: 0,
      quiz: this.course.quiz,
      appUser: {},
      score: this.points,
      date: new Date()
    }
    if (this.check) {
      this.scoreQuizService.save(score).subscribe(() => {
        this.check = false
      })
    }
  }
}
