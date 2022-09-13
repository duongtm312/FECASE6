import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbartop-home',
  templateUrl: './navbartop-home.component.html',
  styleUrls: ['./navbartop-home.component.css']
})
export class NavbartopHomeComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }
  signOut(){
    this.loginService.setToken("");
    localStorage.setItem("userToken","")
    this.router.navigate(["/login"])
  }
  checkProfile(){

    if(this.loginService.getUserToken().roles[0].nameRole.includes("ROLE_ADMIN")) {
      this.router.navigate(["/admin"])
    } else if (this.loginService.getUserToken().roles[0].nameRole.includes("ROLE_USER")) {
      this.router.navigate(["/user"])
    } else this.router.navigate(["login"])
    }
}
