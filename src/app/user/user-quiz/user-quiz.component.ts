import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";
import {Router} from "@angular/router";
import {AdminCommentService} from "../../admin/service/admin-comment.service";

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.css']
})
export class UserQuizComponent implements OnInit {

  constructor(private script: ScriptService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions','stepperJs',"stepperScc").then(data => {
    }).catch(error => console.log(error));
  }

}
