import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-showhome',
  templateUrl: './showhome.component.html',
  styleUrls: ['./showhome.component.css']
})
export class ShowhomeComponent implements OnInit,OnChanges {

  constructor(private script:ScriptService,private loginService:LoginService,private router:Router) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    console.log('script loaded ', data);
  }).catch(error => console.log(error));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }
  signOut(){
    this.loginService.setToken("");
    localStorage.setItem("userToken","")
    this.router.navigate(["/login"])
  }
  checkProfile(){
    console.log(this.loginService.getUserToken().roles[0].nameRole)
    if(this.loginService.getUserToken().roles[0].nameRole.includes("ROLE_ADMIN")) {
      this.router.navigate(["/admin"])
    } else {
      this.router.navigate(["/user"])
    }

  }

}
