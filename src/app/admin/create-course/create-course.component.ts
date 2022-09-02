import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ScriptService} from "../../script.service";
import {AdminCourseService} from "../service/admin-course.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {finalize} from "rxjs";
import {Instructor} from "../../model/Instructor";
import {AdminInstructorService} from "../service/admin-instructor.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit, OnChanges {
  instructor: Instructor[] = []

  constructor(private script: ScriptService, private courseService: AdminCourseService, private storage: AngularFireStorage, private instructorService: AdminInstructorService, private router: Router) {
  }

  ngOnInit(): void {
    this.instructorService.getAll().subscribe((data) => {
        this.instructor = data
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap',
      'glightbox', 'functions', 'awesome', 'bootstrap-icons', 'choices', 'bootstrap-icons', 'quill', 'stepper', 'aos', 'choices.min.js').then(data => {
    }).catch(error => console.log(error));
  }

  createForm = new FormGroup({
    nameCourse: new FormControl(""),
    shortDescription: new FormControl(""),
    imgCourse: new FormControl,
    priceCourse: new FormControl(""),
    timeCourse: new FormControl(""),
    instructor: new FormControl(),
    descriptionCourse: new FormControl()
  })

  saveCourse(file: any) {
    for (let f of file) {
      if (f != null) {
        const filePath = f.name;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, f).snapshotChanges().pipe(
          finalize(() => (fileRef.getDownloadURL().subscribe(
            url => {
              this.createForm.get('imgCourse')?.setValue(url)
             this.createForm.get('instructor')?.setValue({'idInstructor':this.createForm.get('instructor')?.value})
              this.courseService.save(this.createForm.value).subscribe( (data)=>{ this.router.navigate(["/admin/courseCategory"])})
              })))
        ).subscribe((data) => {

        });
      }
    }

  }
}
