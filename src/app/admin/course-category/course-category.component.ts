import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";
import {Course} from "../../model/Course";
import {AdminCourseService} from "../service/admin-course.service";
import {Page} from "../../model/Page";
import {getAll} from "@angular/fire/remote-config";
import {Rating} from "../../model/Rating";
import Swal from "sweetalert2";

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit {

  constructor(private script: ScriptService, private courseService: AdminCourseService) {
  }

  page!: Page
  course: Rating[] = []

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    }).catch(error => console.log(error));
    this.courseService.getAll(0).subscribe((data) => {
      this.page = data
      this.course = this.page.content
    })
  }

  getAll(page: number) {
    if (page >= 0 && page < this.page.totalPages) {
      this.courseService.getAll(page).subscribe((data) => {
        this.page = data
        this.course = this.page.content
      })
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  search(input: string) {
    // this.courseService.search(input).subscribe((data) => {
    //   this.course = data
    // })
  }

  disable(id: string, page: any){
    this.courseService.disable(id).subscribe(()=>{
      this.messageDisable()
      this.courseService.getAll(page).subscribe((data) => {
        this.page = data
        this.course = this.page.content
      })
    })

  }

  activated(id: string, page: any){
    this.courseService.activated(id).subscribe(()=>{
      this.messageActivated()
      this.courseService.getAll(page).subscribe((data) => {
        this.page = data
        this.course = this.page.content
      })
    })

  }
  messageDisable (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your course has been disabled',
      showConfirmButton: false,
      timer: 1500
    })
  }
  messageActivated (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your course has been activated ',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
