import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Instructor} from "../../model/Instructor";
import {environment} from "../../../environments/environment";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AdminInstructorService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(API_URL + '/admin/instructor');
  }
}
