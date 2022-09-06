import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CourceService} from "../../user/service/cource.service";
import * as http from "http";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit,OnChanges {
  idCourse: any
  course: any
  noti:any
  constructor(private script: ScriptService, private route: ActivatedRoute, private courseService: CourceService,private router:Router) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
        console.log(data)
      })
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }
  buyCourse(idCourse:any){
    this.courseService.buyCourse(idCourse).subscribe((data)=>{
      console.log(data)
    if(data != null){
      this.noti = "buy success"
    }else {
      this.noti = "* Your money not enough"
    }
    })
  }

}
