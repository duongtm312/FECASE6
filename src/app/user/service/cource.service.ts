import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {MyCourse} from "../../model/MyCourse";
import {Comment} from "../../model/Comment";
import {CommentCourse} from "../../model/CommentCourse";
import {Rating} from "../../model/Rating";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CourceService {

  constructor(private http:HttpClient) { }
  findById(id:number):Observable<Course>{
    return this.http.get<Course>(`${API_URL}/course/find/${id}`)
  }
  getTrendingCourse ():Observable<Course[]>{
    return this.http.get<Course[]>(`${API_URL}/course/trendingCourse`)
  }
  buyCourse(idCourse:number):Observable<MyCourse>{
    return this.http.get<MyCourse>(`${API_URL}/course/buyCourse/${idCourse}`)
  }

  saveCmt(id: number,cmtCourse:any):Observable<Comment>{
    console.log(id)
    return this.http.post<Comment>(`${API_URL}/comment/createCmt/`+ id, cmtCourse)
  }

  editCmt(idCmt:number, comment: Comment):Observable<Comment>{
    return this.http.post<Comment>(`${API_URL}/comment/editCmt/`+idCmt, comment)
  }

  deleteCmt(id:number):Observable<Comment>{
    console.log(id)
    return this.http.get<Comment>(`${API_URL}/comment/deleteCmt/` + id)
  }

  getAllCmt(idCourse: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_URL}/comment/getAllCmt/`+idCourse);
  }

  getAllRating(idCourse: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${API_URL}/user/getALlRating/`+idCourse);
  }

  saveRating(idCourse: number,rating: any):Observable<Rating>{
    console.log(rating)
    return this.http.post<Rating>(`${API_URL}/comment/createCmt/`+ idCourse, rating)
  }





}
