import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";

@Component({
  selector: 'app-admin-dashbroad',
  templateUrl: './admin-dashbroad.component.html',
  styleUrls: ['./admin-dashbroad.component.css']
})
export class AdminDashbroadComponent implements OnInit {

  constructor(private script:ScriptService) { }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions',"overlayscrollbars",
      "OverlayScrollbars.css").then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
