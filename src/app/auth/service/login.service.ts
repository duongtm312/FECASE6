import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rating} from "../../model/Rating";
import {environment} from "../../../environments/environment";
import {AppUser} from "../../model/AppUser";
import {UserToken} from "../../model/UserToken";
import {Router} from "@angular/router";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private  router: Router) { }
  login(accLogin:any):Observable<UserToken>{
    return this.http.post<UserToken>(API_URL+"/login",accLogin)
  }

  register(accRegister: any):Observable<any>{
    return this.http.post<any>(API_URL+"/register",accRegister)
  }

  setToken(token: string){
    localStorage.setItem("token",token);
  }

  getToken(){
    return localStorage.getItem("token");
  }
  setUserToken(userToken: UserToken){
    localStorage.setItem("userToken",JSON.stringify(userToken));
  }

  getUserToken(): UserToken{
    return JSON.parse(<string>localStorage.getItem("userToken"));
  }

  checkrole(){
    let usertoken = this.getUserToken();
    for (const role of usertoken?.role) {
      if (role.role == 'ROLE_ADMIN'){
        this.router.navigate(["/admin"])
      }else  {
        this.router.navigate([""])
      }
    }
  }

}

