import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";
import {UserProfileService} from "../service/user-profile.service";

@Component({
  selector: 'app-navbarhead',
  templateUrl: './navbarhead.component.html',
  styleUrls: ['./navbarhead.component.css']
})
export class NavbarheadComponent implements OnInit {
profile:any
  constructor(private script: ScriptService,private loginService:LoginService,
              private router:Router,private userService:UserProfileService) { }

  ngOnInit(): void {
    this.userService.getProfileFull().subscribe((data)=>{
      this.profile = data

    })
  }
  signOut(){
    this.loginService.setToken("");
    localStorage.setItem("userToken","")
    this.router.navigate([""])
  }
}
