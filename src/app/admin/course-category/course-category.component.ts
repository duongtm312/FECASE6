import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";
import {Course} from "../../model/Course";
import {AdminCourseService} from "../service/admin-course.service";
import {Page} from "../../model/Page";
import {getAll} from "@angular/fire/remote-config";
import {Rating} from "../../model/Rating";

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit {

  constructor(private script: ScriptService, private courseService: AdminCourseService) {
  }

  page!: Page
  courses: Rating[] = []

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    }).catch(error => console.log(error));
    this.courseService.getAll(0).subscribe((data) => {
      this.page = data
      this.courses = this.page.content
    })
  }

  getAll(page: number) {
    if (page >= 0 && page < this.page.totalPages) {
      this.courseService.getAll(page).subscribe((data) => {
        this.page = data
        this.courses = this.page.content
      })
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  search(input: any) {
    this.courseService.search(input).subscribe((data) => {
      let courseSearch: Rating[] = []

      for (const d of data) {
        if (d.nameCourse.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D'))) {
          courseSearch.push()
        }
      }
      this.courses =courseSearch ;
    })
  }

  disable(id: string, page: any){
    this.courseService.disable(id).subscribe(()=>{
      this.courseService.getAll(page).subscribe((data) => {
        this.page = data
        this.courses = this.page.content
      })
    })

  }

  activated(id: string, page: any){
    this.courseService.activated(id).subscribe(()=>{
      this.courseService.getAll(page).subscribe((data) => {
        this.page = data
        this.courses = this.page.content
      })
    })

  }

}
