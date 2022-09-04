import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CourceService {

  constructor(private http:HttpClient) { }
  findById(id:number):Observable<Course>{
    return this.http.get<Course>(`${API_URL}/admin/find/${id}`)
  }
}
