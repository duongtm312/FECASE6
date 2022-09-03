import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AppUser} from "../../model/AppUser";
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:HttpClient) { }
  getProfile():Observable<AppUser>{
    return this.http.get<AppUser>(`${API_URL}/user`)
  }
}
