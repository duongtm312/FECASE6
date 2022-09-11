import { Component, OnInit } from '@angular/core';
import {CourceService} from "../../user/service/cource.service";
import {Course} from "../../model/Course";
import {FormControl, FormGroup} from "@angular/forms";
import {Instructor} from "../../model/Instructor";

@Component({
  selector: 'app-find-course',
  templateUrl: './find-course.component.html',
  styleUrls: ['./find-course.component.css']
})
export class FindCourseComponent implements OnInit {
  courses: Course[] = []
  instructors:Instructor[] = []
  constructor(private courseService:CourceService) { }

  ngOnInit(): void {
    this.courseService.getAll().subscribe((data)=>{
      this.courses = data
    })
    this.courseService.getAllInstructor().subscribe((data)=>{
      this.instructors = data
    })
  }
  findForm = new FormGroup({
    nameCourse: new FormControl(""),
    from: new FormControl(0),
    to: new FormControl(400),
    experience: new FormControl("0"),
    nameInstructor: new FormControl(""),
    rating: new FormControl("0"),
  })

  findCourse(){
    console.log(this.findForm.value)
    this.courseService.getAllCourseByCriteria(this.findForm.value).subscribe((data)=>{
      console.log(data)
      this.courses = data
    })
  }
}
