import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AppUser} from "../../model/AppUser";
import {ChangeProfileUser} from "../../model/ChangeProfileUser";
import {ChangePassword} from "../../model/ChangePassword";
import {ChangeAvatar} from "../../model/ChangeAvatar";
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:HttpClient) { }
  getProfile():Observable<AppUser>{
    return this.http.get<AppUser>(`${API_URL}/user`)
  }
  getProfileFull(): Observable<ChangeProfileUser>{
      return this.http.get<ChangeProfileUser>(`${API_URL}/user`)
  }
  saveProfile(profile:any):Observable<ChangeProfileUser>{
    return this.http.post<ChangeProfileUser>(`${API_URL}/user/change-profile`,profile)
  }
  savePassword(changePassword:any):Observable<ChangePassword>{
    return this.http.post<ChangePassword>(`${API_URL}/user/change-password`,changePassword)
  }
  saveAvatar(changeAvatar:any):Observable<ChangeAvatar>{
    return this.http.post<ChangeAvatar>(`${API_URL}/user/change-avatar`,changeAvatar)
  }
}
