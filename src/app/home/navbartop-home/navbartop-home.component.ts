import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {UserProfileService} from "../../user/service/user-profile.service";

@Component({
  selector: 'app-navbartop-home',
  templateUrl: './navbartop-home.component.html',
  styleUrls: ['./navbartop-home.component.css']
})
export class NavbartopHomeComponent implements OnInit {
profile:any
  constructor(private loginService: LoginService, private router: Router,
              private userService:UserProfileService) {
  }

  ngOnInit(): void {
    this.userService.getProfileFull().subscribe((data)=>{
      this.profile = data

    })
  }

  signOut() {
    this.loginService.setToken("");
    localStorage.setItem("userToken", "")
    this.router.navigate([""])
  }
  checkLogIn(){
    if (this.loginService.getToken() == ""){
      return true
    } else return false
  }

  checkProfile() {
    if (this.loginService.getToken() == "") {
      this.confirmLogIn()
    } else if (this.loginService.getUserToken().roles[0].nameRole.includes("ROLE_ADMIN")) {
      this.router.navigate(["/admin"])
    } else if (this.loginService.getUserToken().roles[0].nameRole.includes("ROLE_USER")) {
      this.router.navigate(["/user"])
    }
  }
  confirmLogIn(){
    Swal.fire({
      title: 'You are not sign in. Are you want to sign in?',
      showCancelButton: true,
      confirmButtonText: 'Sign in',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(["/login"])
      }
    })
  }



}
