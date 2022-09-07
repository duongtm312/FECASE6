import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  noti:any
  constructor(private loginService:LoginService,private router: Router) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    userName : new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  })
login(){
this.loginService.login(this.loginForm.value).subscribe(data =>{
  if(data!=null){
    this.loginService.setUserToken(data);
    this.loginService.setToken(data.token);
    console.log(data.token)
    this.router.navigate([""])
  } else this.noti = "Login fail, check your user name or password"
})
}

}
