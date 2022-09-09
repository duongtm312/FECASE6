import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ScoreQuiz} from "../../model/ScoreQuiz";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ScoreQuizService {

  constructor(private http:HttpClient) { }
  getAllById(id:number):Observable<ScoreQuiz[]>{
    return this.http.get<ScoreQuiz[]>(API_URL+"/admin/scorequiz/"+id)
  }
}
