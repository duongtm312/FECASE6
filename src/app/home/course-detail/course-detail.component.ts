import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CourceService} from "../../user/service/cource.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Comment} from "../../model/Comment";
import {Rating} from "../../model/Rating";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnChanges {
  comments: Comment[] = []
  ratings: Rating[] = []
  idCmt: any
  idCourse: any
  course: any
  noti: any
  editForm: FormGroup = new FormGroup({
    contentCmt: new FormControl(""),
    timeCmt: new FormControl(),
    appUser: new FormGroup({
      idUser: new FormControl()
    }),
    course: new FormGroup({
      idCourse: new FormControl()
    })
  })

  constructor(private script: ScriptService, private route: ActivatedRoute, private courseService: CourceService, private router: Router) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
      })
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        this.comments = data
      })
      this.courseService.getAllRating(this.idCourse).subscribe((data) =>{
        console.log(data)
        this.ratings = data
      })
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  buyCourse(idCourse: any) {
    this.courseService.buyCourse(idCourse).subscribe((data) => {
      if (data != null) {
        this.noti = "buy success"
      } else {
        this.noti = "* Your money not enough"
      }
    })
  }

  commentForm: FormGroup = new FormGroup({
    contentCmt: new FormControl(""),
    timeCmt: new FormControl(""),
  })

  saveCmt() {
    this.courseService.saveCmt(this.idCourse, this.commentForm.value).subscribe((data) => {
      this.commentForm.reset();
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        this.comments = data;
      })
    })

  }

  delete(id: number) {
    this.courseService.deleteCmt(id).subscribe((data) => {
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        this.comments = data
      })
    })

  }

  setCmt(comment: Comment) {
    console.log(comment)
    this.idCmt = comment.idComment
    this.editForm = new FormGroup({
      contentCmt: new FormControl(comment.contentCmt),
      timeCmt: new FormControl(comment.timeCmt),
      appUser: new FormGroup({
        idUser: new FormControl(comment.appUser.idUser)
      }),
      course: new FormGroup({
        idCourse: new FormControl(comment.course.idCourse)
      })
    })
  }


  editCmt() {
    this.courseService.editCmt(this.idCmt, this.editForm.value).subscribe((data) => {
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        this.comments = data
      })

    })
    console.log(this.editForm.value)
  }

  ratingForm : FormGroup = new FormGroup({
    contentRating: new FormControl(""),
  })

  saveRating(){
    this.courseService.saveRating(this.idCourse, this.ratingForm).subscribe((data) =>{
      this.ratingForm.reset()
      this.courseService.getAllRating(this.idCourse).subscribe((data) =>{
        this.ratings = data

      })
    })
  }





}
