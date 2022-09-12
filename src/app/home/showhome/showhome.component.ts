import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {Instructor} from "../../model/Instructor";
import {AdminInstructorService} from "../../admin/service/admin-instructor.service";
import { Course } from 'src/app/model/Course';

@Component({
  selector: 'app-showhome',
  templateUrl: './showhome.component.html',
  styleUrls: ['./showhome.component.css']
})
export class ShowhomeComponent implements OnInit {
course:Course[]=[]
  instructor: Instructor[] = []

  constructor(private adminInstructorService: AdminInstructorService, private script:ScriptService) {
  }

  ngOnInit(): void {
    this.adminInstructorService.getAll().subscribe((data) => {
      this.instructor = data
      console.log(data)

      this.script.load('bootstrap', 'tiny-slider',
        'glightbox', 'purecounter_vanilla', 'functions').then(data => {

      this.script.load( 'bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla','functions').then(data => {

        console.log('script loaded ', data);
      }).catch(error => console.log(error));
    })
  })
}
}


