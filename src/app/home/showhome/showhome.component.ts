import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";

@Component({
  selector: 'app-showhome',
  templateUrl: './showhome.component.html',
  styleUrls: ['./showhome.component.css']
})
export class ShowhomeComponent implements OnInit {

  constructor(private script:ScriptService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
