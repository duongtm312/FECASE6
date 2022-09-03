import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  constructor(private script:ScriptService) { }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
