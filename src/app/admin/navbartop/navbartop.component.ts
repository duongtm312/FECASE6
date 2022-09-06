import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbartop',
  templateUrl: './navbartop.component.html',
  styleUrls: ['./navbartop.component.css']
})
export class NavbartopComponent implements OnInit ,OnChanges{

  constructor(private script: ScriptService,private loginService:LoginService,private router:Router) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    }).catch(error => console.log(error));
  }
  signOut(){
    this.loginService.setToken("");
    localStorage.setItem("userToken","")
    this.router.navigate(["/login"])
  }
}
