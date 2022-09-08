import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { LoginService } from '../service/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  checkDuplicateMail:boolean = true
  checkDuplicateUsername:boolean = true

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", Validators.required),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  register(){
    this.loginService.register(this.registerForm.value).subscribe((data)=>{
      this.checkDuplicateUsername=data[0];
      this.checkDuplicateMail=data[1];
      if (data[0]&&data[1]){
        this.router.navigate(["/login"])
      }
    });
  }
}



