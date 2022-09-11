import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";
import {CourceService} from "../../user/service/cource.service";
import {data} from "jquery";
import {Course} from "../../model/Course";
import {AdminInstructorService} from "../../admin/service/admin-instructor.service";
import {Instructor} from "../../model/Instructor";

@Component({
  selector: 'app-showhome',
  templateUrl: './showhome.component.html',
  styleUrls: ['./showhome.component.css']
})
export class ShowhomeComponent implements OnInit,OnChanges {
 course: Course[] = []
  instructors: Instructor[]=[]
  constructor(private script:ScriptService,private loginService:LoginService,private router:Router,private courseService: CourceService,private instructorService:AdminInstructorService) {
  }

  ngOnInit(): void {
    this.instructorService.getAllUser().subscribe((data)=>{
      this.instructors = data
      console.log(data)
      this.script.load( 'bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla','functions').then(data => {
        console.log('script loaded ', data);
      }).catch(error => console.log(error));
    })

    this.courseService.getTrendingCourse().subscribe((data) =>{
      this.course = data
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
