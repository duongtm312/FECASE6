import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbarhead',
  templateUrl: './navbarhead.component.html',
  styleUrls: ['./navbarhead.component.css']
})
export class NavbarheadComponent implements OnInit {

  constructor(private script: ScriptService,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  signOut(){
    this.loginService.setToken("");
    localStorage.setItem("userToken","")
    this.router.navigate([""])
  }
}
