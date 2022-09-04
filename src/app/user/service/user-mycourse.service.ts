import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ChangeProfileUser} from "../../model/ChangeProfileUser";
import {Page} from "../../model/Page";
import {MyCourse} from "../../model/MyCourse";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class UserMycourseService {

  constructor(private http:HttpClient) { }
  getAllMyCourse(): Observable<MyCourse[]> {
    return this.http.get<MyCourse[]>(API_URL + '/course/myCourse');
  }
}
