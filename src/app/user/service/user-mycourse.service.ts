import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ChangeProfileUser} from "../../model/ChangeProfileUser";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class UserMycourseService {


}
