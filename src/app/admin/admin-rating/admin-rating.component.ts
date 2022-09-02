import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";
import {AdminCourseService} from "../service/admin-course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminCommentService} from "../service/admin-comment.service";
import {AdminLessonService} from "../service/admin-lesson.service";
import {Rating} from "../../model/Rating";
import {Page} from "../../model/Page";

@Component({
  selector: 'app-admin-rating',
  templateUrl: './admin-rating.component.html',
  styleUrls: ['./admin-rating.component.css']
})
export class AdminRatingComponent implements OnInit {
  page!: Page
  ratings: Rating[] = []
  rate: Rating=new Rating()

  constructor(private script: ScriptService, private router: Router, private ratingService: AdminCommentService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions',).then(data => {
    }).catch(error => console.log(error));
    this.ratingService.getAll(0).subscribe((data) => {
      this.page = data
      this.ratings = this.page.content
      this.showRate(this.ratings[0])
    })
  }

  getAll(page: any) {
    if (page >= 0 && page < this.page.totalPages) {
      this.ratingService.getAll(page).subscribe((data) => {
        this.page = data
        this.ratings = this.page.content
        this.showRate(this.ratings[0])
      })
    }
  }

  counter(s: number) {
    return new Array(s);
  }
  showRate(rate:Rating){
    this.rate=rate
  }
  disable(id:number,page:any){
    this.ratingService.disable(id).subscribe(()=>{
      this.getAll(page)
    })

  }
  approval(id:number,page:any){
    this.ratingService.approval(id).subscribe(()=>{
      this.getAll(page)
    })

  }
  delete(id:number,page:any){
    this.ratingService.delete(id).subscribe(()=>{
      this.getAll(page)
    })

  }
}
