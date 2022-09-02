import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";
import {AdminCourseService} from "../service/admin-course.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-navbarleft',
  templateUrl: './navbarleft.component.html',
  styleUrls: ['./navbarleft.component.css']
})
export class NavbarleftComponent implements OnInit {

  constructor(private script: ScriptService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    }).catch(error => console.log(error));
  }
}
